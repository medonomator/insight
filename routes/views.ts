import * as Hapi from 'hapi';
import Joi from 'joi';
import {
  getAphorismsPage,
  getMaterialsPage,
  getAdminBundle,
  getContactsPage,
  getGratitudePage,
  dynamicAphorismsPage,
  dynamicMaterialPage,
  getCourses,
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
    handler: getAphorismsPage,
  },
  {
    method: 'GET',
    path: '/aphorism/{id}',
    handler: dynamicAphorismsPage,
    options: {
      validate: {
        params: {
          id: Joi.string().trim(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/material/{id}',
    handler: dynamicMaterialPage,
    options: {
      validate: {
        params: {
          id: Joi.string().trim(),
        },
      },
    },
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
    path: '/courses',
    handler: getCourses,
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
