use std::{
    collections::HashMap,
    convert::Infallible,
    net::SocketAddr,
    sync::{Arc, Mutex, RwLock},
};

use futures::{
    stream::{SplitSink, SplitStream},
    Future, SinkExt, StreamExt,
};
use hyper::{
    service::{make_service_fn, service_fn},
    upgrade::Upgraded,
    Body, Request, Response, Server, StatusCode,
};
use hyper_tungstenite::{tungstenite::Message, WebSocketStream};
use rand::{thread_rng, Rng};
use serde_derive::{Deserialize, Serialize};
use serde_json::Value;

use url::Url;

mod error;
use error::Error;

type DatabaseConnection = rusqlite::Connection;

type Socket = WebSocketStream<Upgraded>;
type SocketSink = SplitSink<WebSocketStream<Upgraded>, Message>;
type SocketStream = SplitStream<WebSocketStream<Upgraded>>;

struct JsonPathIterator<'a> {
    str: &'a str,
}

impl JsonPathIterator<'_> {
    fn new(str: &str) -> JsonPathIterator<'_> {
        let str = &str[1..];
        JsonPathIterator { str }
    }
}

impl<'a> Iterator for JsonPathIterator<'a> {
    type Item = String;

    fn next(&mut self) -> Option<Self::Item> {
        if self.str.is_empty() {
            None
        } else {
            let segment = match self.str.find('/') {
                Some(i) => {
                    let segment = &self.str[..i];
                    self.str = &self.str[i + 1..];
                    segment
                }
                None => {
                    let segment = &self.str[..];
                    self.str = "";
                    segment
                }
            };

            Some(segment.replace("~1", "/").replace("~0", "~"))
        }
    }
}

fn resolve<'a>(node: &'a mut Value, path: &[String]) -> Option<&'a mut Value> {
    if path.is_empty() {
        Some(node)
    } else {
        match node {
            Value::Object(map) => map
                .get_mut(&path[0])
                .and_then(|node| resolve(node, &path[1..])),

            Value::Array(list) => match path[0].parse::<usize>() {
                Err(_) => None,
                Ok(index) => list
                    .get_mut(index)
                    .and_then(|node| resolve(node, &path[1..])),
            },

            _ => None,
        }
    }
}

fn apply(value: &mut Value, change: Change) {
    let mut path: Vec<_> = JsonPathIterator::new(&change.target).collect();
    let last_key = path.pop().unwrap();

    let target = resolve(value, &path).unwrap();

    match target {
        Value::Object(map) => match change.value {
            None => {
                map.remove(&last_key);
            }
            Some(v) => match map.get_mut(&last_key) {
                Some(field) => {
                    *field = v;
                }
                None => {
                    map.insert(last_key, v);
                }
            },
        },

        Value::Array(list) => {
            let index = last_key.parse().unwrap();

            match change.value {
                None => {
                    list.remove(index);
                }
                Some(v) => {
                    list[index] = v;
                }
            }
        }

        _ => panic!(),
    }
}

fn load_changes(
    conn: &DatabaseConnection,
    id: usize,
    version: usize,
) -> Result<Vec<Change>, rusqlite::Error> {
    let mut statement = conn.prepare(
        "select changes.target, changes.value
            from updates
            inner join changes on changes.updateId = updates.id
            where updates.nodeId = ? and updates.version >= ?
            order by updates.version, changes.ordering",
    )?;

    let result: Result<Vec<_>, _> = statement
        .query_map((id, version), |row| {
            Ok(Change::new(row.get(0)?, row.get(1)?))
        })?
        .collect();

    result
}

fn load_version(conn: &DatabaseConnection, id: usize) -> Result<usize, rusqlite::Error> {
    let version: Option<usize> = conn.query_row(
        "select max(version) from updates where updates.nodeId = ?",
        [id],
        |row| row.get(0),
    )?;

    Ok(version.unwrap_or(0))
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Change {
    target: String,
    value: Option<Value>,
}

impl Change {
    fn new(target: String, value: Option<Value>) -> Change {
        Change { target, value }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct ClientUpdate {
    version: usize,
    changes: Vec<Change>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct ServerHandshake {
    id: Option<String>,

    #[serde(flatten)]
    update: ServerUpdate,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct ServerUpdate {
    version: usize,

    #[serde(skip_serializing_if = "Option::is_none")]
    changes: Option<Vec<Change>>,
}

struct Context {
    db: Arc<Mutex<DatabaseConnection>>,
    nodes: RwLock<HashMap<String, Arc<Node>>>,
}

struct Node {
    id: usize,
    key: String,
    db: Arc<Mutex<DatabaseConnection>>,
    inner: tokio::sync::Mutex<NodeState>,
}

#[derive(Default)]
struct NodeSockets {
    next_id: usize,
    active: Vec<(usize, SocketSink)>,
}

impl NodeSockets {
    fn add(&mut self, sink: SocketSink) -> usize {
        let id = self.next_id;
        self.next_id += 1;

        self.active.push((id, sink));
        id
    }

    fn remove(&mut self, id: usize) {
        let index = self.active.iter().position(|pair| id == pair.0);
        let _ = self.active.remove(index.unwrap());
    }
}

struct NodeState {
    version: usize,
    data: Value,
    sockets: NodeSockets,
}

impl Node {
    fn new(
        db: Arc<Mutex<DatabaseConnection>>,
        id: usize,
        key: String,
        version: usize,
        data: Value,
    ) -> Node {
        let data = data.into();
        let sockets = Default::default();

        let inner = NodeState {
            version,
            data,
            sockets,
        }
        .into();

        Node { id, key, db, inner }
    }

    async fn handle(&self, update: ClientUpdate, from: usize) {
        let t0 = std::time::Instant::now();

        let mut inner = self.inner.lock().await;

        for change in update.changes.clone() {
            apply(&mut inner.data, change);
        }

        inner.version += 1;
        let version = inner.version;

        let t1 = std::time::Instant::now();

        {
            let mut db = self.db.lock().unwrap();
            let db = db.transaction().unwrap();

            db.execute(
                "insert into updates (nodeId, version) values (?, ?)",
                (self.id, version),
            )
            .unwrap();

            let update_id = db.last_insert_rowid();

            for (ordering, change) in update.changes.iter().enumerate() {
                db.execute(
                    "insert into changes (updateId, ordering, target, value) values (?, ?, ?, ?)",
                    (update_id, ordering, &change.target, &change.value),
                )
                .unwrap();
            }

            db.commit().unwrap();
        }

        let t2 = std::time::Instant::now();

        let notify = ServerUpdate {
            version,
            changes: Some(update.changes),
        };

        let notify = serde_json::to_string(&notify).unwrap();
        let message = Message::Text(notify);

        let t3 = std::time::Instant::now();

        for (id, sink) in inner.sockets.active.iter_mut() {
            if *id == from {
                let notify = ServerUpdate {
                    version,
                    changes: None,
                };

                let notify = serde_json::to_string(&notify).unwrap();
                sink.send(Message::Text(notify)).await.unwrap();
            } else {
                sink.send(message.clone()).await.unwrap();
            }
        }

        let t4 = std::time::Instant::now();
        println!("handle {:?}", t1 - t0);
        println!("       {:?}", t2 - t1);
        println!("       {:?}", t3 - t2);
        println!("       {:?}", t4 - t3);
    }

    async fn attach(scope: &Node, socket: Socket, head: usize) {
        let (mut sink, mut source) = socket.split();

        let t0 = std::time::Instant::now();

        let socket_id = {
            let mut inner = scope.inner.lock().await;

            let handshake = {
                let mut conn = scope.db.lock().unwrap();

                let changes = Some(load_changes(&mut *conn, scope.id, head).unwrap());
                let version = load_version(&mut *conn, scope.id).unwrap();

                ServerHandshake {
                    id: Some(scope.key.clone()),
                    update: ServerUpdate { version, changes },
                }
            };

            sink.send(Message::Text(serde_json::to_string(&handshake).unwrap()))
                .await
                .unwrap();

            inner.sockets.add(sink)
        };

        let t1 = std::time::Instant::now();

        println!("attach in {:?}", t1 - t0);

        while let Some(message) = source.next().await {
            match message.unwrap() {
                Message::Text(message) => {
                    let update: ClientUpdate = serde_json::from_str(&message).unwrap();
                    scope.handle(update, socket_id).await;
                }

                Message::Close(_) | Message::Ping(_) | Message::Pong(_) => break,

                message => panic!("unsupported message: {:?}", message),
            }
        }

        scope.inner.lock().await.sockets.remove(socket_id);
    }
}

fn connect(scope: Arc<Node>, request: Request<Body>, head: usize) -> Result<Response<Body>, Error> {
    let (response, socket) = hyper_tungstenite::upgrade(request, None)?;

    tokio::spawn(async move {
        let socket = socket.await.unwrap();
        Node::attach(scope.as_ref(), socket, head).await;
    });

    Ok(response)
}

fn join_node(context: &Arc<Context>, key: String) -> Result<Arc<Node>, Error> {
    match context.nodes.read().unwrap().get(&key).cloned() {
        Some(v) => return Ok(v),
        None => {}
    }

    let t0 = std::time::Instant::now();
    let conn = context.db.lock().unwrap();
    let id: usize = conn.query_row("select id from nodes where key = ?", [&key], |row| {
        row.get(0)
    })?;

    let mut data = Value::Object(Default::default());

    let changes = load_changes(&*conn, id, 0)?;
    let version = load_version(&*conn, id)?;

    let count = changes.len();

    for change in changes {
        apply(&mut data, change);
    }

    let t1 = std::time::Instant::now();
    println!("loaded node {}: {} in {:?}", key, count, t1 - t0);

    let scope = Node::new(context.db.clone(), id, key.clone(), version, data);
    let scope = Arc::new(scope);

    context
        .nodes
        .write()
        .unwrap()
        .insert(key.clone(), scope.clone());

    Ok(scope.clone())
}

fn create_node(context: &Arc<Context>) -> Result<Arc<Node>, Error> {
    let bits: [u8; 16] = thread_rng().gen();
    let key = hex::encode(bits);

    let conn = context.db.lock()?;
    conn.execute("insert into nodes (key) values (?)", [&key])?;

    let id = conn.last_insert_rowid() as usize;

    let value = Value::Object(Default::default());
    let scope = Node::new(context.db.clone(), id, key.clone(), 0, value);
    let scope = Arc::new(scope);

    context
        .nodes
        .write()
        .unwrap()
        .insert(key.clone(), scope.clone());

    Ok(scope.clone())
}

#[derive(Serialize, Deserialize)]
struct JoinQueryParameters {
    id: String,
    head: Option<usize>,
}

async fn hello_world(
    context: Arc<Context>,
    request: Request<Body>,
) -> Result<Response<Body>, Error> {
    let uri = request.uri();

    match uri.path() {
        "/new" => {
            let node = create_node(&context)?;

            connect(node, request, 0)
        }

        "/join" => {
            let full_uri = "test:".to_owned() + &uri.to_string();

            let url = Url::parse(&full_uri)?;
            let query = require(url.query(), StatusCode::BAD_REQUEST, "missing parameters")?;

            let params: JoinQueryParameters = serde_qs::from_str(query)?;
            let node = join_node(&context, params.id)?;

            connect(node, request, params.head.unwrap_or(0))
        }

        _ => response(StatusCode::NOT_FOUND, "unknown path"),
    }
}

#[tokio::main]
async fn main() -> Result<(), rusqlite::Error> {
    let conn = DatabaseConnection::open("./db.sqlite")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS nodes (
            id INTEGER NOT NULL,
            key TEXT NOT NULL,
            PRIMARY KEY (id)
        )",
        (),
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS updates (
            id INTEGER NOT NULL,
            nodeId INTEGER NOT NULL,
            version INTEGER NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (nodeId) REFERENCES nodes(id)
        )",
        (),
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS changes (
            id INTEGER NOT NULL,
            updateId INTEGER NOT NULL,
            ordering INTEGER NOT NULL,
            target TEXT NOT NULL,
            value TEXT,
            PRIMARY KEY (id),
            FOREIGN KEY (updateId) REFERENCES updates(id)
        )",
        (),
    )?;

    let port = std::env::args()
        .nth(1)
        .expect("missing port")
        .parse()
        .expect("invalid port");

    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    let context = Arc::new(Context {
        db: Arc::new(Mutex::new(conn)),
        nodes: Default::default(),
    });

    let make_svc = make_service_fn(move |_conn| {
        let context = context.clone();

        instant(ok(service_fn(move |request| {
            let context = context.clone();

            async move {
                match hello_world(context.clone(), request).await {
                    Ok(v) => ok(v),
                    Err(e) => {
                        eprintln!("{:?}", e.message);
                        ok(e.into_response())
                    }
                }
            }
        })))
    });

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }

    Ok(())
}

fn ok<T>(v: T) -> Result<T, Infallible> {
    Ok(v)
}

fn instant<T>(v: T) -> impl Future<Output = T> {
    async { v }
}

fn response<E>(code: StatusCode, body: impl Into<Body>) -> Result<Response<Body>, E> {
    let mut response = Response::new(body.into());
    *response.status_mut() = code;
    Ok(response)
}

fn require<T>(o: Option<T>, status: StatusCode, body: impl Into<String>) -> Result<T, Error> {
    match o {
        Some(v) => Ok(v),
        None => Err(Error::new(status, body)),
    }
}
