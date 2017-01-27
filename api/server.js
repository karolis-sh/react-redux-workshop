'use strict';

const Hapi = require('hapi');
const Good = require('good');

const {getBooks} = require('./storage');


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Register plugins
server.register([{
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, require('inert')], (err) => {
  if (err) throw err;

  // Routes
  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      return reply('Hello Inntec!');
    },
  });

  server.route({
    method: 'GET',
    path: '/img/{file*}',
    handler: {
      directory: {
        path: 'public/img',
      },
    },
  });

  server.route({
    method: 'GET',
    path:'/api/books',
    handler: function (request, reply) {
      return reply(getBooks());
    },
  });

  // Start server
  server.start((err) => {
    if (err) throw err;
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
