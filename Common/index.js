'use strict';

var angular = require('angular');
// io is available on the global scope
require('../node_modules/angular-socket-io/socket.js');

module.exports = angular.module('Common', ['btford.socket-io'])
    .controller('NavigationCtrl', require('./NavigationCtrl'))
    .factory('Helper', require('./HelperService'))
    .factory('HandkeSocket', require('./HandkeSocketService'))
    .factory('AuthInterceptor', require('./AuthInterceptor'));
