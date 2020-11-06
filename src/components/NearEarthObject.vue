<template>
  <div>
    <v-dialog :value="true" width="500">
      <v-card>
        <v-card-title>Near Earth Object</v-card-title>
        <v-card-text>
          <v-text-field label="Id" readonly :value="object.id" />
          <v-text-field label="Name" readonly :value="object.name" />
          <v-text-field label="Date" readonly :value="object.date.toLocaleDateString()" />
          <v-select label="Hazardous" readonly :value="object.hazardous" :items="hazardousItems" />

          <v-text-field label="Hazardous" readonly :value="object.hazardous" />
          <v-text-field
            label="Miss Distance"
            type="number"
            readonly
            v-model="object.missDistance"
          />
        </v-card-text>

        <v-card-actions>
          <template v-if="favoriteObject !== undefined">
            <v-btn
              v-if="!favoriteObject"
              color="primary"
              title="Add to Favorites"
              @click="addFavorite"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn v-else color="error" title="Remove from Favorites" @click="removeFavorite">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </template>
          <v-spacer />
          <v-btn color="primary" text @click="$emit('close')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'NearEarthObject',
  props: ['object'],
  data: () => ({
    hazardousItems: [
      { value: true, text: 'Yes' },
      { value: false, text: 'No' },
    ],
    favoriteObject: undefined,
  }),
  methods: {
    async addFavorite() {
      const db = this.$firebase.firestore();
      const collection = db.collection('favorites_objects');
      const doc = collection.doc();
      await doc.set({ ...this.object, user: this.getUser() });
      await this.loadFavoriteObject();
      this.$emit('favorite-added');
    },
    async removeFavorite() {
      await this.favoriteObject.ref.delete();
      this.favoriteObject = null;
      this.$emit('favorite-removed');
    },
    async loadFavoriteObject() {
      const db = this.$firebase.firestore();
      const collection = db.collection('favorites_objects');
      const res = await collection.where('id', '==', this.object.id).get();
      const [doc] = res.docs;
      if (doc) {
        this.favoriteObject = doc;
      } else {
        this.favoriteObject = null;
      }
    },
    getUser() {
      return this.$firebase.auth().currentUser.uid;
    },
  },
  mounted() {
    this.loadFavoriteObject();
  },
};
</script>
