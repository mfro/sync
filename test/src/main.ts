import * as test from './test';
import { WebSocket } from 'ws';

Object.assign(global, {
  WebSocket,
  localStorage: {
    setItem() { },
    getItem() { },
  },
});

main();
async function main() {
  const list = process.argv.slice(2);

  const keys = list.length == 0
    ? Object.keys(test)
    : list;

  for (const key of keys) {
    console.log(`running test ${key}`);
    test[key as keyof typeof test]();
  }

  process.exit(0);
}
