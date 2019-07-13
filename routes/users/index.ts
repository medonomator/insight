import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { userRegister } from '../../handlers/users/userRegister';
import { userLogin } from '../../handlers/users/userLogin';

import { users } from '../../config/docs';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/user/register',
    handler: userRegister,
    options: {
      ...users.registerUser,
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .min(4)
            .required(),
          name: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: userLogin,
    options: {
      ...users.loginUser,
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .min(4)
            .required(),
        },
      },
    },
  },
];

export default usersRoutes;

// TODO:
// path: '/user/password/reset',
// path: '/user/password/new',
