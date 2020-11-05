<template>
  <div>
    <v-card>
      <v-card-title>Date Filter</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field label="Start Date" type="date" v-model="filters.startDate" />
          </v-col>
          <v-col cols="3">
            <v-text-field label="End Date" type="date" v-model="filters.endDate" />
          </v-col>
          <v-col cols="6">
            <v-btn class="mt-3" color="primary" @click="search">Load</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>
        <span>Near Earth Objects</span>
        <v-spacer />
        <v-text-field class="flex-grow-0" label="Search by ID" v-model="filters.id" />
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="default-width">Id</th>
              <th class="default-width">Name</th>
              <th class="default-width">Date</th>
              <th class="default-width">Hazardous</th>
              <th class="default-width text-right">Miss Distance (KM)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="obj in listPaged" :key="obj.id">
              <td>{{ obj.id }}</td>
              <td>{{ obj.name }}</td>
              <td :title="obj.date.toUTCString()">{{ obj.date.toLocaleDateString() }}</td>
              <td>{{ obj.hazardous ? 'Yes' : 'No' }}</td>
              <td class="text-right">{{ obj.missDistance }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5">
                <v-pagination v-model="page" :length="pages" :total-visible="7" color="primary" />
              </td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card>

    <v-snackbar v-model="showMessage">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" v-bind="attrs" @click="showMessage = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    filters: {
      startDate: null,
      endDate: null,
      id: null,
    },
    nearEarthObjects: [],
    page: 1,
    itemsPerPage: 10,
    showMessage: false,
    message: null,
  }),
  computed: {
    listFiltered() {
      const id = this.filters.id || '';
      if (id.length > 0) {
        return this.nearEarthObjects.filter(obj => obj.id.match(new RegExp(id, 'i')));
      }
      return this.nearEarthObjects;
    },
    listPaged() {
      const begin = (this.page - 1) * this.itemsPerPage;
      const end = begin + this.itemsPerPage;
      return this.listFiltered.filter((obj, i) => i >= begin && i < end);
    },
    pages() {
      return Math.ceil(this.listFiltered.length / this.itemsPerPage);
    },
  },
  methods: {
    async search() {
      try {
        console.log('start');
        this.validateFiltersDate();
        this.nearEarthObjects = [];
        const res = await fetch(this.factoryUrl());
        const data = await res.json();
        if (!res.ok) {
          throw data;
        }
        this.parseResponse(data);
        this.sortNearEathObject();
        console.log('end', this.nearEarthObjects.length);
      } catch (error) {
        this.showMessage = true;
        this.message = error.error_message || error;
      }
    },
    validateFiltersDate() {
      if (!this.filters.startDate || !this.filters.endDate) {
        throw 'Enter the Start Date and End Date';
      }
    },
    parseResponse(res) {
      for (const key in res.near_earth_objects) {
        for (const obj of res.near_earth_objects[key]) {
          this.nearEarthObjects.push({
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
    },
    sortNearEathObject() {
      this.nearEarthObjects.sort((objA, objB) => {
        if (objA.missDistance < objB.missDistance) return -1;
        if (objA.missDistance > objB.missDistance) return 1;
        return 0;
      });
    },
    factoryUrl() {
      const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?';
      const params = `start_date=${this.filters.startDate}&end_date=${this.filters.endDate}`;
      const apiKey = '&api_key=NvgU8KMFr08wspj5z1ewoV7NZIiP71AfwoqF3t62';
      return `${baseUrl}${params}${apiKey}`;
    },
  },
};
</script>

<style>
.default-width {
  width: 1%;
}
</style>
