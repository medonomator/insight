import * as Hapi from 'hapi';
import * as Pino from 'pino';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as Handlebars from 'handlebars';
// import * as HapiSwagger from 'hapi-swagger';
import { setUpconnection, expenseScope } from './database';
// routes
import users from './routes';






setUpconnection();
(async () => {
  const opa = await expenseScope.find({ _id: '5cbb473261a0891ecc1cd245' });

  opa.update({ food: 100000 })

})();



// const logger = Pino();

// export default class Server {
//   private port: string;
//   private _server: Hapi.Server;
//   private hemera: Hemera;
//   private isInitSucceed = false;
//   constructor(port: string = '5000') {
//     this.port = port;
//   }
//   private async addPlugins() {
//     await this._server.register([
//       Inert,
//       Vision,
//       // Handlebars,
//       // AuthBearer,
//       // JWT,
//       // {
//       //   plugin: HapiSwagger,
//       //   options: this.swaggerOptions,
//       // },
//     ]);
//   }
//   public async init() {
//     try {
//       process.on('unhandledRejection', (error: Error) => {
//         logger.error(error);
//         process.exit(1);
//       });
//       this._server = new Hapi.Server({
//         port: this.port,
//         routes: {
//           cors: { origin: ['*'] },
//           validate: {
//             failAction: async (req, h, err) => {

//               console.log('test validate');


//               throw err;
//             },
//           },
//         },
//       });


//       await this.addPlugins();

//       this._server.route([...users,]);
//       this.isInitSucceed = true;
//     } catch (error) {
//       logger.error(error);
//     }
//   }
//   public async start() {
//     if (this.isInitSucceed) {
//       await this._server.start();
//       logger.info(`Server running at ${this.server.info.uri}`);
//     }
//   }
//   get server() {
//     return this._server;
//   }
// }

// const server = new Server(process.env.PORT || '5000');

// (async () => {
//   await server.init();
//   server.start();
// })();

// process.on('unhandledRejection', (error: Error) => {
//   console.error(error.message);
//   console.error(error.stack);
// });

// process.on('uncaughtException', (error: Error) => {
//   console.error(`uncaughtException ${error.message}`);
// });
