'use strict';

module.exports = [
    'API',
    '$window',
    function (API, $window) {
        return {
            getAPIUrl: function () {
                if (/localhost/.test($window.location.href)) {
                    return 'http://localhost:' + API.port + '/api';
                } else {
                    return  API.url + '/api';
                }
            },

            getAPIPath: function () {
                if (/localhost/.test($window.location.href)) {
                    return '';
                } else {
                    return  '/api';
                }
            }
        };
    }
];
