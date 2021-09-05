<template>
  <div>
    <PhotoDialog
      :selected-photo-id="selectedPhotoId"
      :should-show-photo-dialog="shouldShowPhotoDialog"
      @close-photo-dialog="closePhotoDialog"
    />
    <div class="d-flex justify-center align-center height-200">
      <div class="text-h2 color-primary">Flickr Public Gallery</div>
    </div>
    <v-slide-group
      v-model="currentTag"
      show-arrows
      center-active
      light
      mandatory
    >
      <v-slide-item
        v-for="tag in allTags"
        :key="tag"
        v-slot="{ active, toggle }"
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="primary white--text"
          depressed
          rounded
          @click="toggle"
        >
          {{ tag }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
    <PhotosGrid @open-photo-dialog="openPhotoDialog" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { TAGS } from '@/constants/tag';

import PhotosGrid from '@/components/PhotosGrid';
import PhotoDialog from '@/components/PhotoDialog';

export default {
  name: 'Home',
  components: {
    PhotosGrid,
    PhotoDialog,
  },
  data() {
    return {
      allTags: TAGS,
      currentTag: null,
      selectedPhotoId: '',
      shouldShowPhotoDialog: false,
    };
  },
  watch: {
    currentTag(val) {
      // Call Fetch API
      this.fetchPhotos({ tag: TAGS[val] });
    },
  },
  methods: {
    ...mapActions({
      fetchPhotos: 'photos/fetch',
    }),
    openPhotoDialog({ id }) {
      this.selectedPhotoId = id;
      this.shouldShowPhotoDialog = true;
    },
    closePhotoDialog() {
      this.selectedPhotoId = '';
      this.shouldShowPhotoDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.height-200 {
  height: 200px;
}
</style>
