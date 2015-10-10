'use strict';

module.exports = [
    '$mdDialog',
    '$scope',
    function (
        $mdDialog,
        $scope
    ) {
        var self = this;
        $scope.init = function () {
            if (self.contact) {
                $scope.contact = self.contact;
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            $mdDialog.hide($scope.contact);
        };

        $scope.update = function () {
            $mdDialog.hide({
                action: 'update',
                contact: $scope.contact
            });
        };

        $scope.remove = function () {
            $mdDialog.hide({
                action: 'remove',
                contact: $scope.contact
            });
        };

        $scope.init();
    }
];
