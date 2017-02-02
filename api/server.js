const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');

const {getBooks, getEmployees, doBooking, doUnbooking} = require('./storage');


const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
  routes: {
    cors: true,
  },
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
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, Inert], (err) => {
  if (err) throw err;

  // Routes
  server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
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
    path: '/api/books',
    handler(request, reply) {
      return reply(getBooks());
    },
  });

  server.route({
    method: 'POST',
    path: '/api/books',
    handler(request, reply) {
      if (request.payload) {
        const data = request.payload;
        switch (data.action) {
          case 'BOOK':
            doBooking(data);
            console.log('doBooking', data);
            return reply({});
          case 'UNBOOK':
            doUnbooking(data);
            console.log('doUnbooking', data);
            return reply({});
          default:
            return reply({}).code(404);
        }
      }
      return reply({}).code(404);
    },
  });

  server.route({
    method: 'GET',
    path: '/api/employees',
    handler(request, reply) {
      return reply(getEmployees());
    },
  });

  // Start server
  server.start((startErr) => {
    if (startErr) throw startErr;
    server.log('info', `Server running at: ${server.info.uri}`);
  });
});
