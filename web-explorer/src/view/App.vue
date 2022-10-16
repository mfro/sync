<template>
  <v-app class="root">
    <pre>{{ stringify(data, '  ') }}</pre>
  </v-app>
</template>

<script setup>
import { inject } from 'vue';
import { stringify } from '@mfro/sync-vue';

const data = inject('data');
</script>

<style>
#app {
  width: 100vw;
  /* height: 100vh; */
}
</style>

<style scoped lang="scss">
pre {
  font-family: 'Cascadia Code', monospace;
}
</style>
