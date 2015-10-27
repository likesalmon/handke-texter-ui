var angular = require('angular');

module.exports = angular.module('Login', [])
        .controller('LoginCtrl', require('./LoginCtrl'))
        .factory('Login', require('./LoginService'));
