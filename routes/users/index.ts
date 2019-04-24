import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Vision from 'vision';
import { getTemplateMainPage } from '../../controllers/views';
import * as db from '../../database/schemas'
// import docs from '../docs';

const users: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/user/register',
    // handler: controller.get,
    handler: (req, h: Hapi.ResponseToolkit) => {


      console.log('works');

      // const newUSer = db.usersSchema({
      //   email: "new@email.com",
      //   password: '12345',
      //   name: "Dima"
      // })

      // newUSer.save(res => {
      //   console.log(res, 'super save');
      // })
      return req.payload
    },
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
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