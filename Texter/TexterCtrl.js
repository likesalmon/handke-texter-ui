module.exports = [
    'ContactService',
    'handkeSocket',
    '$mdDialog',
    '$mdSidenav',
    'Text',
    '$scope',
    'ScriptService',
    function TexterCtrl (
        ContactService,
        handkeSocket,
        $mdDialog,
        $mdSidenav,
        Text,
        $scope,
        ScriptService
    ) {
        $scope.init = function () {
            $scope.contacts = ContactService.get();

            $scope.incoming = [];

            $scope.scripts = ScriptService.get();

            $scope.outgoing = {};

            $scope.$on('socket:error', function (ev, data) {
                console.error('socket:error', data);
            });

            handkeSocket.forward('incoming', $scope);
            $scope.$on('socket:incoming', function (ev, data) {
                data.timestamp = new Date();
                $scope.incoming.push(data);
            });

            handkeSocket.forward('connection', $scope);
            $scope.$on('socket:connection', function (ev, data) {
                console.log('socket:connection');
            });
        };

        $scope.loadScript = function (script) {
            $scope.outgoing.text = script.text;
        };

        $scope.send = function (content) {
            var text = new Text({
                to: $scope.contacts.filter(function (contact) {
                    return contact.selected;
                }),
                body: $scope.outgoing.text
            });

            text.$save();
        };

        $scope.toggleIncoming = function () {
            $mdSidenav('incoming').toggle();
        };

        $scope.openAddContactDialog = function () {
            $mdDialog.show({
                controller: 'ContactDialogCtrl',
                template: require('./AddContactDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
            .then(function (contact) {
                ContactService.save(contact);
            });
        };

        $scope.openEditContactDialog = function (contact) {
            $mdDialog.show({
                controller: 'ContactDialogCtrl',
                template: require('./EditContactDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    contact: contact
                },
                bindToController: true
            })
            .then(function (results) {
                if (results.action === 'update') {
                    $scope.contacts = ContactService.update(results.contact);
                    return;
                }

                if (results.action === 'remove') {
                    $scope.contacts = ContactService.remove(results.contact);
                    return;
                }
            });
        };

        $scope.openEditScriptDialog = function (script) {
            $mdDialog.show({
                controller: 'ScriptDialogCtrl',
                template: require('./EditScriptDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    script: script
                },
                bindToController: true
            })
            .then(function (results) {
                if (results.action === 'update') {
                    $scope.scripts = ScriptService.update(results.script);
                    return;
                }

                if (results.action === 'remove') {
                    $scope.scripts = ScriptService.remove(results.script);
                    return;
                }
            });
        };

        $scope.init();
    }
];
