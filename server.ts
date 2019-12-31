import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import * as JWT from 'hapi-auth-jwt2';
import * as AuthBearer from 'hapi-auth-bearer-token';
import * as hapiAuthBasic from 'hapi-auth-basic';
import Boom from 'boom';
import { swaggerOptions } from './config';
import mongoConnection from './database/mongoConnection';
import { logger } from './helpers/logger';
import userToken from './helpers/auth/user';
// Routes
import users from './routes/users';
import views from './routes/views';
import admin from './routes/admin';
import tasks from './routes/tasks';
import statics from './routes/statics';

import { insertDataToRedis } from './database/insertDataToRedis';
import { serverHelthCheck } from './helpers/serverHelthCheck';
// Connect Mongodb
mongoConnection();

export class Server {
  constructor(private port: string) {}

  private getErrorFunction(message: string) {
    logger.error('Error Authorization');
    return Boom.unauthorized(message);
  }

  public async start() {
    try {
      const server: Hapi.Server & Vision = new Hapi.Server(<Hapi.ServerOptions>{
        port: this.port,
        routes: {
          cors: {
            origin: ['*'],
            headers: ['Access-Control-Allow-Origin', 'Accept', 'Authorization', 'Content-Type', 'user-agent'],
            credentials: true,
          },
        },
      });

      await server.register([
        Inert,
        Vision,
        AuthBearer,
        JWT,
        {
          plugin: HapiSwagger,
          options: swaggerOptions,
        },
        {
          plugin: hapiAuthBasic,
        },
      ]);

      server.views({
        engines: {
          hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        partialsPath: 'views/partials',
        helpersPath: 'views/helpers',
        isCached: true,
        path: 'views',
        context: {
          path: '../static/',
        },
      });

      server.auth.strategy('users', 'bearer-access-token', {
        validate: userToken,
        unauthorized: this.getErrorFunction,
      });

      await insertDataToRedis();
      serverHelthCheck();

      server.route([...users, ...views, ...admin, ...tasks, ...statics]);

      await server.start();
      logger.info('Server running at:', server.info.uri);
    } catch (err) {
      logger.error(`Server start error: `, err.message, err.stack);
    }
  }
}

export const server = new Server(process.env.PORT || '5000');
server.start();

process.on('unhandledRejection', (error: Error) => {
  console.error(error.message);
  console.error(error.stack);
});

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// import fs from 'fs';
// const dropboxV2Api = require('dropbox-v2-api');
// const dropbox = dropboxV2Api.authenticate({
//   token: 'Jh75f1AAeZAAAAAAAAAG1j83OZtBo0kE4ViQz34AB2TpwtD7UhjcJs807ilKcVT5',
// });

// dropbox(
//   {
//     resource: 'files/upload',
//     parameters: {
//       path: '/backup/aphorisms.js',
//     },
//     readStream: fs.createReadStream('./static/css/global.css'),
//   },
//   (err, result, response) => {
//     console.log('=============================');
//     console.log('logging', result);
//     // console.log('logging', response);
//     console.log('=============================');
//   },
// );

// const request = require('request');
// request.get(
//   {
//     url: 'https://toster.ru/q/461924',
//     proxy: '149.28.49.110::8080',
//   },
//   (err, res) => {
//     console.log('=============================');
//     console.log('logging', res);
//     console.log('=============================');
//     if (err) {
//       console.log('ERROR', err);
//     } else {
//       console.log('OK', res);
//     }
//   },
// );
