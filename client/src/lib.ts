import { isObject } from '@vue/shared'
import { track, trigger, TrackOpTypes, TriggerOpTypes, ITERATE_KEY, ReactiveFlags, toRaw } from '@vue/reactivity'
import { assert } from '@mfro/assert';

const Track = {
  GET: 'get' as TrackOpTypes.GET,
  HAS: 'has' as TrackOpTypes.HAS,
  ITERATE: 'iterate' as TrackOpTypes.ITERATE,
};

const Trigger = {
  SET: 'set' as TriggerOpTypes.SET,
  ADD: 'add' as TriggerOpTypes.ADD,
  DELETE: 'delete' as TriggerOpTypes.DELETE,
  CLEAR: 'clear' as TriggerOpTypes.CLEAR,
};

const Flags = {
  RAW: '__v_raw' as ReactiveFlags.RAW,
};

const Fields = {
  path: '__mfro_path',
  context: '__mfro_context',
};

interface Context {
  ws: WebSocket;
  version: number;
}

interface Change {
  target: string;
  value?: any;
}

interface ClientUpdate {
  version: number,
  changes: Change[],
}

interface ServerHandshake extends ServerUpdate {
  id?: string;
}

interface ServerUpdate {
  version: number;
  changes: Change[];
}

const proxyMap = new WeakMap<object, object>();
const handler: ProxyHandler<any> = {
  has(target, key) {
    track(target, Track.HAS, key);
    return key in target;
  },

  get(target, key, self) {
    if (key == Flags.RAW)
      return target;

    track(target, Track.GET, key);
    const value = Reflect.get(target, key, self);

    if (typeof key == 'symbol' || !isObject(value)) {
      return value;
    } else {
      const path: string = target[Fields.path] + stringPath([key]);
      const context: Context = target[Fields.context];

      return createValue(context, path, value);
    }
  },

  set(target, key, value, self) {

    if (typeof key == 'symbol') {
      return Reflect.set(target, key, value, self);
    } else {
      const path: string = target[Fields.path] + stringPath([key]);
      const context: Context = target[Fields.context];

      update(context, path, value);
      return true;
    }
  },

  deleteProperty(target, key) {
    if (typeof key == 'symbol') {
      return Reflect.deleteProperty(target, key);
    } else {
      const path = target[Fields.path] + stringPath([key]);
      update(target[Fields.context], path, undefined);

      return true;
    }
  },

  ownKeys(target) {
    track(target, Track.ITERATE, ITERATE_KEY);
    return Reflect.ownKeys(target)
  },
};

export function join_new(host: string): PromiseLike<{ data: {}, id: string }> {
  return new Promise(resolve => {
    const ws = new WebSocket(`${host}/new`);

    const context: Context = {
      ws,
      version: 0,
    };

    const root = createValue(context, '', {});

    ws.addEventListener('close', e => console.log(e));
    ws.addEventListener('error', e => console.log(e));

    ws.addEventListener('message', e => {
      let message: ServerHandshake | ServerUpdate = JSON.parse(e.data);

      console.log(message);

      for (const change of message.changes) {
        const path = parsePath(change.target);
        const receiver = resolvePath(toRaw(root), path.slice(0, -1));
        const lastKey = path[path.length - 1];
        sync(receiver, lastKey, change.value);
      }

      if ('id' in message) {
        resolve({
          data: root,
          id: message.id!,
        });
      }
    });
  });
}

export function join(host: string, id: string): PromiseLike<{ data: {}, id: string }> {
  return new Promise(resolve => {
    const ws = new WebSocket(`${host}/join?id=${id}`);

    const context: Context = {
      ws,
      version: 0,
    };

    const root = createValue(context, '', {});

    ws.addEventListener('close', e => console.log(e));
    ws.addEventListener('error', e => console.log(e));

    ws.addEventListener('message', e => {
      let message: ServerHandshake | ServerUpdate = JSON.parse(e.data);

      console.log(message);

      for (const change of message.changes) {
        const path = parsePath(change.target);
        const receiver = resolvePath(toRaw(root), path.slice(0, -1));
        const lastKey = path[path.length - 1];
        sync(receiver, lastKey, change.value);
      }

      if ('id' in message) {
        resolve({
          data: root,
          id: message.id!,
        });
      }
    });
  });
}

function resolvePath(root: any, path: string[]) {
  let node = root;

  for (const key of path) {
    assert(key in node, 'invalid node');
    node = node[key];
  }

  return node;
}

function sync(target: any, key: string, value: any) {
  if (value === undefined) {
    delete target[key];
    trigger(target, Trigger.DELETE, key);
  } else {
    const hadKey = key in target;

    target[key] = value;
    trigger(target, hadKey ? Trigger.SET : Trigger.ADD, key);
  }
}

function createValue<T extends Record<any, any>>(context: Context, path: string, target: T): T {
  assert(typeof target == 'object' && target != null, 'createValue');

  const existing = proxyMap.get(target);
  if (existing) return existing as T;

  Object.defineProperties(target, {
    [Fields.context]: {
      value: context,
      writable: false,
      enumerable: false,
      configurable: false,
    },
    [Fields.path]: {
      value: path,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });

  const value = new Proxy(target, handler);
  proxyMap.set(target, value);
  return value;
}

function update(context: any, target: string, value: any) {
  context.ws.send(JSON.stringify({
    version: context.version,
    changes: [
      { target, value },
    ],
  }));
}

function stringPath(path: string[]) {
  return '/' + path.map(n => n.replace(/~/g, '~0').replace(/\//g, '~1')).join('/');
}

function parsePath(path: string): string[] {
  assert(path[0] == '/', 'valid path');

  return path.slice(1).split('/')
    .map(part => part
      .replace(/~1/g, '/')
      .replace(/~0/g, '~')
    );
}
