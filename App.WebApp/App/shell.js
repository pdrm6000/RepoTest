define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', 'home'], moduleId: 'viewmodels/home/home', title: 'Home', nav: true },
                { route: 'albumsReview', moduleId: 'viewmodels/review/albumsReview', title: 'Review', nav: true },
                { route: 'artistsDirectory', moduleId: 'viewmodels/artists/artistsDirectory', title: 'Artists', nav: true },
                { route: 'albumsDirectory', moduleId: 'viewmodels/albums/albumsDirectory', title: 'Albums', nav: true },
            ]).buildNavigationModel()
              .mapUnknownRoutes('home', 'not-found')
              .activate();
        }
    };
});