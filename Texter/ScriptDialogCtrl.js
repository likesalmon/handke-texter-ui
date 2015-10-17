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
            if (self.script) {
                $scope.script = self.script;
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            $mdDialog.hide($scope.script);
        };

        $scope.update = function () {
            $mdDialog.hide({
                action: 'update',
                script: $scope.script
            });
        };

        $scope.remove = function () {
            $mdDialog.hide({
                action: 'remove',
                script: $scope.script
            });
        };

        $scope.init();
    }
];
