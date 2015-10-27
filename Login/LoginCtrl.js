module.exports = [
    '$http',
    'Login',
    '$mdToast',
    '$sessionStorage',
    '$scope',
    '$state',
    function LoginCtrl (
        $http,
        Login,
        $mdToast,
        $sessionStorage,
        $scope,
        $state
    ) {
        $scope.user = {
            username: null,
            password: null
        };
        $scope.storage = $sessionStorage;

        $scope.login = function (username, password) {
            Login.save(
                {
                    username: username,
                    password: password
                },
                function (response) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(response.message)
                            .hideDelay(3000)
                    );
                    if (!response.error) {
                        $state.go('texter');
                    }
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
