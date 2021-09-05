<template>
  <v-dialog v-model="shouldShowDialog" width="500">
    <v-card>
      <v-card-title class="text-h5 grey color-primary lighten-2">
        {{ photo.title }}
      </v-card-title>
      <v-card-subtitle class="grey subtitle-1 lighten-2 py-2">
        {{ photo.author }}
      </v-card-subtitle>
      <v-card-subtitle class="grey lighten-2 pb-2">
        Published: {{ photo.published }}
      </v-card-subtitle>

      <div class="d-flex justify-center py-5">
        <v-img
          lazy-src="https://via.placeholder.com/500x300"
          max-width="500"
          max-height="300"
          contain
          :src="photo.src"
        >
          <v-btn
            text
            class="width-full height-full"
            :href="photo.link"
            target="_blank"
          ></v-btn>
        </v-img>
      </div>

      <template v-for="tag in photo.tags">
        <v-chip :key="tag" class="ma-2" color="secondary"> {{ tag }} </v-chip>
      </template>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="shouldShowDialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PhotoDialog',
  props: {
    shouldShowPhotoDialog: Boolean,
    selectedPhotoId: String,
  },
  computed: {
    ...mapGetters({
      photosByIds: 'photos/photosByIds',
    }),
    shouldShowDialog: {
      get() {
        return this.shouldShowPhotoDialog;
      },
      set(val) {
        if (val === false) {
          this.$emit('close-photo-dialog');
        }
      },
    },
    photo() {
      const photo = this.photosByIds[this.selectedPhotoId];
      if (!photo) {
        return {
          title: '',
          author: '',
          published: '',
          src: '',
          tags: [],
          link: '',
        };
      }
      return {
        ...photo,
        published: new Date(photo.published),
        tags: photo.tags.length > 0 ? photo.tags.split(' ') : [],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
