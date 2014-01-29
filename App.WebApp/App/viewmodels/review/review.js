define("viewmodels/review/review",
	[
		'durandal/app',
		'knockout',
		'jquery',
		'viewmodels/data/datacontext',
		'viewmodels/review/reviewAnimator',
	],
	function (app, ko, $, datacontext, animator) {

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
				self.setAlbumView(albums[0], 'views/review/reviewAlbumLarge.html');
				self.setAlbumView(albums[1], 'views/review/reviewAlbumMinuature.html');
				self.setAlbumView(albums[2], 'views/review/reviewAlbumMinuature.html');
				self.setAlbumView(albums[3], 'views/review/reviewAlbumLandscape.html');
			};

			self.setCustomView = function () {
				self.albumsLoaded = 0;
				animator.prototype.hideAlbums(self.getAlbumIds(), function () {
					var albums = [];
					ko.utils.arrayForEach(self.model(), function (entity) {
						albums.push(entity.album);
					});
					self.setCustomViewCollection(albums);
				});
			};

			self.setMiniatureView = function () {
				self.albumsLoaded = 0;
				animator.prototype.hideAlbums(self.getAlbumIds(), function() {
					ko.utils.arrayForEach(self.model(), function (entity) {
						self.setAlbumView(entity.album, 'views/review/reviewAlbumMinuature.html');
					});
				});
			};

			self.setLandscapeView = function () {
				self.albumsLoaded = 0;
				animator.prototype.hideAlbums(self.getAlbumIds(),function() {
					ko.utils.arrayForEach(self.model(), function (entity) {
						self.setAlbumView(entity.album, 'views/review/reviewAlbumLandscape.html');
					});
				});
			};

			self.setAlbumView = function (album, albumView) {
				if (album.AlbumView() == albumView) {
					self.albumsLoaded++; // no changes needed
				} else {
					album.AlbumView(albumView);
				}
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

		viewmodel.prototype.compositionComplete = function (param) {
			console.log(param);
		};

		return viewmodel;

	});