<template>
  <v-app class="root">
    <pre class="pa-3"><a :href="link">{{ link }}</a></pre>

    <pre>{{ JSON.stringify(data, null, '  ') }}</pre>

    <v-flex class="pa-3">
      <v-button @click="data.x.counter += 1"
                class="ma-3">+1</v-button>
      <v-button @click="data.x.counter -= 1"
                class="ma-3">-1</v-button>
    </v-flex>

    <v-flex class="pa-3">
      <v-button @click="data.y.counter += 1"
                class="ma-3">+1</v-button>
      <v-button @click="data.y.counter -= 1"
                class="ma-3">-1</v-button>
    </v-flex>

    <v-flex class="pa-3">
      <v-button @click="data.z.counter += 1"
                class="ma-3">+1</v-button>
      <v-button @click="data.z.counter -= 1"
                class="ma-3">-1</v-button>
    </v-flex>

    <v-flex class="pa-3">
      <v-button @click="data.z = data.x"
                class="ma-3">x</v-button>

      <v-button @click="data.z = data.y"
                class="ma-3">y</v-button>
    </v-flex>
  </v-app>
</template>

<script setup>
import { computed, inject } from 'vue';

const id = inject('id');
const data = inject('data');

const link = computed(() => {
  const url = new URL(location.href);
  url.searchParams.set('id', id);

  return url.toString();
})

function increment() {
  data.state.counter += 1;
}

function decrement() {
  data.state.counter -= 1;
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>

<style scoped lang="scss">
pre {
  font-family: 'Cascadia Code', monospace;
}
</style>
