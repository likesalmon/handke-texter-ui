'use strict';

module.exports = [
    'API',
    '$resource',
    '$window',
    function (API, $resource, $window) {
        var apiUrl = '';

        if (/localhost/.test($window.location.href)) {
            apiUrl = API.protocol + '://localhost:' + API.port;
        } else {
            apiUrl = API.protocol + '://' + API.ip + ':' + API.port;
        }

        return $resource(apiUrl + '/api/contacts/:id',
            {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    }
];
