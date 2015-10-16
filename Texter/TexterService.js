module.exports = ['$resource', 'API', function Text ($resource, API) {
    return $resource('http://localhost:8000/api/sms/send');
}];
