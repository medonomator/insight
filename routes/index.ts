import * as Hapi from 'hapi';
import * as Joi from 'joi';
// import docs from '../docs';

const users: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    // handler: controller.get,
    handler: () => {
      console.log('users');

      return {
        users: [1, 2, 3]
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
  }
]

export default users;