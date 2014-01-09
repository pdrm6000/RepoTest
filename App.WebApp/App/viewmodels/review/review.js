define("viewmodels/review/review",
	[
		'viewmodels/albums/albumsDirectory.model',
		'viewmodels/data/datacontext',
		'knockout'
	],
	function (albumsModel, datacontext, ko) {

		var viewmodel = function () {
			var self = this;

			self.albums = ko.observableArray();
			self.bindAlbums = function (data) {
				self.albums(data.results);
				self.setCustomView();
			};
			
			self.setCustomView = function() {
				self.albums()[0].AlbumView('views/review/reviewAlbumLarge.html');
				self.albums()[1].AlbumView('views/review/reviewAlbumMinuature.html');
				self.albums()[2].AlbumView('views/review/reviewAlbumMinuature.html');
				self.albums()[3].AlbumView('views/review/reviewAlbumLandscape.html');
			};

			self.setMiniatureView = function() {
				ko.utils.arrayForEach(self.albums(), function (entity) {
					entity.AlbumView('views/review/reviewAlbumMinuature.html');
				});
			};

			self.setLandscapeView = function() {
				ko.utils.arrayForEach(self.albums(), function (entity) {
					entity.AlbumView('views/review/reviewAlbumLandscape.html');
				});
			};
		};

		viewmodel.prototype.activate = function (param) {
			albumsModel.init(datacontext.albumsMetadataStore);
			datacontext.getAlbumsForReview(4).then(this.bindAlbums);
		};
		
		return viewmodel;
		
	});