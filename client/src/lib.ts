import { init } from './core';
export { Collection } from './collection';

export async function join_new(host: string) {
  const ws = new WebSocket(`${host}/new`);
  return await init(ws);
}

export async function join(host: string, id: string) {
  const ws = new WebSocket(`${host}/join?id=${id}`);
  return await init(ws);
}
