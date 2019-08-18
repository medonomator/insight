import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { users } from '../../config/docs';
import { getAphorisms, createAphorism, updateAphorism, deleteAphorism } from '../../controllers/admin/aphorisms';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/admin/aphorisms',
    handler: createAphorism,
    options: {
      // ...users.registerUser,
      // auth: {
      //   strategies: [AuthStrategies.USER]
      // }
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
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/admin/aphorisms',
    handler: getAphorisms,
    options: {
      // ...users.registerUser,
      // auth: {
      //   strategy: 'users',
      // },
    },
  },
  {
    method: 'PUT',
    path: '/admin/aphorisms',
    handler: updateAphorism,
    options: {
      // ...users.registerUser,
      // auth: {
      //   strategies: [AuthStrategies.USER]
      // }
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .description('5d46debf5f7dff7ef9b79098')
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
      // ...users.registerUser,
      // auth: {
      //   strategies: [AuthStrategies.USER]
      // }
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .description('5d46debf5f7dff7ef9b79098')
            .required(),
        },
      },
    },
  },
];

export default usersRoutes;
