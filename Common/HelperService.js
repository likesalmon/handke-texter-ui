'use strict';

module.exports = [
    'API',
    '$window',
    function (API, $window) {
        return {
            getAPIUrl: function () {
                var url = '';

                if (/localhost/.test($window.location.href)) {
                    url = 'http://localhost:' + API.port;
                } else {
                    url = API.url;
                }

                return url;
            }
        };
    }
];
