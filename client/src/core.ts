import { isObject } from '@vue/shared'
import { track, trigger, TrackOpTypes, TriggerOpTypes, ITERATE_KEY, ReactiveFlags, toRaw } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
import { assert } from '@mfro/assert';

import { Path } from './path';
import { Change, ServerHandshake, ServerUpdate } from './common';

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

export const Flags = {
  RAW: '__v_raw' as ReactiveFlags.RAW,
  SAVE: '__v_save' as const,
};

export const Fields = {
  path: '__mfro_path',
  context: '__mfro_context',
} as const;

export class Adapt<Model> {
  constructor(
    protected readonly model: Model
  ) { }

  toJSON() {
    return (this as any)[Flags.SAVE];
  }

  static register<T extends DataObject>(name: string, adapter: typeof Adapt<T>) {
    registerLoadAdapter<T>(name, (context, path, target) => {
      return new adapter(createValue(context, path, target));
    });

    Object.defineProperty(adapter.prototype, Flags.SAVE, {
      enumerable: false,
      configurable: false,
      get(this: Adapt<T>) {
        return [name, this.model];
      },
    });
  }
}

export type LoadAdapter<T extends DataValue> = (context: Context, path: string, v: T) => object;

export type DataValue =
  | null
  | number
  | string
  | boolean
  | DataObject
// | JSONArray

export type DataAdapt = [string, DataValue];
export type DataObject = Partial<{ [key: string]: DataValue }>;

export interface Context {
  ws: WebSocket;
  version: number;
  speculation: number;
  changes: Change[],
  root: any;

  cacheKey: string;
}

type ProxyBase = {
  [Fields.path]: string,
  [Fields.context]: Context,
};

const loadAdapters = new Map<string, LoadAdapter<any>>();
const proxyCache = new WeakMap<any, object>();

function flush(context: Context) {
  // console.log(`flush`, context.changes);

  context.version += 1;
  context.speculation += 1;

  context.ws.send(JSON.stringify({
    version: context.version,
    changes: context.changes,
  }));

  context.changes.length = 0;
}

export function init(ws: WebSocket, ...args: [] | [string, number, any]) {
  let [cacheKey, version, state] = args.length == 0
    ? ['', 0, {}]
    : args;

  return new Promise<{ data: {}, id: string }>(resolve => {
    const context: Context = {
      ws,
      version,
      speculation: 0,
      changes: [],
      root: null,
      cacheKey,
    };

    context.root = createValue(context, '', state);

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
          data: context.root,
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

  localStorage.setItem(context.cacheKey, JSON.stringify({
    version: context.version,
    state: toRaw(context.root),
  }));
}

function applyChange(context: Context, target: string, value: any) {
  const path = Path.parse(target);
  const receiver = Path.resolve(toRaw(context.root), path.slice(0, -1));
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

  const existing = proxyCache.get(target);
  if (existing) return existing as T;

  if (Array.isArray(target)) {
    assert(target.length == 2 && typeof target[0] == 'string', 'adapter');

    const adapter = loadAdapters.get(target[0]);
    assert(adapter != null, 'adapter');

    const value = adapter(context, `${path}/1`, target[1]);
    proxyCache.set(target, value);

    return value;
  } else {
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

    const value = new Proxy(target as any, {
      has(target, key) {
        track(target, VueTrackOps.HAS, key);
        return key in target;
      },

      get(target, key, self) {
        if (key == Flags.RAW)
          return target;

        if (key == Flags.SAVE) {
          const context: Context = target[Fields.context];
          const path: string = target[Fields.path];

          assert(target === Path.resolve(toRaw(context.root), Path.parse(path)), 'invalid ref assignment');
          return ['ref', path];
        }

        if (key == 'toJSON') {
          return () => this[Flags.SAVE];
        }

        track(target, VueTrackOps.GET, key);
        const value = Reflect.get(target, key, self);

        if (typeof key == 'symbol' || !isObject(value)) {
          return value;
        } else {
          const path: string = target[Fields.path] + Path.toString([key]);
          const context: Context = target[Fields.context];

          return createValue(context, path, value);
        }
      },

      set(target, key, value, self) {
        if (typeof key == 'symbol') {
          return Reflect.set(target, key, value, self);
        } else {
          const path: string = target[Fields.path] + Path.toString([key]);
          const context: Context = target[Fields.context];

          update(context, path, value);
          return true;
        }
      },

      deleteProperty(target, key) {
        if (typeof key == 'symbol') {
          return Reflect.deleteProperty(target, key);
        } else {
          const path = target[Fields.path] + Path.toString([key]);
          update(target[Fields.context], path, undefined);

          return true;
        }
      },

      ownKeys(target) {
        track(target, VueTrackOps.ITERATE, ITERATE_KEY);
        return Reflect.ownKeys(target)
      },
    });

    proxyCache.set(target, value);
    return value;
  }
}

export function registerLoadAdapter<T extends DataValue>(name: string, load: LoadAdapter<T>) {
  assert(!loadAdapters.has(name), `duplicate adapter definition ${name}`);
  loadAdapters.set(name, load);
}

export function update(context: Context, target: string, value: any) {
  // console.log(`update`, target, value);

  value = value?.[Flags.SAVE] ?? toRaw(value);

  if (context.changes.length == 0) {
    nextTick(() => flush(context));
  }

  context.changes.push({ target, value });

  applyChange(context, target, value);
}
