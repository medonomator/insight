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
  const goToPath = path => {
    if (to.path !== path) next(path);
    next();
  };

  if (getToken()) {
    setAuthorizationToken(getToken());
    axios
      .get(`${getBaseUrl()}/user/auth`)
      .then(() => goToPath('/admin'))
      .catch(() => goToPath('/admin/login'));
  } else {
    goToPath('/admin/login');
  }

  console.log('Routing...');
});
