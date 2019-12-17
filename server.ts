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

// const Telegraf = require('telegraf');

// const bot = new Telegraf('438677012:AAE0_RuWfqzzaYep-TpuLWJZa54752apY0s');
// bot.start(ctx => ctx.reply('Welcome'));
// bot.help(ctx => ctx.reply('Send me a sticker'));
// bot.on('sticker', ctx => ctx.reply('👍'));
// bot.hears('hi', ctx => ctx.reply('Hey there'));
// bot.launch();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '438677012:AAE0_RuWfqzzaYep-TpuLWJZa54752apY0s';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', msg => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
