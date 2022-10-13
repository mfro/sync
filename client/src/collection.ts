import { Adapt } from './core';

export type CollectionModel<T> =
  & { [id: number]: T & { id: number } }
  & { nextId: number };

export class Collection<T> extends Adapt<CollectionModel<T>> {
  static create<T>() {
    return new Collection<T>({ nextId: 0 });
  }

  get(id: number) {
    return this.model[id];
  }

  array() {
    return Object.keys(this.model)
      .filter(id => id != 'nextId')
      .map(id => this.model[id as any]);
  }

  insert(value: T) {
    const id = this.model.nextId++;

    return this.model[id] = Object.assign({ id }, value);
  }

  remove(id: number) {
    delete this.model[id];
  }
}

Adapt.register('collection', Collection);
