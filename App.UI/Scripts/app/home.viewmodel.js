define("app/home.viewmodel", ['knockout', 'jquery', 'bootstrap'], function (ko, $, bootstrap) {

    init = function () {
        ko.applyBindings(self, document.getElementById("body"));

        $("ul#menu li a").hover(function () {
            $(this).animate({ backgroundColor: '#7c7c7c', color: 'white' }, 150);
            $(this).tooltip({ delay: { show: 100, hide: 100 }, placement: 'bottom', animation: 'true' }, 'show');
            //$(this).tooltip('show');
        }, function () {
            $(this).animate({ backgroundColor: "white", color: '#b5b5b5' }, 150);
            $(this).tooltip('hide');
        });
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