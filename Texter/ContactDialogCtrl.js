'use strict';

module.exports = [
    'GROUPS',
    '$mdDialog',
    '$scope',
    function (
        GROUPS,
        $mdDialog,
        $scope
    ) {
        var self = this;
        $scope.init = function () {
            $scope.groups = GROUPS;

            if (self.contact) {
                $scope.contact = self.contact;
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            // if the contact has an id update it
            if ($scope.contact.id) {
                $mdDialog.hide({
                    action: 'update',
                    contact: $scope.contact
                });
            } else {
                // otherwise save a new contact
                $mdDialog.hide($scope.contact);
            }
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
