require('./styles.scss');

var angular = require('angular');
var ngResource = require('angular-resource');
var material = require('angular-material');
var uiRouter = require('angular-ui-router');
var ngMdIcons = require('angular-material-icons');
var socketIo = require('./node_modules/angular-socket-io/socket.js');
var Login = require('./Login');
var Texter = require('./Texter');

angular.module('handkeTexter', [
        'ngResource',
        uiRouter,
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        'btford.socket-io',
        Texter.name,
        Login.name
    ])
    .constant('API', {
        protocol: 'http',
        ip: '45.55.27.217',
        port: '8000'
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
    }])
    .factory('handkeSocket', [
        'API',
        'socketFactory',
        '$window',
        function (API, socketFactory, $window) {
            var options = {};
            var apiUrl = API.protocol + '://localhost:' + API.port;

            if (!/localhost/.test($window.location.href)) {
                apiUrl = API.protocol + '://' + API.ip + ':' + API.port;
            }

            var handkeSocket = socketFactory({
                ioSocket: io.connect(apiUrl)
            });

            handkeSocket.forward('error');
            return handkeSocket;
        }
    ]);
