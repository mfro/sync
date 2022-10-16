import { Engine } from '../common';
import { applyChange, createValue } from '../core';

interface MemoryEngine extends Engine { }

export function createMemoryEngine<T extends {}>() {
  const context: MemoryEngine = {
    root: {},
    version: 0,
    createChange,
  };

  return {
    data: createValue(context, '', context.root) as T,
    id: '',
  };
}

export function createChange(this: MemoryEngine, target: string, value: any) {
  applyChange(this, target, value);
}
