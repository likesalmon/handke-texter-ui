'use strict';

module.exports = [
    'Helper',
    '$resource',
    function (
        Helper,
        $resource
    ) {
        return $resource(Helper.getAPIUrl() + '/api/purge/:table');
    }
];