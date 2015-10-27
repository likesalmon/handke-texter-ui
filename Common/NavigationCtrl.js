'use strict';

module.exports = [
    'API',
    '$scope',
    function (API, $scope) {
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
                name: 'Admin',
                icon: 'settings',
                sref: 'texter'
            },
            {
                name: 'Logout',
                icon: 'logout',
                sref: 'logout'
            }
        ];
    }
];
