module.exports = [
    '$resource',
    'Helper',
    '$window',
    function ($resource, Helper, $window) {
        return $resource(Helper.getAPIUrl() + '/api/sms/send');
    }
];
