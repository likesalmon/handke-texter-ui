'use strict';

module.exports = [
    'Helper',
    'socketFactory',
    '$window',
    function (Helper, socketFactory, $window) {

        var handkeSocket = socketFactory({
            /* jshint undef: false */
            // io is availble on the global scope
            ioSocket: io.connect(Helper.getAPIUrl())
        });

        handkeSocket.forward('error');
        return handkeSocket;
    }
];
