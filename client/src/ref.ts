import { registerLoadAdapter } from './core';
import { Path } from './path';

registerLoadAdapter<string>('ref', (context, path, target) => {
  // todo: come up with a way to mark this value as a ref

  const targetPath = Path.parse(target);
  return Path.resolve(context.root, targetPath);
});
