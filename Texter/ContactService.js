'use strict';

module.exports = [
    'API',
    '$resource',
    '$window',
    function (API, $resource, $window) {
        var apiUrl = API.protocol + '://localhost:' + API.port;

        if (!/localhost/.test($window.location.href)) {
            apiUrl = API.protocol + '://' + API.ip + ':' + API.port;
        }

        var Contact = $resource(apiUrl + '/api/contacts/:id',
            {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );

        return new Contact();
        // var contacts = [
        //     {
        //         id: 1,
        //         name: 'testuser',
        //         phone: '555555555'
        //     }
        // ];
        //
        // return {
        //     get: function () {
        //         return contacts;
        //     },
        //     save: function (contact) {
        //         contact.id = contacts.length + 1;
        //         contacts.push(contact);
        //     },
        //     update: function (contact) {
        //         var oldContact = contacts.filter(function (c) {
        //             return c.id === contact.id;
        //         });
        //
        //         oldContact.name = contact.name;
        //         oldContact.number = contact.number;
        //
        //         return contacts;
        //     },
        //     remove: function (contact) {
        //         contacts = contacts.filter(function (c) {
        //             return c.id !== contact.id;
        //         });
        //
        //         return contacts;
        //     }
        // };
    }
];
