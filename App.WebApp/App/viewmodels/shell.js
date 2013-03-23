define(function (require) {
    var router = require('durandal/plugins/router'),
        app = require('durandal/app');

    return {
        router: router,
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            return router.activate('viewmodels/home');
        },
        viewAttached: function () {
            $("ul#menu li a").hover(function () {
                $(this).animate({ backgroundColor: '#7c7c7c', color: 'white' }, 150);
                $(this).tooltip({ delay: { show: 100, hide: 100 }, placement: 'bottom', animation: 'true' }, 'show');
            }, function () {
                $(this).animate({ backgroundColor: "transparent", color: '#b5b5b5' }, 150);
                $(this).tooltip('hide');
            });
        }
    };
});