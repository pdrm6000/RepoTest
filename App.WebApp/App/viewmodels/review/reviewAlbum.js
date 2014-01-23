define("viewmodels/review/reviewAlbum",
	[
	],
	function () {

		var viewmodel = function () {
			var self = this;
			self.albumModel = null;
			self.isSelected = ko.observable(0);

			self.rateAlbum = function(param) {
				//TODO process rating
				console.log(param);
				self.isSelected(self.isSelected());
				return false;
			};

			self.rateHasChanged = function(newValue) {
				self.isSelected(Math.round(newValue));
			};

		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param;
			this.albumModel.rate.subscribe(this.rateHasChanged);
		};

		return viewmodel;

	});
