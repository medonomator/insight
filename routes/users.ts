import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { userRegister } from '../controllers/users/userRegister';
import { userLogin } from '../controllers/users/userLogin';
import { subscribeEmail } from '../controllers/users/subscribeEmail';
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
  {
    method: 'POST',
    path: '/user/subscribeEmail',
    handler: subscribeEmail,
    options: {
      ...users.subscribeEmail,
      validate: {
        payload: {
          email: Joi.string()
            .email()
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
