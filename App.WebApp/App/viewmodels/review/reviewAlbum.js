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

		    self.isSelected = function(value) {
		        return ko.computed(function() {
		            return self.albumModel.Value().toFixed(2) == value;
		        });
		    };
		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param;
		};

		return viewmodel;

	});
