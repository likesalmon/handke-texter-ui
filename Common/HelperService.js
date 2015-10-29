'use strict';

module.exports = [
    'API',
    '$window',
    function (API, $window) {
        return {
            getAPIUrl: function () {
                if (/localhost/.test($window.location.href)) {
                    return API.devUrl;
                } else {
                    return  API.url;
                }
            },

            getAPIPath: function () {
                return API.path;
            },

            getSocketPath: function () {
                if (/localhost/.test($window.location.href)) {
                    return '';
                } else {
                    return  '/api/socket.io';
                }
            }
        };
    }
];
