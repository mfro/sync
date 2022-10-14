import { assert } from '@mfro/assert';
import { Adapt } from './core';

export type CollectionModel<T> =
  & { [id: number]: T & { id: number } }
  & { nextId: number };

export class Collection<T> extends Adapt<CollectionModel<T>> {
  static create<T = any>(): Collection<T> {
    return ['collection', { nextId: 0 }] as any;
  }

  get(id: number) {
    return this.value[id];
  }

  array() {
    return Object.keys(this.value)
      .filter(id => id != 'nextId')
      .map(id => this.value[id as any]);
  }

  insert(value: T) {
    let id;

    if ('id' in value) {
      id = (value as any).id;
      assert(typeof id == 'number', 'invalid id')
      this.value.nextId = Math.max(this.value.nextId, id + 1);
    } else {
      id = this.value.nextId++;
      Object.assign(value as any, { id });
    }

    this.value[id] = value as any;
    return this.get(id);
  }

  remove(id: number) {
    delete this.value[id];
  }
}

Adapt.register('collection', Collection);
