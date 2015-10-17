module.exports = [
    '$resource',
    'API',
    '$window',
    function ($resource, API, $window) {
        var apiUrl = '';

        if (/localhost/.test($window.location.href)) {
            apiUrl = API.protocol + '://localhost:' + API.port;
        } else {
            apiUrl = API.protocol + '://' + API.ip + ':' + API.port;
        }

        return $resource(apiUrl + '/api/sms/send');
    }
];
