module.exports = [
    '$anchorScroll',
    'HandkeSocket',
    '$location',
    '$rootScope',
    '$scope',
    function (
        $anchorScroll,
        HandkeSocket,
        $location,
        $rootScope,
        $scope
    ) {
        $rootScope.showNav = false;
        $scope.showNav = $rootScope.showNav;

        $scope.incoming = HandkeSocket.messages;

        // Used in template but not in this module
        $scope.populateOutgoing = function () {
            return;
        };

        HandkeSocket.socket.forward('incoming', $scope);
        $scope.$on('socket:incoming', function (event, data) {
            $location.hash('text-' + ($scope.incoming.length - 1));
            $anchorScroll();
        });
    }
];
