<template>
  <div>
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
    <PhotosGrid />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { TAGS } from '@/constants/tag';

import PhotosGrid from '@/components/PhotosGrid';

export default {
  name: 'Home',
  components: {
    PhotosGrid,
  },
  data() {
    return {
      allTags: TAGS,
      currentTag: null,
    };
  },
  watch: {
    currentTag() {
      // Call Fetch API
    },
  },
  computed: {
    ...mapGetters({
      photosToBeDisplayed: 'photos/photosToBeDisplayed',
    }),
  },
};
</script>

<style lang="scss" scoped>
.height-200 {
  height: 200px;
}
</style>
