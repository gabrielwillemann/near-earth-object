import Vue from 'vue';
import Vuex from 'vuex';
import { url } from '@/services/nasa.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      startDate: null,
      endDate: null,
      id: null,
    },
    nearEarthObjects: {
      list: [],
      page: 1,
      itemsPerPage: 10,
    },
    message: {
      show: false,
      text: null,
    },
    loading: false,
  },
  getters: {
    nearEarthObjectsFiltered(state) {
      const id = state.filters.id || '';
      if (id.length > 0) {
        return state.nearEarthObjects.list.filter(obj => obj.id.match(new RegExp(id, 'i')));
      }
      return state.nearEarthObjects.list;
    },
    nearEarthObjectsPaged(state, getters) {
      const page = state.nearEarthObjects.page;
      const itemsPerPage = state.nearEarthObjects.itemsPerPage;

      const begin = (page - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      return getters.nearEarthObjectsFiltered.filter((obj, i) => i >= begin && i < end);
    },
    pages(state, getters) {
      const itemsPerPage = state.nearEarthObjects.itemsPerPage;
      const rowsLength = getters.nearEarthObjectsFiltered.length;
      return Math.ceil(rowsLength / itemsPerPage);
    },
  },
  mutations: {
    setFilterStartDate(state, startDate) {
      state.filters.startDate = startDate;
    },
    setFilterEndDate(state, endDate) {
      state.filters.endDate = endDate;
    },
    setFilterId(state, id) {
      state.filters.id = id;
    },
    setPage(state, page) {
      state.nearEarthObjects.page = page;
    },
    setMessageShow(state, show) {
      state.message.show = show;
    },
    setMessageText(state, text) {
      state.message.text = text;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    clearNearEarthObjects(state) {
      state.nearEarthObjects.list = [];
    },
    addNearEarthObjects(state, res) {
      for (const key in res.near_earth_objects) {
        for (const obj of res.near_earth_objects[key]) {
          state.nearEarthObjects.list.push({
            id: obj.id,
            name: obj.name,
            date: new Date(obj.close_approach_data[0]?.epoch_date_close_approach),
            hazardous: obj.is_potentially_hazardous_asteroid,
            missDistance: parseFloat(
              parseFloat(obj.close_approach_data[0]?.miss_distance?.kilometers).toFixed(2)
            ),
          });
        }
      }

      state.nearEarthObjects.list.sort((objA, objB) => {
        if (objA.missDistance < objB.missDistance) return -1;
        if (objA.missDistance > objB.missDistance) return 1;
        return 0;
      });
    },
  },
  actions: {
    async loadNearEarthObjects({ state, commit }) {
      commit('clearNearEarthObjects');
      const res = await fetch(url(state.filters.startDate, state.filters.endDate));
      const data = await res.json();
      if (!res.ok) throw data;
      commit('addNearEarthObjects', data);
    },
  },
});
