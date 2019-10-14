import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Aphorisms from '@/components/Aphorisms';
import Authorization from '@/components/Authorization';

Vue.use(Router);

const Authentication = (to, from, next) => {
  if (localStorage.getItem('token')) {
    // идем на сервер с этим токеном и если ок тогда ->
    next();
  }

  // next('/login');
};

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Main',
      component: Main,
      // beforeEnter: Authentication,
    },
    {
      path: '/login',
      name: 'Authorization',
      component: Authorization,
    },
    {
      path: '/admin/aphorisms',
      name: 'Aphorisms',
      component: Aphorisms,
      // beforeEnter: Authentication,
    },
  ],
  mode: 'history',
});
