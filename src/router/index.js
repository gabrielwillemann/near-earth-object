import Vue from 'vue';
import VueRouter from 'vue-router';

import firebase from '@/plugins/firebase.js';

import LayoutApp from '@/layouts/LayoutApp.vue';
import LayoutLogin from '@/layouts/LayoutLogin.vue';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Favorites from '@/views/Favorites.vue';

const routes = [
  {
    path: '',
    component: LayoutApp,
    children: [
      { path: '/', name: 'Home', component: Home, meta: { auth: true } },
      { path: '/favorites', name: 'Favorites', component: Favorites, meta: { auth: true } },
    ],
  },
  {
    path: '',
    component: LayoutLogin,
    children: [{ path: '/login', name: 'Login', component: Login }],
  },
];

Vue.use(VueRouter);
const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (to.meta.auth && !user) {
      next({ name: 'Login' });
      return;
    }
    next();
  });
});

export default router;
