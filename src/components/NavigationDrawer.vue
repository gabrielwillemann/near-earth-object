<template>
  <v-navigation-drawer :value="show" app>
    <v-toolbar color="primary" dark>
      <span>
        <v-icon>mdi-clipboard-text</v-icon>
      </span>
    </v-toolbar>
    <v-list flat>
      <template v-for="option in options">
        <div :key="option.name">
          <v-list-item link :to="{ name: option.name }">
            <v-list-item-content>
              <v-list-item-title>{{ option.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </div>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: ['show', 'options'],
};
</script>
