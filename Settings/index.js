'use strict';

var angular = require('angular');

module.exports = angular.module('Settings', [])
    .controller('SettingsCtrl', require('./SettingsCtrl'))
    .factory('SettingsService', require('./SettingsService'));
