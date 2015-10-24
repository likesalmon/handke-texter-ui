module.exports = [
    'handkeSocket',
    '$scope',
    function (
        handkeSocket,
        $scope
    ) {
        $scope.incoming = [];

        handkeSocket.forward('incoming', $scope);
        $scope.$on('socket:incoming', function (event, data) {
            data.timestamp = new Date();

            // divide media into an array
            if (parseInt(data.NumMedia)) {
                data.images = [];

                for (var i = 0; i < parseInt(data.NumMedia); i++) {
                    data.images.push({
                        type: data['MediaContentType' + i],
                        url: data['MediaUrl' + i]
                    });
                }
            }
            $scope.incoming.push(data);
        });
    }
];
