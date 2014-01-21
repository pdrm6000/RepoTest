define("viewmodels/review/reviewAlbum",
	[
	],
	function () {

		var viewmodel = function () {
			var self = this;
			self.albumModel = null;

			self.rateAlbum = function(param) {
				//TODO process rating
			};
		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param;
		};

		return viewmodel;

	});
