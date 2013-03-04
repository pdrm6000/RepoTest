define("app/home.viewmodel", ['knockout-2.2.0'], function (ko) {

    init = function () {
        ko.applyBindings(self, document.getElementById("body"));
    },
    isGlobalLoading = ko.observable(true),
    canShowView = ko.computed(function () {
        return !isGlobalLoading();
    }, this);

    var self = {
        init: init,
        isGlobalLoading: isGlobalLoading,
        canShowView: canShowView,
    };
    return self;
});