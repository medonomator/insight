import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { getAphorisms, createAphorism, updateAphorism, deleteAphorism } from '../controllers/admin/aphorisms';
import { docsAphorisms, docsMainData } from '../config/docs';
import { getMainData } from '../controllers/admin/mainData';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/admin/aphorisms',
    handler: createAphorism,
    options: {
      ...docsAphorisms.createAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          author: Joi.string()
            .trim()
            .required()
            .min(3),
          body: Joi.string()
            .trim()
            .required()
            .min(10),
          tags: Joi.array(),
          category: Joi.string()
            .trim()
            .required()
            .allow(''),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/admin/aphorisms',
    handler: getAphorisms,
    options: {
      ...docsAphorisms.getAphorisms,
      validate: {
        query: {
          offset: Joi.number(),
          category: Joi.string().trim(),
          limit: Joi.number(),
          author: Joi.string(),
          body: Joi.string(),
          topic: Joi.string(),
          isAdmin: Joi.boolean(),
          random: Joi.boolean(),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/admin/aphorisms',
    handler: updateAphorism,
    options: {
      ...docsAphorisms.updateAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .required(),
          author: Joi.string()
            .trim()
            .required(),
          body: Joi.string()
            .trim()
            .required(),
          tags: Joi.array().required(),
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/admin/aphorisms',
    handler: deleteAphorism,
    options: {
      ...docsAphorisms.deleteAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/admin/getMainData',
    handler: getMainData,
    options: {
      ...docsMainData,
      auth: {
        strategy: 'users',
      },
    },
  },
];

export default usersRoutes;
