import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { docsStatic } from '../config/docs';
import { putFile } from '../controllers/static';

const routersForStaticFolder: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/static',
    handler: putFile,
    options: {
      ...docsStatic.staticUpload,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          file: Joi.any(),
        },
      },
      payload: {
        output: 'stream',
        maxBytes: 5242880, // 5mb
        parse: true,
        allow: 'multipart/form-data',
      },
    },
  },
];

export default routersForStaticFolder;
