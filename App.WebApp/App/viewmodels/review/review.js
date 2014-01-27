define("viewmodels/review/review",
	[
		'viewmodels/albums/albumsDirectory.model',
		'viewmodels/data/datacontext',
		'knockout'
	],
	function (albumsModel, datacontext, ko) {

	    var viewmodel = function () {
	        var self = this;

	        self.model = ko.observableArray();

	        self.addToModel = function(albums) {
	            ko.utils.arrayForEach(albums, function (entity) {
	                self.model.push({
	                    album: entity,
	                    comments: ko.observableArray(),
	                    rate: ko.observable(0),
	                });
	            });
	        };

	        self.bindAlbums = function (data) {
	            self.setCustomViewCollection(data.results);
	            self.addToModel(data.results);
	            self.processComments();
	        };

	        self.processComments = function () {
	            var albumIds = self.getAlbumIds();
	            datacontext.getCommentsByAlbums(albumIds).then(self.bindComments);
	        };

	        self.bindComments = function (comments) {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                if (comments && comments.results && comments.results[0][entity.album.Id()]) {
	                    entity.comments(comments.results[0][entity.album.Id()]);
	                }
	            });
	            self.processRates();
	        };

	        self.processRates = function () {
	            var albumIds = self.getAlbumIds();
	            datacontext.getRatesByAlbums(albumIds).then(self.bindRates);
	        };

	        self.bindRates = function (rates) {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                if (rates && rates.results && rates.results[0][entity.album.Id()]) {
	                    entity.rate(rates.results[0][entity.album.Id()].toFixed(1));
	                }
	            });
	        };

	        self.getAlbumIds = function () {
	            var ids = [];
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                ids.push(entity.album.Id());
	            });
	            return ids;
	        };

	        self.setCustomViewCollection = function (albums) {
	            albums[0].AlbumView('views/review/reviewAlbumLarge.html');
	            albums[1].AlbumView('views/review/reviewAlbumMinuature.html');
	            albums[2].AlbumView('views/review/reviewAlbumMinuature.html');
	            albums[3].AlbumView('views/review/reviewAlbumLandscape.html');
	        };

	        self.setCustomView = function () {
	            var albums = [];
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                albums.push(entity.album);
	            });
	            self.setCustomViewCollection(albums);
	        };

	        self.setMiniatureView = function () {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                entity.album.AlbumView('views/review/reviewAlbumMinuature.html');
	            });
	        };

	        self.setLandscapeView = function () {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                entity.album.AlbumView('views/review/reviewAlbumLandscape.html');
	            });
	        };

	        self.getNextAlbums = function () {
	            self.fadeOutCurrentAlbums();
	            datacontext.getAlbumsForReview(4).then(this.bindAlbums);
	        };

	        self.getPreviousAlbums = function() {

	        };

	        self.fadeOutCurrentAlbums = function() {
	            self.model.removeAll();
	        };
	    };

	    viewmodel.prototype.activate = function (param) {
	        datacontext.getAlbumsForReview(4).then(this.bindAlbums);
	    };

	    return viewmodel;

	});