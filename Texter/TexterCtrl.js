module.exports = [
    'Contact',
    'handkeSocket',
    '$mdDialog',
    '$mdSidenav',
    'Text',
    '$scope',
    'Script',
    function TexterCtrl (
        Contact,
        handkeSocket,
        $mdDialog,
        $mdSidenav,
        Text,
        $scope,
        Script
    ) {
        $scope.init = function () {
            $scope.contacts = Contact.$query();

            $scope.incoming = [];

            var script = Script({});
            console.log(script, Script);

            // $scope.scripts = Script().$query();

            // $scope.scripts = Script.$query(function (results) {
            //     console.log(results);
            // });
            // var script = new Script();
            // Script.$query()
            //     .then(function (results) {
            //         $scope.scripts = results;
            //     });

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



        /*************
            Contacts
        **************/

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

        /*************
            Scripts
        **************/
        $scope.openAddScriptDialog = function () {
            $mdDialog.show({
                controller: 'ScriptDialogCtrl',
                template: require('./AddScriptDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
            .then(function (script) {
                console.log('script', script);
                Script.$save({}, script)
                    .then(function () {
                        $scope.scripts = Script.$query();
                    });
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
                    $scope.scripts = Script.update(results.script);
                    return;
                }

                if (results.action === 'remove') {
                    $scope.scripts = Script.remove(results.script);
                    return;
                }
            });
        };

        $scope.init();
    }
];
