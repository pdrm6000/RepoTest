window.albumApp = window.albumApp || {};

window.albumApp.homeViewModel = (function (ko) {
    var isGlobalLoading = ko.observable(true);
    var canShowView = ko.computed(function() {
        return !isGlobalLoading();
    }, this);
    
    return {
        isGlobalLoading: isGlobalLoading,
        canShowView : canShowView,
    };

})(ko);


ko.applyBindings(window.albumApp.homeViewModel, document.getElementById("body"));