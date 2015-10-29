'use strict';

module.exports = [
    'API',
    '$window',
    function (API, $window) {
        return {
            getAPIUrl: function () {
                var url = '';

                if (/localhost/.test($window.location.href)) {
                    url = 'http://localhost:' + API.port + '/api';
                } else {
                    url = API.url + '/api';
                }

                return url;
            }
        };
    }
];
