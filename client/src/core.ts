import { trigger, TrackOpTypes, TriggerOpTypes, ReactiveFlags, toRaw, ITERATE_KEY, track } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
import { assert } from '@mfro/assert';

import { Path } from './path';
import { Change, ServerHandshake, ServerUpdate } from './common';
import { isObject } from '@vue/shared';

export const VueTrackOps = {
  GET: 'get' as TrackOpTypes.GET,
  HAS: 'has' as TrackOpTypes.HAS,
  ITERATE: 'iterate' as TrackOpTypes.ITERATE,
};

export const VueTriggerOps = {
  SET: 'set' as TriggerOpTypes.SET,
  ADD: 'add' as TriggerOpTypes.ADD,
  DELETE: 'delete' as TriggerOpTypes.DELETE,
  CLEAR: 'clear' as TriggerOpTypes.CLEAR,
};

export const Fields = {
  RAW: '__v_raw' as ReactiveFlags.RAW,
  path: '__mfro_path',
  context: '__mfro_context',
} as const;

export type ProxyBase = {
  [Fields.RAW]: DataValue,
  [Fields.path]: string,
  [Fields.context]: Context,
};

export type ProxyTarget = {
  [Fields.path]: string,
  [Fields.context]: Context,
};

export class Adapt<Model> {
  protected get value() {
    return this.inner[1];
  }

  constructor(
    private readonly inner: [string, Model] & ProxyTarget
  ) { }

  private get [Fields.RAW]() {
    return this.inner as any;
  }

  private get [Fields.path]() {
    return this.inner[Fields.path];
  }

  private get [Fields.context]() {
    return this.inner[Fields.context];
  }

  private toJSON() {
    return this[Fields.RAW];
  }

  static register<T>(name: string, adapter: typeof Adapt<T>) {
    registerLoadAdapter<T>(name, (inner) => new adapter(inner) as any);
  }
}

export type LoadAdapter<T> = (inner: [string, T] & ProxyTarget) => object & ProxyBase;

export type DataValue =
  | null
  | number
  | string
  | boolean
  | DataObject

export type DataAdapt = [string, DataValue];
export type DataObject = Partial<{ [key: string]: DataValue }>;

export interface Context {
  ws: WebSocket;
  version: number;
  speculation: number;
  changes: Change[],
  root: DataObject;

  cacheKey: string;
}

const loadAdapters = new Map<string, LoadAdapter<any>>();
const proxyCache = new WeakMap<any, ProxyBase>();
export let rawJSON = false;

function stringify(value: any) {
  rawJSON = true;
  const json = JSON.stringify(value);
  rawJSON = false;
  return json;
}

function flush(context: Context) {
  // console.log(`flush`, context.changes);

  context.version += 1;
  context.speculation += 1;

  context.ws.send(stringify({
    version: context.version,
    changes: context.changes,
  }));

  context.changes.length = 0;
}

export function init(ws: WebSocket, ...args: [] | [string, number, any]) {
  let [cacheKey, version, root] = args.length == 0
    ? ['', 0, {}]
    : args;

  return new Promise<{ data: {}, id: string }>(resolve => {
    const context: Context = {
      ws,
      version,
      speculation: 0,
      changes: [],
      root,
      cacheKey,
    };

    ws.addEventListener('close', e => console.log(e));
    ws.addEventListener('error', e => console.log(e));

    ws.addEventListener('message', e => {
      const message: ServerHandshake | ServerUpdate = JSON.parse(e.data);

      if ('id' in message) {
        context.cacheKey = `mfro:sync:${message.id}`;
      }

      applyUpdate(context, message);

      if ('id' in message) {
        resolve({
          data: createValue(context, '', root),
          id: message.id!,
        });
      }
    });
  });
}

function applyUpdate(context: Context, update: ServerUpdate) {
  // console.log(update);

  if (update.changes) {
    assert(context.speculation == 0, 'speculation');

    for (const { target, value } of update.changes) {
      applyChange(context, target, value);
    }

    context.version = update.version;
  } else {
    assert(context.speculation > 0, 'speculation');
    context.speculation -= 1;
  }

  localStorage.setItem(context.cacheKey, stringify({
    version: context.version,
    root: context.root,
  }));
}

function applyChange(context: Context, target: string, value: any) {
  const path = Path.parse(target);
  const receiver = toRaw(Path.resolve(context.root, path.slice(0, -1)));
  const lastKey = path[path.length - 1];

  if (value === undefined) {
    delete receiver[lastKey];
    trigger(receiver, VueTriggerOps.DELETE, lastKey);
  } else {
    const hadKey = lastKey in receiver;

    receiver[lastKey] = value;
    trigger(receiver, hadKey ? VueTriggerOps.SET : VueTriggerOps.ADD, lastKey);
  }
}

export function createValue<T extends DataObject | DataAdapt>(context: Context, path: string, target: T) {
  assert(typeof target == 'object' && target != null, 'createValue');

  const raw = toRaw(target) as any;
  if (raw[Fields.path] && raw[Fields.path] !== path) {
    return ['ref', raw[Fields.path]];
  }

  const existing = proxyCache.get(raw);
  if (existing) return existing;

  Object.defineProperties(raw, {
    [Fields.path]: {
      value: path,
      writable: false,
      enumerable: false,
      configurable: false,
    },
    [Fields.context]: {
      value: context,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  })

  const proxy: any = new Proxy(raw, proxyHandler);

  if (Array.isArray(raw)) {
    assert(raw.length == 2 && typeof raw[0] == 'string', 'adapter');

    const adapter = loadAdapters.get(raw[0]);
    assert(adapter != null, 'adapter');

    return adapter(proxy);
  } else {
    proxyCache.set(raw, proxy);
    return proxy;
  }
}

export function registerLoadAdapter<T>(name: string, load: LoadAdapter<T>) {
  assert(!loadAdapters.has(name), `duplicate adapter definition ${name}`);
  loadAdapters.set(name, load);
}

export function update(context: Context, target: string, value: any) {
  if (isObject(value)) {
    value = createValue(context, target, value)
  }

  if (context.changes.length == 0) {
    nextTick(() => flush(context));
  }

  context.changes.push({ target, value });

  applyChange(context, target, value);
}

const proxyHandler: ProxyHandler<ProxyTarget> = {
  has(target, key) {
    track(target, VueTrackOps.HAS, key);
    return key in target;
  },

  get(target, key, self) {
    if (key == Fields.RAW) return target;

    if (key == Fields.path) {
      if (rawJSON) return undefined;
      return target[Fields.path];
    }

    if (key == Fields.context) {
      if (rawJSON) return undefined;
      return target[Fields.context];
    }

    track(target, VueTrackOps.GET, key);
    const value = Reflect.get(target, key, self);

    if (typeof key == 'symbol' || !isObject(value)) {
      return value;
    } else {
      return createValue(target[Fields.context], target[Fields.path] + Path.toString([key]), value);
    }
  },

  set(target, key, value, self) {
    if (typeof key == 'symbol') {
      return Reflect.set(target, key, value, self);
    } else {
      update(target[Fields.context], target[Fields.path] + Path.toString([key]), value);
      return true;
    }
  },

  deleteProperty(target, key) {
    if (typeof key == 'symbol') {
      return Reflect.deleteProperty(target, key);
    } else {
      update(target[Fields.context], target[Fields.path] + Path.toString([key]), undefined);
      return true;
    }
  },

  ownKeys(target) {
    track(target, VueTrackOps.ITERATE, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
};
