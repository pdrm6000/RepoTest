define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', 'home'], moduleId: 'viewmodels/home', title: 'Home', nav: true },
                { route: 'albumsReview', moduleId: 'viewmodels/albumsReview', title: 'Review', nav: true },
                { route: 'artistsDirectory', moduleId: 'viewmodels/artistsDirectory', title: 'Artists', nav: true },
                { route: 'albumsDirectory', moduleId: 'viewmodels/albumsDirectory', title: 'Albums', nav: true },
            ]).buildNavigationModel()
              .mapUnknownRoutes('home', 'not-found')
              .activate();
            
            //        //configure routingewq
            //        router.useConvention();
            //        router.mapNav('viewmodels/home', 'viewmodels/home', 'Home');
            //        router.mapNav('viewmodels/albumsReview', 'viewmodels/albumsReview', 'Review');
            //        router.mapNav('viewmodels/artistsDirectory', 'viewmodels/artistsDirectory', 'Artists');
            //        router.mapNav('viewmodels/albumsDirectory', 'viewmodels/albumsDirectory', 'Albums');

        }
    };
});