import * as Hapi from 'hapi';
import {
  getMainPage,
  getAphorismsPage,
  getNotesPage,
  getTechniquesPage,
  getAdminBundle,
  getContactsPage,
  getGratitudePage,
} from '../../controllers/views';

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
    path: '/notes',
    handler: getNotesPage,
  },
  {
    method: 'GET',
    path: '/techniques',
    handler: getTechniquesPage,
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
    path: '/admin/{path*}',
    handler: getAdminBundle,
  },
];

export default views;
