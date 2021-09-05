import Vue from 'vue';
import Vuex from 'vuex';

import photosModule from '@/store/photos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    photos: photosModule,
  },
});

export default store;
