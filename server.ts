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
// import { pg } from './/database/pgConnect';
import { logger } from './helpers/logger';
import userToken from './helpers/auth/user';
// Routes
import users from './routes/users';
import views from './routes/views';
import admin from './routes/admin';
import tasks from './routes/tasks';
import statics from './routes/statics';

import { insertDataToRedis } from './database/insertDataToRedis';
import { insertDataToRAM } from './helpers/insertDataToMemory';
// pg;
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

      await insertDataToRAM();
      // await insertDataToRedis();
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

const Telegraf = require('telegraf');

const bot = new Telegraf('438677012:AAG9bOGJjWlugHvqr5wl5XURwQecV9m3LXc');

bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.launch();
