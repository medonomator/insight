// import * as Hapi from "hapi";
// import * as Inert from "inert";
// import * as Vision from "vision";
// import * as HapiSwagger from "hapi-swagger";
// import * as JWT from "hapi-auth-jwt2";
// import * as AuthBearer from "hapi-auth-bearer-token";
// import * as hapiAuthBasic from "hapi-auth-basic";
// import Boom from "boom";
// import { swaggerOptions } from "./config";
// import { logger } from "./helpers/logger";
// import userToken from "./helpers/auth/user";
// // Routes
// import users from "./routes/users";
// import views from "./routes/views";
// import admin from "./routes/admin";
// import tasks from "./routes/tasks";
// import statics from "./routes/statics";
// import mongoConnection from "./database/mongoConnection";

// import { insertDataToRedis } from "./database/insertDataToRedis";
// import { serverHelthCheck } from "./helpers/serverHelthCheck";
// import { checkAndFillDataToLocalDatabase } from "./database/checkAndFillDataToLocalDatabase";
// import { cronJobRunner } from "./workers/cronJobRunner";

// import * as instagramApi from "instagram-private-api";
import * as instagramApi from "./instagram-private-api/src";

const ig = new instagramApi.IgApiClient();
ig.state.generateDevice("8463002721");

(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  // const loggedInUser = await ig.account.login('medonomator', 'Ppcopasen123');

  // console.log('======================================================');
  // console.dir(loggedInUser, { depth: null });
  // console.log('======================================================');
  // throw new Error('Error')
})();

// const Instagram = require('instagram-web-api')

// const client = new Instagram({ username: 'medonomator10', password: 'Ppcopasen123' })
// // console.log('======================================================');
// // console.dir(client);
// // console.log('======================================================');

// client
//   .login()
//   .then(() => {
//     client
//       .getProfile()
//       .then(console.log)
//   })

  // client.getProfile().then(console.log);

// mongoConnection();

// export class Server {
//   constructor(private port: string) {}

//   private getErrorFunction(message: string) {
//     logger.error("Error Authorization");
//     return Boom.unauthorized(message);
//   }

//   public async start() {
//     try {
//       const server: Hapi.Server & Vision = new Hapi.Server(<Hapi.ServerOptions>{
//         port: this.port,
//         routes: {
//           cors: {
//             origin: ["*"],
//             headers: ["Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "user-agent"],
//             credentials: true,
//           },
//         },
//       });

//       await server.register([
//         Inert,
//         Vision,
//         AuthBearer,
//         JWT,
//         {
//           plugin: HapiSwagger,
//           options: swaggerOptions,
//         },
//         {
//           plugin: hapiAuthBasic,
//         },
//       ]);

//       server.views({
//         engines: {
//           hbs: require("handlebars"),
//         },
//         relativeTo: __dirname,
//         partialsPath: "views/partials",
//         helpersPath: "views/helpers",
//         isCached: true,
//         path: "views",
//         context: {
//           path: "../static/",
//         },
//       });

//       server.auth.strategy("users", "bearer-access-token", {
//         validate: userToken,
//         unauthorized: this.getErrorFunction,
//       });

//       await checkAndFillDataToLocalDatabase();
//       await cronJobRunner();
//       await insertDataToRedis();
//       serverHelthCheck();

//       server.route([...users, ...views, ...admin, ...tasks, ...statics]);

//       await server.start();

//       server.ext("onPreResponse", (request, reply) => {
//         if (request.response.output && request.response.output.statusCode === 404) {
//           if (!/\/admin/.test(request.url.href)) {
//             return reply.view("404");
//           }
//         }
//         return reply.continue;
//       });

//       logger.info("Server running at:", server.info.uri);
//     } catch (err) {
//       logger.error(`Server start error: `, err.message, err.stack);
//     }
//   }
// }

// const server = new Server(process.env.PORT || "5000");
// server.start();

// process.on("unhandledRejection", (err: Error) => {
//   logger.error(`unhandledRejection: `, err.stack);
//   logger.error(`unhandledRejection: `, err.message);
//   process.exit(1);
// });

// process.on("uncaughtException", (err: Error) => {
//   logger.error(`uncaughtException: `, err.stack);
//   logger.error(`uncaughtException: `, err.message);
//   process.exit(1);
// });
