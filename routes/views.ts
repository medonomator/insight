import * as Hapi from 'hapi';
import {
  getMainPage,
  getAphorismsPage,
  getAffirmationPage,
  getMaterialsPage,
  getAdminBundle,
  getContactsPage,
  getGratitudePage,
  devlopmentPlanPage,
} from '../controllers/views';

const views: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      },
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: getMainPage,
  },
  {
    method: 'GET',
    path: '/aphorisms',
    handler: getAphorismsPage,
  },
  {
    method: 'GET',
    path: '/affirmation',
    handler: getAffirmationPage,
  },
  {
    method: 'GET',
    path: '/materials',
    handler: getMaterialsPage,
  },
  {
    method: 'GET',
    path: '/contacts',
    handler: getContactsPage,
  },
  {
    method: 'GET',
    path: '/gratitude',
    handler: getGratitudePage,
  },
  {
    method: 'GET',
    path: '/development-plan',
    handler: devlopmentPlanPage,
  },
  {
    method: 'GET',
    path: '/admin/{path*}',
    handler: getAdminBundle,
  },
];

export default views;
