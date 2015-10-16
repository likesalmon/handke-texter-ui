'use strict';

module.exports = [
    'API',
    '$resource',
    '$window',
    function (API, $resource, $window) {
        // var apiUrl = API.protocol + '://localhost:' + API.port;
        //
        // if (!/localhost/.test($window.location.href)) {
        //     apiUrl = API.protocol + '://' + API.ip + ':' + API.port;
        // }

        var scripts = [
            {
                id: 1,
                title: 'This is a title',
                content: 'This is a script'
            }
        ];

        var self = this;

        return {
            $query: function () {
                return scripts;
            },
            $save: function (script) {
                script.id = scripts.length + 1;
                scripts.push(script);
            },
            $update: function (script) {
                var oldScript = scripts.filter(function (c) {
                    return c.id === script.id;
                });

                oldScript.name = script.title;
                oldScript.number = script.content;

                return scripts;
            },
            $remove: function (script) {
                scripts = scripts.filter(function (c) {
                    return c.id !== script.id;
                });

                return scripts;
            }
        };

        // return $resource(apiUrl + '/api/scripts/:id',
        //     {
        //         id: '@id'
        //     },
        //     {
        //         update: {
        //             method: 'PUT'
        //         }
        //     }
        // );

        // return new Script();

        // var scripts = [
        //     {
        //         id: 1,
        //         title: 'First Script',
        //         content: 'This is the first script. It is long.'
        //     },
        //     {
        //         id: 2,
        //         title: 'Second Script',
        //         content: 'This is the second script'
        //     }
        // ];
        //
        // return {
        //     get: function () {
        //         return scripts;
        //     },
        //     save: function (script) {
        //         script.id = scripts.length + 1;
        //         scripts.push(script);
        //     },
        //     update: function (script) {
        //         var oldContact = scripts.filter(function (c) {
        //             return c.id === script.id;
        //         });
        //
        //         oldContact.name = script.name;
        //         oldContact.number = script.number;
        //
        //         return scripts;
        //     },
        //     remove: function (script) {
        //         scripts = scripts.filter(function (c) {
        //             return c.id !== script.id;
        //         });
        //
        //         return scripts;
        //     }
        // };
    }
];
