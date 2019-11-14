import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Aphorisms from '@/components/Aphorisms';
import LoginPage from '@/components/LoginPage';
import axios from 'axios';
import { getBaseUrl, getToken, setAuthorizationToken } from '../helpers';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/admin',
      name: 'Main',
      component: Main,
    },
    {
      path: '/admin/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/admin/aphorisms',
      name: 'Aphorisms',
      component: Aphorisms,
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (!getToken() && to.path !== '/admin/login') {
    next('/admin/login');
  } else {
    axios
      .get(`${getBaseUrl()}/user/auth`)
      .then(res => {
        if (to.path !== '/admin') {
          next('/admin');
        }
      })
      .catch(error => {
        if (to.path !== '/admin/login') {
          next('/admin/login');
        }
      });
  }

  // нельзя так делать так промис еше вверху делается...
  next();
});
