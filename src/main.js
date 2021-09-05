import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App.vue';

import router from '@/router';
import vuetify from '@/plugins/vuetify';
import store from '@/store';

import '@/styles/common.scss';

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
