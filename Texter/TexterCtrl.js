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

            $scope.scripts = Script.$query();

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
                console.log('incoming', data);
                data.timestamp = new Date();
                $scope.incoming.push(data);
            });

            handkeSocket.forward('connection', $scope);
            $scope.$on('socket:connection', function (ev, data) {
                console.log('socket:connection');
            });
        };

        $scope.loadScript = function (script) {
            $scope.outgoing.text = script.content;
        };

        $scope.send = function () {

            var options = {
                to: $scope.contacts.filter(function (contact) {
                    return contact.selected;
                })[0].phone,
                body: $scope.outgoing.text
            };

            var text = new Text(options);

            text.$save()
                .then(
                    function (data) {
                        console.log('text sent', data);
                    },
                    function (data) {
                        console.error('text error', data);
                    }
                );
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
                Contact.$save(contact);
                $scope.contacts = Contact.$query();
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
                    Contact.$update(results.contact);
                    $scope.contacts = Contact.$query();
                    return;
                }

                if (results.action === 'remove') {
                    Contact.$remove(results.contact);
                    $scope.contacts = Contact.$query();
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
                Script.$save(script);
                $scope.scripts = Script.$query();
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
                console.log(results);
                if (results.action === 'update') {
                    Script.$update(results.script);
                    $scope.scripts = Script.$query();
                    return;
                }

                if (results.action === 'remove') {
                    Script.$remove(results.script);
                    $scope.scripts = Script.$query();
                    return;
                }
            });
        };

        $scope.init();
    }
];
