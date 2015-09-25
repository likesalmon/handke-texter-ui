var angular = require('angular');

module.exports = angular.module('Texter', [])
        .controller('TexterCtrl', require('./TexterCtrl'))
        .service('Text', require('./TexterService'));
