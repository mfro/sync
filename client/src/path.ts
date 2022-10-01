import { assert } from '@mfro/assert';

export namespace Path {
  export function resolve(root: any, path: string[]) {
    let node = root;

    for (const key of path) {
      assert(key in node, 'invalid node');
      node = node[key];
    }

    return node;
  }

  export function parse(path: string): string[] {
    assert(path[0] == '/', 'valid path');

    return path.slice(1).split('/')
      .map(part => part
        .replace(/~1/g, '/')
        .replace(/~0/g, '~')
      );
  }

  export function toString(path: string[]) {
    return '/' + path.map(n => n.replace(/~/g, '~0').replace(/\//g, '~1')).join('/');
  }
}
