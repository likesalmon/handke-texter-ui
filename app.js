require('./styles.scss');

var angular = require('angular');
var ngResource = require('angular-resource');
var material = require('angular-material');
var uiRouter = require('angular-ui-router');
var ngMdIcons = require('angular-material-icons');
var Login = require('./Login');
var Texter = require('./Texter');

angular.module('handkeTexter', [
        'ngResource',
        uiRouter,
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        Texter.name,
        Login.name
    ])
    .constant('API', {
        root: 'http://localhost:8000/api',
        login: '/login',
        sendText: '/sendText'
    })
    .config([
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function (
            $locationProvider,
            $stateProvider,
            $urlRouterProvider
        ) {
            $locationProvider.html5Mode(false);

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    template: require('./Login/login.html'),
                    controller: 'LoginCtrl'
                })
                .state('texter', {
                    url: '/texter',
                    template: require('./Texter/texter.html'),
                    controller: 'TexterCtrl'
                });


        }
    ])
    .run(['$state', function ($state) {
    }]);
