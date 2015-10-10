'use strict';

module.exports = [function () {
    var scripts = [
        {
            id: 1,
            title: 'First Script',
            text: 'This is the first script. It is long.'
        },
        {
            id: 2,
            title: 'Second Script',
            text: 'This is the second script'
        }
    ];

    return {
        get: function () {
            return scripts;
        },
        save: function (script) {
            script.id = scripts.length + 1;
            scripts.push(script);
        },
        update: function (script) {
            var oldContact = scripts.filter(function (c) {
                return c.id === script.id;
            });

            oldContact.name = script.name;
            oldContact.number = script.number;

            return scripts;
        },
        remove: function (script) {
            scripts = scripts.filter(function (c) {
                return c.id !== script.id;
            });

            return scripts;
        }
    };
}];
