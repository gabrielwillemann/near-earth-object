<template>
  <v-snackbar :value="showMessage" @input="setMessageShow">
    <span>{{ message }}</span>
    <template v-slot:action>
      <v-btn color="red" @click="setMessageShow(false)">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Snackbar',
  computed: {
    ...mapState({
      message: state => state.message.text,
      showMessage: state => state.message.show,
    }),
  },
  methods: {
    ...mapMutations(['setMessageShow']),
  },
};
</script>
