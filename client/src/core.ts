import { isObject } from '@vue/shared'
import { track, trigger, TrackOpTypes, TriggerOpTypes, ITERATE_KEY, ReactiveFlags, toRaw } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
import { assert } from '@mfro/assert';

import { Path } from './path';
import { Change, ServerHandshake, ServerUpdate } from './common';

export interface Context {
  ws: WebSocket;
  version: number;
  speculation: number;
  changes: Change[],
  root: any;
}

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

const proxyMap = new WeakMap<object, object>();
const objectHandler: ProxyHandler<any> = {
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
    track(target, Track.ITERATE, ITERATE_KEY);
    return Reflect.ownKeys(target)
  },
};

const arrayHandler: ProxyHandler<any> = {
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
      const path: string = target[Fields.path] + Path.toString([key]);
      const context: Context = target[Fields.context];

      return createValue(context, path, value);
    }
  },

  set(target, key, value, self) {
    if (typeof key == 'symbol' || key in Array.prototype) {
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
    track(target, Track.ITERATE, ITERATE_KEY);
    return Reflect.ownKeys(target)
  },
};

function update(context: Context, target: string, value: any) {
  // console.log(`update`, target, value);

  if (context.changes.length == 0) {
    nextTick(() => flush(context));
  }

  context.changes.push({ target, value });

  applyChange(context, target, value);
}

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

export function init(ws: WebSocket) {
  return new Promise<{ data: {}, id: string }>(resolve => {
    const context: Context = {
      ws,
      version: 0,
      speculation: 0,
      changes: [],
      root: null,
    };

    context.root = createValue(context, '', {});

    ws.addEventListener('close', e => console.log(e));
    ws.addEventListener('error', e => console.log(e));

    ws.addEventListener('message', e => {
      const message: ServerHandshake | ServerUpdate = JSON.parse(e.data);
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

export function applyUpdate(context: Context, update: ServerUpdate) {
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
}

function applyChange(context: Context, target: string, value: any) {
  const path = Path.parse(target);
  const receiver = Path.resolve(toRaw(context.root), path.slice(0, -1));
  const lastKey = path[path.length - 1];

  if (value === undefined) {
    delete receiver[lastKey];
    trigger(receiver, Trigger.DELETE, lastKey);
  } else {
    const hadKey = lastKey in receiver;

    receiver[lastKey] = value;
    trigger(receiver, hadKey ? Trigger.SET : Trigger.ADD, lastKey);
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

  const handler = Array.isArray(target) ? arrayHandler : objectHandler;

  const value = new Proxy(target, handler);
  proxyMap.set(target, value);

  return value;
}
