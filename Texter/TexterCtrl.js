module.exports = [
    '$scope',
    'Text',
    'handkeSocket',
    function TexterCtrl ($scope, Text, handkeSocket) {
        $scope.contacts = [
            {
                number: '+15034197245',
                group: 'a',
                selected: false
            },
            {
                number: '+15035555555',
                group: 'a',
                selected: false
            }
        ];

        $scope.incoming = [];

        $scope.scripts = [
            {
                title: 'First Script',
                text: 'This is the first script. It is long.'
            },
            {
                title: 'Second Script',
                text: 'This is the second script'
            }
        ];

        $scope.outgoing = {};
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
    }
];
