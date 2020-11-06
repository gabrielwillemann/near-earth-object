import Vue from 'vue';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDxjt8p4DwxydSsiFVP7ILcJ1ZWtK1luQk',
  authDomain: 'near-earth-object.firebaseapp.com',
  databaseURL: 'https://near-earth-object.firebaseio.com',
  projectId: 'near-earth-object',
  storageBucket: 'near-earth-object.appspot.com',
  messagingSenderId: '857923209714',
  appId: '1:857923209714:web:361e7ea25bbdf82477036b',
});

Vue.use({
  install(Vue) {
    Vue.prototype.$firebase = firebase;
  },
});

export default firebase;
