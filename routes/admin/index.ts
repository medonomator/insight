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
      //   strategies: [AuthStrategies.USER]
      // }
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
    },
  },
];

export default usersRoutes;
