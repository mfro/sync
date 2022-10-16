import { isObject } from '@vue/shared';
import { trigger, TrackOpTypes, TriggerOpTypes, ReactiveFlags, toRaw, ITERATE_KEY, track } from '@vue/reactivity'
import { assert } from '@mfro/assert';

import { Path } from './path';
import { DataAdapt, DataObject, DataValue, Engine } from './common';

export const Fields = {
  RAW: '__v_raw' as ReactiveFlags.RAW,
  path: '__mfro_path',
  context: '__mfro_context',
} as const;

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

export type ProxyBase = {
  [Fields.RAW]: DataValue,
  [Fields.path]: string,
  [Fields.context]: Engine,
};

export type ProxyTarget = {
  [Fields.path]: string,
  [Fields.context]: Engine,
};

export class AdaptClass<Model> {
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

  static register<T>(name: string, adapter: any) {
    registerAdapter<T>(name, (inner) => new adapter(inner) as any);
  }
}

export type Adapter<T> = (inner: [string, T] & ProxyTarget) => object & ProxyBase;

const loadAdapters = new Map<string, Adapter<any>>();
const proxyCache = new WeakMap<any, ProxyBase>();
export let rawJSON = false;

export function stringify(value: any, indent = undefined) {
  rawJSON = true;
  const json = JSON.stringify(value, null, indent);
  rawJSON = false;
  return json;
}

export function applyChange(context: Engine, target: string, value: any) {
  const path = Path.parse(target);
  const receiver = toRaw(Path.resolve(context.root, path.slice(0, -1)));
  const lastKey = path[path.length - 1];

  if (value === undefined) {
    delete receiver[lastKey];
    trigger(receiver, VueTriggerOps.DELETE, lastKey);
  } else {
    const hadKey = lastKey in receiver;

    receiver[lastKey] = toRaw(value);
    trigger(receiver, hadKey ? VueTriggerOps.SET : VueTriggerOps.ADD, lastKey);
  }
}

export function createValue<T extends DataObject | DataAdapt>(context: Engine, path: string, target: T) {
  assert(typeof target == 'object' && target != null, 'createValue');

  const raw = toRaw(target) as any;
  assert(!raw[Fields.path] || raw[Fields.path] === path, 'duplicate value');

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

    const value = adapter(proxy);
    // caching this causes a lot of problems with refs
    // - rawJSON doesn't work as it pulls the cached value instead of the ['ref']
    // - if the target of the ref is replaced, the cache is stale
    // proxyCache.set(raw, value);
    return value;
  } else {
    proxyCache.set(raw, proxy);
    return proxy;
  }
}

export function registerAdapter<T>(name: string, load: Adapter<T>) {
  assert(!loadAdapters.has(name), `duplicate adapter definition ${name}`);
  loadAdapters.set(name, load);
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
      validate_duplicates(value);

      target[Fields.context].createChange(target[Fields.path] + Path.toString([key]), value);
      return true;
    }
  },

  deleteProperty(target, key) {
    if (typeof key == 'symbol') {
      return Reflect.deleteProperty(target, key);
    } else {
      target[Fields.context].createChange(target[Fields.path] + Path.toString([key]), undefined);
      return true;
    }
  },

  ownKeys(target) {
    track(target, VueTrackOps.ITERATE, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
};

function validate_duplicates(value: any) {
  assert(toRaw(value) === value, 'duplicate value');

  if (value && typeof value === 'object') {
    for (const key in value) {
      validate_duplicates(value[key]);
    }
  }
}
