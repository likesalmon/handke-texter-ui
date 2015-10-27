'use strict';

module.exports = [
    'API',
    '$window',
    function (API, $window) {
        return {
            getAPIUrl: function () {
                var url = '';

                if (/localhost/.test($window.location.href)) {
                    url = API.protocol + '://localhost:' + API.port;
                } else {
                    url = API.protocol + '://' + API.ip + ':' + API.port;
                }

                return url;
            }
        };
    }
];
