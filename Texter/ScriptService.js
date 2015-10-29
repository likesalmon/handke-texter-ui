'use strict';

module.exports = [
    'Helper',
    '$resource',
    '$window',
    function (Helper, $resource, $window) {
        return $resource(
            Helper.getAPIUrl() + Helper.getAPIPath() + '/scripts/:id',
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
