export type Collection<T> =
  & { [id: number]: T & { id: number } }
  & { nextId: number };

export namespace Collection {
  export function create<T>(): Collection<T> {
    return { nextId: 0 };
  }

  export function array<T>(c: Collection<T>) {
    return Object.keys(c)
      .filter(id => id != 'nextId')
      .map(id => c[id as any]);
  }

  export function insert<T>(c: Collection<T>, value: T) {
    const id = c.nextId++;

    return c[id] = Object.assign({ id }, value);
  }
}
