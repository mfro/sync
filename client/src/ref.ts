import { createValue, Fields, rawJSON, registerLoadAdapter } from './core';
import { Path } from './path';

registerLoadAdapter<string>('ref', (ref) => {
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
