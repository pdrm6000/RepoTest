define("viewmodels/review/reviewAlbum",
	[
		'knockout'
	],
	function (ko) {

		var viewmodel = function () {
			var self = this;
			self.albumModel = null;
		};

		viewmodel.prototype.activate = function (param) {
		    this.albumModel = param;
		};

		return viewmodel;

	});
