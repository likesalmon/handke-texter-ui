var angular = require('angular');

module.exports = angular.module('Texter', [])
        .controller('TexterCtrl', require('./TexterCtrl'))
        .controller('ContactDialogCtrl', require('./ContactDialogCtrl'))
        .service('Text', require('./TexterService'))
        .service('ContactService', require('./ContactService'));
