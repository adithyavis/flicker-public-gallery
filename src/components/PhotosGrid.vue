<template>
  <v-container class="my-5">
    <div class="height-min-300 relative">
      <v-overlay
        :value="isFetchingPhotos"
        absolute
        :opacity="photosToBeDisplayed.length > 0 ? 0.5 : 0"
      >
        <div class="d-flex justify-center align-center height-300">
          <v-progress-circular
            v-if="isFetchingPhotos"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-overlay>
      <v-row>
        <v-col
          v-for="photo in photosToBeDisplayed"
          :key="photo.id"
          align="center"
          cols="12"
          sm="6"
          md="4"
        >
          <v-img
            lazy-src="https://via.placeholder.com/250x150"
            max-width="250"
            max-height="150"
            contain
            :src="photo.src"
          >
            <v-btn
              text
              class="width-full height-full"
              @click="$emit('open-photo-dialog', { id: photo.id })"
            ></v-btn>
          </v-img>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PhotoGrid',
  computed: {
    ...mapGetters({
      photosToBeDisplayed: 'photos/photosToBeDisplayed',
      isFetchingPhotos: 'photos/isFetchingPhotos',
    }),
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-overlay__content {
  align-self: start;
}
.height-min-300 {
  min-height: 300px;
}
.height-300 {
  height: 300px;
}
</style>
