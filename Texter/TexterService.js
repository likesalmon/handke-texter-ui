module.exports = [
    '$resource',
    'Helper',
    function (
        $resource,
        Helper
    ) {
        return $resource(Helper.getAPIUrl() + '/api/sms/send');
    }
];
