import 'ress'
import { createApp, h } from 'vue'
import { framework } from '@mfro/vue-ui';

import App from './view/App.vue';
import { Collection, join, join_new } from '@mfro/sync-vue';

main();

function init(id: string, data: any) {
  data.x = { counter: 5 };
  data.x.test = Collection.create();
  data.x.test.insert(data.x);

  // console.log(JSON.stringify(data));
  console.log(data);

  // const app = createApp({
  //   provide: { data, id },
  //   render: () => h(App),
  // });

  // app.config.unwrapInjectedRef = true;

  // app.use(framework);

  // app.mount('#app');
}

async function main() {
  const url = new URL(location.href);
  const idParam = url.searchParams.get('id');

  if (idParam) {
    const { data } = await join('wss://api.mfro.me/sync', idParam);
    init(idParam, data);
  } else {
    const { data, id } = await join_new('wss://api.mfro.me/sync');
    init(id, data);
  }
}
