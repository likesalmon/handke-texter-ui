module.exports = [
    '$resource',
    'Helper',
    function (
        $resource,
        Helper
    ) {
        return $resource(
            Helper.getAPIUrl() + Helper.getAPIPath() + '/sms/send');
    }
];
