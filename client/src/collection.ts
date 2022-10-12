import { createValue, registerAdapter, VueFlags } from "./core";

export type Collection<T> =
  & { [id: number]: T & { id: number } }
  & { nextId: number };

// export namespace Collection {
//   export function create<T>(): Collection<T> {
//     return { nextId: 0 };
//   }

//   export function array<T>(c: Collection<T>) {
//     return Object.keys(c)
//       .filter(id => id != 'nextId')
//       .map(id => c[id as any]);
//   }

//   export function insert<T>(c: Collection<T>, value: T) {
//     const id = c.nextId++;

//     return c[id] = Object.assign({ id }, value);
//   }

//   export function remove<T>(c: Collection<T>, id: number) {
//     delete c[id];
//   }
// }

export class Collection2<T> {
  constructor(
    private readonly model: Collection<T>,
  ) { }

  insert(value: T) {
    const id = this.model.nextId++;

    return this.model[id] = Object.assign({ id }, value);
  }

  remove(id: number) {
    delete this.model[id];
  }
}

registerAdapter('collection', (context, path, value) => {
  const model = createValue(context, path, value);

  return new Collection2(model as Collection<any>);
});
