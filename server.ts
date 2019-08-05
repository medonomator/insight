import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import { swaggerOptions } from './config';
import { setUpconnection } from './database/mongoConnection';
import { logger } from './helpers/logger';

/** Routes  */
import users from './routes/users';
import views from './routes/views';

setUpconnection();

export default class Server {
  private port: string;
  private _server: any;
  constructor( port ) {
    this.port = port;
  }
  private async addPlugins() {
    await this._server.register( [
      Inert,
      Vision,
      // AuthBearer,
      // JWT,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ] );
  }
  public async init() {
    try {
      this._server = new Hapi.Server( {
        port: this.port,
        host: "35.208.211.167",
        routes: {
          cors: { origin: ['*'] },
          validate: {
            failAction: async ( req, h, err ) => {
              logger.error( 'invalid route', err );
              throw err;
            },
          },
        },
      } );

      await this.addPlugins();

      this._server.views( {
        engines: {
          hbs: require( 'handlebars' ),
        },
        relativeTo: __dirname,
        partialsPath: 'views/partials',
        helpersPath: 'views/helpers',
        path: 'views',
        context: {
          path: '../static/',
        },
      } );

      this._server.state( 'data', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true,
      } );

      this._server.route( [...users, ...views] );
    } catch ( error ) {
      logger.error( error );
    }
  }
  public async start() {
    await this._server.start();
    logger.info( `Server running at ${this.server.info.uri}` );
  }
  get server() {
    return this._server;
  }
}

const server = new Server( process.env.PORT || '5000' );

( async () => {
  await server.init();
  server.start();
} )();

process.on( 'unhandledRejection', ( error: Error ) => {
  console.error( error.message );
  console.error( error.stack );
} );

process.on( 'uncaughtException', ( error: Error ) => {
  console.error( `uncaughtException ${error.message}` );
} );
