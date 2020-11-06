<template>
  <div>
    <v-card>
      <v-card-title>
        <span>Favorites Near Earth Objects</span>
      </v-card-title>
      <TableNearEarthObjects :list="nearEarthObjects" :showPagination="false" @click-row="select" />
      <NearEarthObject
        v-if="selected"
        :object="selected"
        @close="selected = null"
        @favorite-removed="loadData"
        @favorite-added="loadData"
      />
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TableNearEarthObjects from '@/components/TableNearEarthObjects.vue';
import NearEarthObject from '@/components/NearEarthObject.vue';

export default {
  name: 'Favorites',
  components: { TableNearEarthObjects, NearEarthObject },
  data: () => ({
    nearEarthObjects: [],
    selected: null,
  }),
  methods: {
    ...mapMutations(['setMessageShow', 'setMessageText', 'setLoading']),
    async loadData() {
      try {
        this.setLoading(true);
        this.nearEarthObjects = [];
        let db = this.$firebase.firestore();
        let collection = db.collection('favorites_objects');
        let res = await collection.where('user', '==', this.getUser()).get();
        for (let doc of res.docs) {
          const data = doc.data();
          const date = new Date(parseInt(`${data.date.seconds}000`));
          this.nearEarthObjects.push({ ...data, date });
        }
      } catch (error) {
        this.setMessageShow(true);
        this.setMessageText(error.error_message || error);
      } finally {
        this.setLoading(false);
      }
    },
    select(object) {
      this.selected = object;
    },
    getUser() {
      return this.$firebase.auth().currentUser.uid;
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>
