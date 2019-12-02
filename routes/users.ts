import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { userRegister } from '../controllers/users/userRegister';
import { userLogin } from '../controllers/users/userLogin';
import { users } from '../config/docs';

const usersRoutes: Hapi.ServerRoute[] = [
  // {
  //   method: 'POST',
  //   path: '/user/register',
  //   handler: userRegister,
  //   options: {
  //     ...users.registerUser,
  //     validate: {
  //       payload: {
  //         email: Joi.string()
  //           .email()
  //           .required(),
  //         password: Joi.string()
  //           .min(4)
  //           .required(),
  //         name: Joi.string().required(),
  //       },
  //     },
  //   },
  // },
  {
    method: 'POST',
    path: '/user/login',
    handler: userLogin,
    options: {
      // ...users.loginUser,
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
  {
    method: 'GET',
    path: '/user/auth',
    handler: req => req.auth.credentials,
    options: {
      auth: {
        strategy: 'users',
      },
    },
  },
];

export default usersRoutes;

// TODO:
// path: '/user/password/reset',
// path: '/user/password/new',
// path: '/user/refreshToken',
