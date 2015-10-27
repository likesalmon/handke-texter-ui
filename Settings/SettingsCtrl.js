'use strict';

module.exports = [
    '$mdDialog',
    '$mdToast',
    'Purge',
    '$scope',
    function (
        $mdDialog,
        $mdToast,
        Purge,
        $scope
    ) {
        $scope.purge = function (source) {
            var dialog = $mdDialog.confirm()
                .title('Are you sure you want to delete all ' + source + '?')
                .content('Choose wisely! Deleting is forever.')
                .ariaLabel('Delete ' + source)
                .ok('Delete ' + source)
                .cancel('Cancel');

            $mdDialog.show(dialog).then(
                function() {
                    return Purge.delete({ table: source },
                        function (response) {
                            return $mdToast.show(
                              $mdToast.simple()
                                .content(response.message)
                                .hideDelay(3000)
                            );
                        },
                        function (err) {
                            return $mdToast.show(
                              $mdToast.simple()
                                .content(err.statusText)
                                .hideDelay(3000)
                            );
                        }
                    );
                }
            );
        };
    }
];
