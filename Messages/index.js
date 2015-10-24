var angular = require('angular');

module.exports = angular.module('Messages', [])
    .controller('MessagesCtrl', require('./MessagesCtrl'));
