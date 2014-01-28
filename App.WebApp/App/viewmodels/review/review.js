define("viewmodels/review/review",
	[
		'viewmodels/albums/albumsDirectory.model',
		'viewmodels/data/datacontext',
		'knockout',
		'durandal/app',
	    'jquery',
		'viewmodels/review/reviewAnimator',
	],
	function (albumsModel, datacontext, ko, app, $, animator) {

	    var viewmodel = function () {
	        var self = this;

	        self.model = ko.observableArray();
	        self.albumsCount = 4;
	        self.albumsLoaded = 0;

	        self.addToModel = function (albums) {
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
	            self.showAlbumView();
	        };

	        self.setMiniatureView = function () {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                entity.album.AlbumView('views/review/reviewAlbumMinuature.html');
	            });
	            self.showAlbumView();
	        };

	        self.setLandscapeView = function () {
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                entity.album.AlbumView('views/review/reviewAlbumLandscape.html');
	            });
	            self.showAlbumView();
	        };

	        self.showAlbumView = function() {
	            var ids = self.getAlbumIds();
	            ko.utils.arrayForEach(ids, function (entity) {
	                $('#album' + entity).show();
	            });
	        };

	        self.getNextAlbums = function () {
	            animator.prototype.hideAlbums(self.getAlbumIds(), self.findNextAlbums);
	        };

	        self.getPreviousAlbums = function () {

	        };

	        self.findNextAlbums = function () {
	            self.model.removeAll();
	            self.albumsLoaded = 0;
	            datacontext.getAlbumsForReview(self.albumsCount).then(self.bindAlbums);
	        };

	        self.onAlbumLoaded = function (albumId) {
	            self.albumsLoaded++;
	            if (self.albumsLoaded == self.albumsCount) {
	                //now we have all albums ready to render
	                animator.prototype.showAlbums(self.getAlbumIds());
	            }
	        };
	    };

	    viewmodel.prototype.activate = function (param) {
	        app.on('albumToReview:event').then(this.onAlbumLoaded);
	        datacontext.getAlbumsForReview(this.albumsCount).then(this.bindAlbums);
	    };

	    return viewmodel;

	});