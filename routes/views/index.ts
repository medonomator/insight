import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Vision from 'vision';
import { getTemplateMainPage } from '../../controllers/views';
// import docs from '../docs';

const views: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    // handler: controller.get,
    handler: (req, h: Vision<Hapi.ResponseToolkit>) => {
      h.state('data', { firstVisit: false });
      return h.view('index');
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
    options: {
      state: {
        parse: true,
        failAction: 'error'
      }
    }
  },
  {
    method: 'GET',
    path: '/{mainPages}',
    // handler: controller.get,
    handler: getTemplateMainPage,
  }
]

export default views;