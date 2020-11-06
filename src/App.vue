<template>
  <v-app>
    <router-view />
    <Overlay />
    <Snackbar />
  </v-app>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'App',
  components: { Overlay, Snackbar },
};
</script>
