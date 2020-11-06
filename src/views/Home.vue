<template>
  <div>
    <Filters />
    <v-card class="mt-3">
      <v-card-title>
        <span>Near Earth Objects</span>
        <v-spacer />
        <v-text-field class="flex-grow-0" label="Search by ID" :value="id" @input="setFilterId" />
      </v-card-title>
      <TableNearEarthObjects
        :list="list"
        :showPagination="true"
        :page="page"
        :setPage="setPage"
        :pages="pages"
        @click-row="select"
      />
    </v-card>
    <NearEarthObject v-if="selected" :object="selected" @close="selected = null" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Filters from '@/components/Filters.vue';
import TableNearEarthObjects from '@/components/TableNearEarthObjects.vue';
import NearEarthObject from '@/components/NearEarthObject.vue';

export default {
  name: 'Home',
  components: { Filters, TableNearEarthObjects, NearEarthObject },
  data: () => ({
    selected: null,
  }),
  computed: {
    ...mapState({
      id: state => state.filters.id,
      page: state => state.nearEarthObjects.page,
    }),
    ...mapGetters({
      list: 'nearEarthObjectsPaged',
      pages: 'pages',
    }),
  },
  methods: {
    ...mapMutations(['setFilterId', 'setPage']),
    select(object) {
      this.selected = object;
    },
  },
};
</script>
