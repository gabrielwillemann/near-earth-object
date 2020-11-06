<template>
  <v-card>
    <v-card-title>Date Filter</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field
            label="Start Date"
            type="date"
            :value="startDate"
            @input="setFilterStartDate"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field label="End Date" type="date" :value="endDate" @input="setFilterEndDate" />
        </v-col>
        <v-col cols="6">
          <v-btn class="mt-3" color="primary" @click="search">Load</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Filters',
  computed: {
    ...mapState({
      startDate: state => state.filters.startDate,
      endDate: state => state.filters.endDate,
    }),
  },
  methods: {
    ...mapMutations([
      'setFilterStartDate',
      'setFilterEndDate',
      'setMessageShow',
      'setMessageText',
      'setLoading',
    ]),
    ...mapActions(['loadNearEarthObjects']),
    async search() {
      try {
        this.setLoading(true);
        this.validateFiltersDate();
        await this.loadNearEarthObjects();
      } catch (error) {
        console.log(error);
        this.setMessageShow(true);
        this.setMessageText(error.error_message || error);
      } finally {
        this.setLoading(false);
      }
    },
    validateFiltersDate() {
      if (!this.startDate || !this.endDate) {
        throw 'Enter the Start Date and End Date';
      }
    },
  },
};
</script>
