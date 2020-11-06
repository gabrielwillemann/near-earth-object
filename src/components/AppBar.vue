<template>
  <v-app-bar app color="primary" dark>
    <v-btn icon @click="$emit('click-menu')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer />
    <span>{{ title }}</span>
    <v-spacer />
    <v-btn icon @click="$emit('click-logout')">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: ['title'],
};
</script>
