'use strict';

module.exports = [function () {
    var contacts = [
        {
            name: 'testuser',
            phone: '555555555'
        }
    ];

    return {
        get: function () {
            return contacts;
        },
        save: function (contact) {
            contact.id = contacts.length + 1;
            contacts.push(contact);
        },
        update: function (contact) {
            var oldContact = contacts.filter(function (c) {
                return c.id === contact.id;
            });

            oldContact.name = contact.name;
            oldContact.number = contact.number;

            return contacts;
        },
        remove: function (contact) {
            contacts = contacts.filter(function (c) {
                return c.id !== contact.id;
            });

            return contacts;
        }
    };
}];
