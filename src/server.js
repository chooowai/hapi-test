const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const routes = require('./routes/routes');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const swaggerOptions = {
    info: {
            title: 'Test API Documentation'
        },
    };

// Register the routes from routes file
server.route(routes);

// Initilize server
exports.init = async () => {

    await server.initialize();
    return server;
};

// Register Swagger and start server
exports.start = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // Setup view for frontend
    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});