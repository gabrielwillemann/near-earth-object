<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate color="primary" :size="70" :width="7" />
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Overlay',
  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },
};
</script>
