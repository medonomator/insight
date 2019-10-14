import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import * as JWT from 'hapi-auth-jwt2';
import * as AuthBearer from 'hapi-auth-bearer-token';
import * as hapiAuthBasic from 'hapi-auth-basic';
import { swaggerOptions } from './config';
import { setUpconnection } from './database/mongoConnection';
import { logger } from './helpers/logger';
import userToken from './helpers/auth/user';
/** Routes  */
import users from './routes/users';
import views from './routes/views';
import admin from './routes/admin';
import tasks from './routes/tasks';
/** Connect Mongodb */
setUpconnection();

export class Server {
  constructor(private port: string) {}

  public async start() {
    try {
      const server: Hapi.Server & Vision = new Hapi.Server(<Hapi.ServerOptions>{
        debug: { request: ['error'] },
        port: this.port,
        routes: {
          cors: {
            origin: ['*'],
            headers: [
              'Access-Control-Allow-Origin',
              'Accept',
              'Authorization',
              'Content-Type',
              'If-None-Match',
              'x-customer-ip',
              'user-agent',
            ],
            credentials: true,
          },
          validate: {
            failAction: async (req, h, err) => {
              throw err;
            },
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
      });

      server.route([...users, ...views, ...admin, ...tasks]);

      await server.start();
      logger.info('Server running at:', server.info.uri);
    } catch (err) {
      logger.error(`Server start error: `, err.message, err.stack);
    }
  }
}

const server = new Server(process.env.PORT || '5000');
server.start();

process.on('unhandledRejection', (error: Error) => {
  console.error(error.message);
  console.error(error.stack);
});

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});
