var Hapi = require('hapi');
var Good = require('good');
var Inert = require('inert');
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route([
    {
        method: 'GET',
        path: '/{filename*}',
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    },
    {
        method: 'GET',
        path: '/*',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    }
]);

var plugins = [
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    },
    {
        register: Inert,
        options: {}
    }
];

server.register(plugins, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
