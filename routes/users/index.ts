import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { userRegister } from '../../controllers/users';

// import docs from '../docs';

const users: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/user/register',
    handler: userRegister,
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(4).required(),
          name: Joi.string().required(),
        },
      },
      state: {
        parse: true,
        failAction: 'error'
      },
    }
  },
]

export default users;


// TODO:
// path: '/user/login',
// path: '/user/password/reset',
// path: '/user/password/new',