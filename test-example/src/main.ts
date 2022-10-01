import { createApp, h } from 'vue'
import { framework } from '@mfro/vue-ui';

import App from './view/App.vue';
import { join, join_new } from '@mfro/sync-vue';

main();

function init(id: string, data: any) {
  const app = createApp({
    provide: { data, id },
    render: () => h(App),
  });

  app.config.unwrapInjectedRef = true;

  app.use(framework);

  app.mount('#app');
}

async function main() {
  const url = new URL(location.href);
  const idParam = url.searchParams.get('id');

  if (idParam) {
    const { data } = await join('ws://box:8081', idParam);
    init(idParam, data);
  } else {
    const { data, id } = await join_new('ws://box:8081');
    init(id, data);
  }
}
