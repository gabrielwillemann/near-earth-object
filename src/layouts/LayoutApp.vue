<template>
  <div>
    <AppBar :title="title" @click-menu="drawer = !drawer" @click-logout="logout" />
    <NavigationDrawer :show="drawer" :options="options" />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';

export default {
  name: 'LayoutApp',
  components: { AppBar, NavigationDrawer },
  data: () => ({
    title: 'Near Earth Object',
    drawer: false,
    options: [
      { name: 'Home', label: 'Home' },
      { name: 'Favorites', label: 'Favorites' },
    ],
  }),
  methods: {
    async logout() {
      await this.$firebase.auth().signOut();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
