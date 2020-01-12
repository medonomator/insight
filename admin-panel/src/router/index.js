import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/components/Main';
import Aphorisms from '@/components/Aphorisms';
import Affirmation from '@/components/Affirmation';
import Content from '@/components/Content';
import Materials from '@/components/Materials';
import Tasks from '@/components/Tasks';
import LoginPage from '@/components/LoginPage';
import axios from 'axios';
import { getBaseUrl, getToken, setAuthorizationToken } from '../helpers';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/admin',
      component: Main,
      beforeEnter: (to, from, next) => checkAuth(to, next),
      children: [
        {
          path: 'content',
          component: Content,
        },
        {
          path: 'aphorisms',
          component: Aphorisms,
        },
        {
          path: 'affirmation',
          component: Affirmation,
        },
        {
          path: 'meterials',
          component: Materials,
        },
        {
          path: 'tasks',
          component: Tasks,
        },
      ],
    },
    {
      path: '/admin/login',
      component: LoginPage,
    },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
});

const checkAuth = (to, next) => {
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
};

export default router;
