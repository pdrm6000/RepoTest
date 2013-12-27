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
			};
		};

		viewmodel.prototype.activate = function (param) {
			albumsModel.init(datacontext.albumsMetadataStore);
			datacontext.getAlbumsForReview(5).then(this.bindAlbums);
		};
		
		return viewmodel;
		
	});