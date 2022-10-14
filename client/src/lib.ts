import { init } from './core';
export { Collection } from './collection';

import './ref';

export async function join_new(host: string) {
  const ws = new WebSocket(`${host}/new`);
  return await init(ws);
}

export async function join(host: string, id: string) {
  let cacheKey = '';
  let version = 0;
  let root = {};

  if (id !== null) {
    cacheKey = `mfro:sync:${id}`;
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
      const loaded = JSON.parse(cache);
      version = loaded.version;
      root = loaded.root;
    }
  }

  const ws = new WebSocket(`${host}/join?id=${id}&version=${version}`);
  return await init(ws, cacheKey, version, root);
}
