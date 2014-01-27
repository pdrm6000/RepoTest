define("viewmodels/review/reviewAlbum",
	[
	    'viewmodels/data/datacontext'
	],
	function (datacontext) {

		var viewmodel = function () {
			var self = this;
			self.albumModel = null;
			self.isSelected = ko.observable(0);
		    self.lastPopup = null;

			self.rateAlbum = function (param) {
			    self.lastPopup = toastr.info('Rating album...');
			    var newRate = datacontext.createRate();
			    newRate.Value(param);
			    newRate.Date(Date.now());
			    newRate.AlbumId(self.albumModel.album.Id());
			    newRate.UserId('anonymous');
			    datacontext.addRate(newRate);
			    datacontext.saveRates().then(self.notifyRatePerformed);
			};

		    self.notifyRatePerformed = function() {
		        toastr.success('<img src=' + self.albumModel.album.FullCoverUrl()+ ' width=50 height=50 /> Rate saved succesfully');
		        toastr.clear(self.lastPopup);
		    };

			self.rateHasChanged = function(newValue) {
			    self.isSelected(Math.round(newValue));
			    self.isSelected.subscribe(self.rateAlbum);
			};

		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param;
			this.albumModel.rate.subscribe(this.rateHasChanged);
		    
		};

		return viewmodel;

	});
