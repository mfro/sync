import { assert } from '@mfro/assert';
import { Collection, makeRef } from '@mfro/sync-vue';
import { createMemoryEngine } from '@mfro/sync-vue/src/engine/memory';

function init() {
  const { data } = createMemoryEngine<any>();

  return data;
}

function eq(a: any, b: any) {
  switch (typeof a) {
    case 'boolean':
    case 'number':
    case 'string':
      return b === a;

    case 'object':
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length != bKeys.length) {
        return false;
      }

      for (const key of aKeys) {
        if (!eq(a[key], b[key])) {
          return false;
        }
      }

      return true;

    default:
      assert(false, 'invalid data type');
  }
}

function throws(fn: () => void) {
  try {
    fn();
  } catch (e) {
    return
  }

  assert(false, 'throws');
}

export function empty() {
  const data = init();
  assert(eq(data, {}), 'empty');
}

export function strings() {
  const data = init();
  data.test = 'hello';
  data['-x-'] = 'test';

  assert(eq(data, { test: 'hello', '-x-': 'test' }), 'empty');
}

export function numbers() {
  const data = init();
  data.test = 5;
  data[5] = 6;

  assert(eq(data, { 5: 6, test: 5 }), 'empty');
}

export function booleans() {
  const data = init();
  data['true'] = true;
  data['false'] = false;

  assert(eq(data, { true: true, false: false }), 'empty');
}

export function objects() {
  const data = init();
  data.x = {};
  data.x.y = {};

  assert(eq(data, { x: { y: {} } }), 'empty');
}

export function refs() {
  const data = init();
  data.x = {};
  data.x.y = makeRef(data.x);

  assert(data.x == data.x.y, 'empty');
}

export function duplicate_throw() {
  const data = init();
  data.x = {};

  throws(() => data.y = data.x);
  throws(() => data.x.y = data.x);
  throws(() => data.z = { x: data.x });
}

export function collections() {
  const data = init();
  data.x = Collection.create();
  data.x.insert({ value: 5 });
  data.x.insert({ value: 6 });

  assert(data.x.get(0).value === 5, 'empty');
  assert(data.x.get(1).value === 6, 'empty');
}

export function ref_in_collections() {
  const data = init();
  data.x = Collection.create();
  data.y = { test: 'hello' };
  data.x.insertRef(data.y);

  data.y = { test: 'updated' };
  assert(data.x.get(0).test === 'updated', 'empty');

  data.y.test = 'updated2';
  assert(data.x.get(0).test === 'updated2', 'empty');
}

export function collection_in_ref() {
  const data = init();
  data.x = Collection.create();
  data.y = makeRef(data.x);
  data.x.insert({ value: 'test' });

  assert(data.x.get(0).value === 'test', 'empty');
  assert(data.y.get(0).value === 'test', 'empty');
}
