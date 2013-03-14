define(function (require) {
    var app = require('durandal/app');
    

    return {
        number : ko.observable(33),
        displayName: 'My Page',
        showMessage: function () {
            app.showMessage('Hello there!');
        }
    };
});