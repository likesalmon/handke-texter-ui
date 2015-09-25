module.exports = ['$resource', 'API', function Text ($resource, API) {
    return $resource(API.root + API.sendText);
}];
