<template>
  <div>
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
          <tr
            v-for="obj in list"
            :key="obj.id"
            class="cursor-pointer"
            @click="$emit('click-row', obj)"
          >
            <td>{{ obj.id }}</td>
            <td>{{ obj.name }}</td>
            <td :title="obj.date.toUTCString()">{{ obj.date.toLocaleDateString() }}</td>
            <td>{{ obj.hazardous ? 'Yes' : 'No' }}</td>
            <td class="text-right">{{ obj.missDistance }}</td>
          </tr>
        </tbody>
        <tfoot v-if="showPagination">
          <tr>
            <td colspan="5">
              <v-pagination
                :value="page"
                @input="setPage"
                :length="pages"
                :total-visible="7"
                color="primary"
              />
            </td>
          </tr>
        </tfoot>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'TableNearEarthObjects',
  props: {
    list: Array,
    showPagination: Boolean,
    page: Number,
    setPage: Function,
    pages: Number,
  },
  methods: {
    select(nearEarthObject) {
      this.selected = nearEarthObject;
    },
  },
};
</script>
