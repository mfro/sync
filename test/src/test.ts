import { assert } from '@mfro/assert';
import { Collection, join_new } from '@mfro/sync-vue';

async function init(): Promise<any> {
  const { data } = await join_new('ws://localhost:8081');

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

async function defer() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

export async function empty() {
  const data = await init();
  assert(eq(data, {}), 'empty');
}

export async function strings() {
  const data = await init();
  data.test = 'hello';
  data['-x-'] = 'test';
  await defer();
  assert(eq(data, { test: 'hello', '-x-': 'test' }), 'empty');
}

export async function numbers() {
  const data = await init();
  data.test = 5;
  data[5] = 6;
  await defer();
  assert(eq(data, { 5: 6, test: 5 }), 'empty');
}

export async function booleans() {
  const data = await init();
  data['true'] = true;
  data['false'] = false;
  await defer();
  assert(eq(data, { true: true, false: false }), 'empty');
}

export async function objects() {
  const data = await init();
  data.x = {};
  data.x.y = {};
  await defer();
  assert(eq(data, { x: { y: {} } }), 'empty');
}

export async function refs() {
  const data = await init();
  data.x = {};
  data.x.y = data.x;
  await defer();
  assert(data.x == data.x.y, 'empty');
}

export async function collections() {
  const data = await init();
  data.x = Collection.create();
  data.x.insert({ value: 5 });
  data.x.insert({ value: 6 });

  await defer();
  assert(data.x.get(0).value === 5, 'empty');
  assert(data.x.get(1).value === 6, 'empty');
}

export async function ref_in_collections() {
  const data = await init();
  data.x = Collection.create();
  data.y = { test: 'hello' };
  data.x.insert(data.y);

  data.y = { test: 'updated' };
  await defer();
  assert(data.x.get(0).test === 'updated', 'empty');

  data.y.test = 'updated2';
  await defer();
  assert(data.x.get(0).test === 'updated2', 'empty');
}

export async function collection_in_ref() {
  const data = await init();
  data.x = Collection.create();
  data.y = data.x;
  data.x.insert({ value: 'test' });

  await defer();
  assert(data.x.get(0).value === 'test', 'empty');
  assert(data.y.get(0).value === 'test', 'empty');
}
