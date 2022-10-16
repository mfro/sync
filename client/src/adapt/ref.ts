import { assert } from '@mfro/assert';
import { createValue, Fields, rawJSON, registerAdapter } from '../core';
import { Path } from '../path';

export function makeRef<T>(target: T): T {
  const refPath = (target as any)[Fields.path];
  assert(refPath !== undefined, 'invalid ref target');

  return ['ref', refPath] as any;
}

registerAdapter<string>('ref', (ref) => {
  if (rawJSON) return ref;

  const context = ref[Fields.context];
  const targetPath = Path.parse(ref[1]);
  const target = Path.resolve(context.root, targetPath);

  // // todo allow replacing ref targets
  // // track(ref, VueTrackOps.GET, 1);
  // watch(
  //   () => Path.resolve(context.root, Path.parse(ref[Fields.path])),
  //   () => assert(false, 'invalidate ref'),
  // );

  return createValue(context, ref[1], target);
});
