module.exports = [
    '$anchorScroll',
    'Contact',
    'HandkeSocket',
    '$location',
    '$log',
    '$mdDialog',
    '$mdSidenav',
    '$mdToast',
    '$scope',
    'Script',
    'Text',
    function TexterCtrl (
        $anchorScroll,
        Contact,
        HandkeSocket,
        $location,
        $log,
        $mdDialog,
        $mdSidenav,
        $mdToast,
        $scope,
        Script,
        Text
    ) {
        $scope.init = function () {
            $scope.contacts = Contact.query();
            $scope.contactGroups = [
                {
                    name: 'A',
                    selected: false
                },
                {
                    name: 'B',
                    selected: false
                },
                {
                    name: 'C',
                    selected: false
                },
                {
                    name: 'D',
                    selected: false
                }
            ];

            $scope.incoming = HandkeSocket.messages;

            $scope.scripts = Script.query();
            $scope.scriptFilter = '';

            $scope.outgoing = {};

            HandkeSocket.socket.forward('incoming', $scope);
            $scope.$on('socket:incoming', function (event, data) {
                $location.hash('text-' + ($scope.incoming.length - 1));
                $anchorScroll();
            });

            HandkeSocket.socket.forward('contact:new', $scope);
            $scope.$on('socket:contact:new', function (event, data) {
                $scope.contacts.push(data);
            });
        };

        /**
         * Populate the outgoing textarea with the selected script
         */
        $scope.populateOutgoing = function (text) {
            $scope.outgoing.text = text;
        };

        /**
         * Send a text to an array of numbers
         */
        $scope.send = function () {
            var phoneNumbers = $scope.contacts
                .filter(function (contact) {
                    return contact.selected;
                })
                .map(function (contact) {
                    return contact.phone;
                });

            if (!phoneNumbers.length) {
                return $mdToast.show(
                  $mdToast.simple()
                    .content('Please select a contact')
                    .hideDelay(3000)
                );
            }

            if (!$scope.outgoing.text) {
                return $mdToast.show(
                  $mdToast.simple()
                    .content('Please enter some text')
                    .hideDelay(3000)
                );
            }

            var text = {
                to: phoneNumbers,
                body: $scope.outgoing.text
            };

            Text.save(text, function (response) {
                return $mdToast.show(
                  $mdToast.simple()
                    .content('Your text was sent')
                    .hideDelay(3000)
                );
            });
        };



        /*************
            Contacts
        **************/
        $scope.selectGroup = function (contacts, group) {
            group.selected = !group.selected;

            contacts.filter(function (contact) {
                return contact.group === group.name;
            })
            .forEach(function (contact) {
                contact.selected = group.selected;
            });
        };

        $scope.openContactDialog = function (contact) {
            $mdDialog.show({
                controller: 'ContactDialogCtrl',
                template: require('./contactDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    contact: contact || null
                },
                bindToController: true
            })
            .then(function (results) {
                var actions = {
                    save: function () {
                        Contact.save(results.contact, function (response) {
                            // $scope.contacts = Contact.query();
                        });
                    },
                    remove: function () {
                        Contact.delete(results.contact, function () {
                            $scope.contacts = Contact.query();
                        });
                    },
                    update: function () {
                        Contact.update(results.contact, function () {
                            $scope.contacts = Contact.query();
                        });
                    }
                };

                actions[results.action]();
            });
        };

        /*************
            Scripts
        **************/
        $scope.openScriptDialog = function (script) {
            $mdDialog.show({
                controller: 'ScriptDialogCtrl',
                template: require('./scriptDialog.html'),
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    script: script || null
                },
                bindToController: true
            })
            .then(function (results) {
                var actions = {
                    save: function () {
                        Script.save(results.script, function () {
                            $scope.scripts = Script.query();
                        });
                    },
                    remove: function () {
                        Script.delete(results.script, function (scripts) {
                            $scope.scripts = Script.query();
                        });
                    },
                    update: function () {
                        Script.update(results.script, function () {
                            $scope.scripts = Script.query();
                        });
                    }
                };

                actions[results.action]();
            });
        };

        $scope.init();
    }
];
