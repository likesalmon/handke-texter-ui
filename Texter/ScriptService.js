'use strict';

module.exports = [
    'Helper',
    '$resource',
    '$window',
    function (Helper, $resource, $window) {
        return $resource(Helper.getAPIUrl() + '/api/scripts/:id',
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
