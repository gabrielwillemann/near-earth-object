<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="text-center">Login</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text
      >This application requires a Google account to login. Click the button below!</v-card-text
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login" large>Login with Google</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    async login() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      const res = await this.$firebase.auth().signInWithPopup(provider);
      if (res.credential) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>
