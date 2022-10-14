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
  for (const key in test) {
    console.log(`running test ${key}`);
    const fn = test[key as keyof typeof test];
    await fn();
  }

  process.exit(0);
}
