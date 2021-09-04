import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ['~/assets/scss/variables.scss'],
  treeShake: true,
  defaultAssets: false,
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#FA1B59',
        secondary: '#5C4BDB',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
