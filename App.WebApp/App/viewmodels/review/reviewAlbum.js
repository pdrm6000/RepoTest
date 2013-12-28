define("viewmodels/review/reviewAlbum",
	[
		'viewmodels/data/datacontext'
	],
	function (datacontext) {

		var viewmodel = function () {
			var self = this;
			self.albumModel = null;
		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param;
		};

		return viewmodel;

	});
