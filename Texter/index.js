var angular = require('angular');

module.exports = angular.module('Texter', [])
        .controller('TexterCtrl', require('./TexterCtrl'))
        .controller('ContactDialogCtrl', require('./ContactDialogCtrl'))
        .controller('ScriptDialogCtrl', require('./ScriptDialogCtrl'))
        .service('Text', require('./TexterService'))
        .service('ContactService', require('./ContactService'))
        .service('ScriptService', require('./ScriptService'));
