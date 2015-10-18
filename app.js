require('./styles.scss');

var angular = require('angular');
var ngMessages = require('angular-messages');
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
        'ngMessages',
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
    .constant('GROUPS', ['A','B','C','D'])
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
                });


        }
    ])
    .factory('Helper', [
        'API',
        '$window',
        function (API, $window) {
            return {
                getAPIUrl: function () {
                    var url = '';

                    if (/localhost/.test($window.location.href)) {
                        url = API.protocol + '://localhost:' + API.port;
                    } else {
                        url = API.protocol + '://' + API.ip + ':' + API.port;
                    }

                    return url;
                }
            };
        }
    ])
    .factory('handkeSocket', [
        'Helper',
        'socketFactory',
        '$window',
        function (Helper, socketFactory, $window) {
            var handkeSocket = socketFactory({
                ioSocket: io.connect(Helper.getAPIUrl())
            });

            handkeSocket.forward('error');
            return handkeSocket;
        }
    ]);
