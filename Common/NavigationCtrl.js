'use strict';

module.exports = [
    'API',
    'Login',
    '$mdToast',
    '$scope',
    '$sessionStorage',
    '$state',
    function (
        API,
        Login,
        $mdToast,
        $scope,
        $sessionStorage,
        $state
    ) {
        $scope.phoneNumber = API.phoneNumber;

        $scope.navItems = [
            {
                name: 'Texter',
                icon: 'messenger',
                sref: 'texter'
            },
            {
                name: 'All Texts',
                icon: 'forum',
                sref: 'messages'
            },
            {
                name: 'Just Images',
                icon: 'photo',
                sref: 'messages.images'
            },
            {
                name: 'Just Words',
                icon: 'message',
                sref: 'messages.text'
            },
            {
                name: 'Settings',
                icon: 'settings',
                sref: 'settings'
            }
        ];

        $scope.logout = function () {
            Login.delete({},
                function (response) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(response.message)
                            .hideDelay(3000)
                    );
                    $state.go('login');
                },
                function (err) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(err.statusText)
                            .hideDelay(3000)
                    );
                }
            );

        };
    }
];
