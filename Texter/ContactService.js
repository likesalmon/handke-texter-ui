'use strict';

module.exports = [
    'Helper',
    '$resource',
    '$window',
    function (Helper, $resource, $window) {
        return $resource(Helper.getAPIUrl() + '/contacts/:id',
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
