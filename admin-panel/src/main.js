import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VModal from 'vue-js-modal';
import './plugins/fontawesome';
Vue.config.productionTip = false;

Vue.use(VModal);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
