import { assert } from '@mfro/assert';
import { nextTick } from '@vue/runtime-core';
import { isObject } from '@vue/shared';

import { Change, Engine } from '../common';
import { applyChange, createValue, stringify } from '../core';

export interface ClientUpdate {
  version: number,
  changes: Change[],
}

export interface ServerHandshake extends ServerUpdate {
  id?: string;
}

export interface ServerUpdate {
  version: number;
  changes: Change[];
}

interface WebSocketEngine extends Engine {
  ws: WebSocket;
  speculation: number;
  pending_changes: Change[],
  cacheKey: string;
}

export interface WebSocketEngineOptions {
  host: string;
  id?: string;
}

export function createWebSocketEngine<T extends {}>(options: WebSocketEngineOptions) {
  let cacheKey = '';
  let version = 0;
  let root = {};

  let url;
  if (options.id) {
    cacheKey = `mfro:sync:${options.id}`;

    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      const loaded = JSON.parse(cache);
      version = loaded.version;
      root = loaded.root;
    }

    url = `${options.host}/join?id=${options.id}&version=${version}`;
  } else {
    url = `${options.host}/new`;
  }

  const ws = new WebSocket(url);

  return new Promise<{ data: T, id: string }>(resolve => {
    const context: WebSocketEngine = {
      root,
      version,
      createChange,

      ws,
      speculation: 0,
      pending_changes: [],
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

function applyUpdate(context: WebSocketEngine, update: ServerUpdate) {
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

export function createChange(this: WebSocketEngine, target: string, value: any) {
  if (this.pending_changes.length == 0) {
    nextTick(() => flush(this));
  }

  this.pending_changes.push({ target, value });

  applyChange(this, target, value);
}

function flush(context: WebSocketEngine) {
  // console.log(`flush`, context.changes);

  context.version += 1;
  context.speculation += 1;

  context.ws.send(stringify({
    version: context.version,
    changes: context.pending_changes,
  }));

  context.pending_changes.length = 0;
}
