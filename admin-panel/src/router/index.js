import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Aphorisms from '@/components/Aphorisms';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Main',
      component: Main,
    },
    {
      path: '/admin/aphorisms',
      name: 'Aphorisms',
      component: Aphorisms,
    },
  ],
  mode: 'history',
});
