module.exports = [
    '$scope',
    'Text',
    function TexterCtrl ($scope, Text) {
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

        $scope.incoming = [
            {
                number: '503-555-1234',
                text: 'This is a text.'
            },
            {
                number: '503-555-1234',
                text: 'This is another text.'
            }
        ];

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
    }
];
