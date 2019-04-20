import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { getTemplateMainPage } from '../controllers'
// import docs from '../docs';

const users: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    // handler: controller.get,
    handler: (req, h) => {
      console.log('This is home page!');

      return {
        message: 'This is home page!'
      }
    },
    // options: {
    //   // ...docs.getDoc,
    //   auth: {
    //     strategy: 'user',
    //     access: {
    //       scope: ['action: read, target: users', 'admin'],
    //     },
    //   },
    // },
  },
  {
    method: 'GET',
    path: '/{mainPages}',
    // handler: controller.get,
    handler: getTemplateMainPage,
    // options: {
    //   // ...docs.getDoc,
    //   auth: {
    //     strategy: 'user',
    //     access: {
    //       scope: ['action: read, target: users', 'admin'],
    //     },
    //   },
    // },
  }
]

export default users;