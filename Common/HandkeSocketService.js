'use strict';

module.exports = [
    'Helper',
    'socketFactory',
    '$rootScope',
    function (
        Helper,
        socketFactory,
        $rootScope
    ) {

        var socket = socketFactory({
            /* jshint undef: false */
            // io is availble on the global scope
            ioSocket: io.connect(Helper.getAPIUrl())
        });

        socket.forward('error');
        socket.forward('connection');

        var incoming = [];
        socket.forward('incoming');
        $rootScope.$on('socket:incoming', function (event, data) {
            // divide media into an array
            if (parseInt(data.NumMedia)) {
                data.images = [];

                for (var i = 0; i < parseInt(data.NumMedia); i++) {
                    data.images.push({
                        type: data['MediaContentType' + i],
                        url: data['MediaUrl' + i]
                    });
                }
            }
            incoming.push(data);
        });

        return {
            socket: socket,
            messages: incoming
        };
    }
];
