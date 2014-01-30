define("viewmodels/data/globalConfig",
	[
		'plugins/router',
		'knockout'
	],
	function (router, ko) {

		var viewmodel = function () {
			var self = this;
		};


		viewmodel.prototype.moduleLoaded = ko.observable(false);

		viewmodel.prototype.moduleIsFullyLoaded = function () {
			viewmodel.prototype.moduleLoaded(true);
		};

		viewmodel.prototype.initConfig = function () {
			router.isNavigating.subscribe(function (newvalue) {
				if (newvalue == true) {
					viewmodel.prototype.moduleLoaded(false);
				}
			});
		};

		viewmodel.prototype.isLoading = ko.computed(function () {
			return !viewmodel.prototype.moduleLoaded() || router.isNavigating();
		});
		
		return viewmodel;
	});

