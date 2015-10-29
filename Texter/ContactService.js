'use strict';

module.exports = [
    'Helper',
    '$resource',
    '$window',
    function (Helper, $resource, $window) {
        return $resource(
            Helper.getAPIUrl() + Helper.getAPIPath() + '/contacts/:id',
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
