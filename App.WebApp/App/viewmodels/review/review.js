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
				self.setCustomViewCollection(data.results);
				self.albums(data.results);
			    self.processComments();
			};

		    self.processComments = function() {
		        var albumIds = self.getAlbumIds();
		        datacontext.getCommentsByAlbums(albumIds).then(self.bindComments);
		    };

		    self.bindComments = function(comments) {
		        console.log(comments);
		    };

		    self.getAlbumIds = function() {
		        var ids = [];
		        ko.utils.arrayForEach(self.albums(), function (entity) {
		            ids.push(entity.Id());
		        });
		        return [71,67];
		    };

			self.setCustomViewCollection = function(albums) {
				albums[0].AlbumView('views/review/reviewAlbumLarge.html');
				albums[1].AlbumView('views/review/reviewAlbumMinuature.html');
				albums[2].AlbumView('views/review/reviewAlbumMinuature.html');
				albums[3].AlbumView('views/review/reviewAlbumLandscape.html');
			};
			
			self.setCustomView = function() {
				self.setCustomViewCollection(self.albums());
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
			datacontext.getAlbumsForReview(4).then(this.bindAlbums);
		};
		
		return viewmodel;
		
	});