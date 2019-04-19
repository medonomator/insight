const Path = require('path');
const Hapi = require('hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  await server.register(require('vision'));

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'views',
  });

  server.route({
    method: 'GET',
    path: '/index',
    handler: (req, h) => {
      return h.view('index', {
        title: 'Using handlebars in Hapi',
        message: 'Tutorial',
      });
    },
  });

  await server.start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
