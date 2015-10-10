var angular = require('angular');

module.exports = angular.module('Texter', [])
        .controller('TexterCtrl', require('./TexterCtrl'))
        .controller('ContactDialogCtrl', require('./ContactDialogCtrl'))
        .controller('ScriptDialogCtrl', require('./ScriptDialogCtrl'))
        .service('Text', require('./TexterService'))
        .factory('Contact', require('./ContactService'))
        .factory('Script', require('./ScriptService'));
