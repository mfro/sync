import { assert } from '@mfro/assert';
import { AdaptClass, Fields } from '../core';
import { makeRef } from './ref';

export type CollectionModel<T> =
  & { [id: number]: T & { id: number } }
  & { nextId: number };

export class Collection<T> extends AdaptClass<CollectionModel<T>> {
  static create<T = any>(): Collection<T> {
    return ['collection', { nextId: 0 }] as any;
  }

  [Symbol.iterator]() {
    return this.array()[Symbol.iterator]();
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
      assert(!Array.isArray(value), 'array properties');
      Object.assign(value as any, { id });
    }

    this.value[id] = value as any;
    return this.get(id);
  }

  insertRef(value: T) {
    let id;

    if ('id' in value) {
      id = (value as any).id;
      assert(typeof id == 'number', 'invalid id')
      this.value.nextId = Math.max(this.value.nextId, id + 1);
    } else {
      id = this.value.nextId++;
      assert(!Array.isArray(value), 'array properties');
      Object.assign(value as any, { id });
    }

    if ((value as any)[Fields.path]) {
      this.value[id] = makeRef(value as any);
    } else {
      this.value[id] = makeRef(value as any);
    }

    return this.get(id);
  }

  remove(id: number) {
    delete this.value[id];
  }
}

AdaptClass.register('collection', Collection);
