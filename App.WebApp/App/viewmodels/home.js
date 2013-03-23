//define(function (require) {
//    var app = require('durandal/app');

//    return {
//        displayName: 'My Page',
//        showMessage: function () {
//            app.showMessage('Hello there!');
//        }
//    };
//});


define(function (require) {

        init = function () {

        },
        isGlobalLoading = ko.observable(true),
        canShowView = ko.computed(function () {
            return !isGlobalLoading();
        }, this);

        var self = {
            activate: init,
            isGlobalLoading: isGlobalLoading,
            canShowView: canShowView,
        };
        return self;
    });