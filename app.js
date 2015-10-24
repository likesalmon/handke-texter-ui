require('./styles.scss');

var angular = require('angular');
var ngMessages = require('angular-messages');
var ngResource = require('angular-resource');
var material = require('angular-material');
var uiRouter = require('angular-ui-router');
var ngMdIcons = require('angular-material-icons');
var Common = require('./Common');
var Login = require('./Login');
var Texter = require('./Texter');
var Messages = require('./Messages');

angular.module('handkeTexter', [
        'ngResource',
        uiRouter,
        'ngMaterial',
        'ngMessages',
        'ngMdIcons',
        'ui.router',
        Common.name,
        Texter.name,
        Login.name,
        Messages.name
    ])
    .config([
        '$locationProvider',
        '$stateProvider',
        '$mdThemingProvider',
        '$urlRouterProvider',
        function (
            $locationProvider,
            $stateProvider,
            $mdThemingProvider,
            $urlRouterProvider
        ) {
            $locationProvider.html5Mode(false);

            $mdThemingProvider.theme('default')
                .primaryPalette('red')
                .accentPalette('orange');

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
                })
                .state('messages', {
                    url: '/messages',
                    template: require('./Messages/messages.html'),
                    controller: 'MessagesCtrl'
                })
                .state('messages.images', {
                    url: '/messages/images',
                    template: require('./Messages/messages.html'),
                    controller: 'MessagesCtrl'
                })
                .state('messages.text', {
                    url: '/messages.text',
                    template: require('./Messages/messages.html'),
                    controller: 'MessagesCtrl'
                });


        }
    ])
    .run(['$rootScope', function ($rootScope) {
        // Some controllers, like Messages, hide the nav bar.
        // This resets showNav.
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.showNav = true;
        });
    }])
    .constant('API', {
        protocol: 'http',
        ip: '45.55.27.217',
        port: '8000'
    })
    .constant('GROUPS', ['A','B','C','D']);
