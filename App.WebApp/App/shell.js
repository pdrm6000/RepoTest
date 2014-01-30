define(['plugins/router', 'viewmodels/data/metadata', 'viewmodels/data/globalConfig'], function (router, metadata, globalConfig) {
	return {
		router: router,
		globalConfig: globalConfig,
		activate: function () {

			metadata.prototype.init();
			globalConfig.prototype.initConfig();

			return router.map([
					{ route: ['', 'home'], moduleId: 'viewmodels/home/home', title: 'Home', nav: true },
					{ route: 'review', moduleId: 'viewmodels/review/review', title: 'Review', nav: true },
					{ route: 'artistsDirectory', moduleId: 'viewmodels/artists/artistsDirectory', title: 'Artists', nav: true },
					{ route: 'albumsDirectory', moduleId: 'viewmodels/albums/albumsDirectory', title: 'Albums', nav: true },
					]).buildNavigationModel()
					  .mapUnknownRoutes('home', 'not-found')
					  .activate();
		}
	};
});