<template>
  <div>
    <v-card>
      <v-card-title>
        <span>Near Earth Objects</span>
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
    async loadData() {
      this.nearEarthObjects = [];
      let db = this.$firebase.firestore();
      let collection = db.collection('favorites_objects');
      let res = await collection.get();
      for (let doc of res.docs) {
        const data = doc.data();
        const date = new Date(parseInt(`${data.date.seconds}000`));
        this.nearEarthObjects.push({ ...data, date });
      }
    },
    select(object) {
      this.selected = object;
    },
  },
  async mounted() {
    let auth = await this.$firebase.auth();
    auth.onAuthStateChanged(user => {
      console.log(user);
    });
    this.loadData();
  },
};
</script>
