define("viewmodels/review/review",
	[
		'durandal/app',
		'knockout',
		'viewmodels/data/globalConfig',
		'viewmodels/data/datacontext',
		'viewmodels/review/animator',
	    'viewmodels/review/binder',
	    'viewmodels/review/viewswitcher'
	],
	function (app, ko, globalConfig, datacontext, animator, binder, viewswitcher) {

	    var viewmodel = function () {
	        var self = this;

	        self.model = ko.observableArray();
	        self.albumsCount = 4;
	        self.albumsLoaded = 0;

	        self.bindAlbums = function (data) {
	            viewswitcher.prototype.setCustomViewCollection(data.results);
	            binder.prototype.addToModel(self.model, data.results);
	            self.processComments();
	        };

	        self.processComments = function () {
	            var albumIds = self.getAlbumIds();
	            datacontext.getCommentsByAlbums(albumIds).then(self.bindComments);
	        };

	        self.bindComments = function (comments) {
	            binder.prototype.bindComments(self.model, comments);
	            self.processRates();
	        };

	        self.processRates = function () {
	            var albumIds = self.getAlbumIds();
	            datacontext.getRatesByAlbums(albumIds).then(self.bindRates);
	        };

	        self.bindRates = function (rates) {
	            binder.prototype.bindRates(self.model, rates);
	            globalConfig.prototype.moduleIsFullyLoaded();
	        };

	        self.getAlbumIds = function () {
	            var ids = [];
	            ko.utils.arrayForEach(self.model(), function (entity) {
	                ids.push(entity.album.Id());
	            });
	            return ids;
	        };

	        self.setCustomView = function () {
	            self.albumsLoaded = 0;
	            viewswitcher.prototype.setCustomView(self.model, self.getAlbumIds());
	        };

	        self.setMiniatureView = function () {
	            self.albumsLoaded = 0;
	            viewswitcher.prototype.setMiniatureView(self.model, self.getAlbumIds());
	        };

	        self.setLandscapeView = function () {
	            self.albumsLoaded = 0;
	            viewswitcher.prototype.setLandscapeView(self.model, self.getAlbumIds());
	        };

	        self.getNextAlbums = function () {
	            animator.prototype.hideAlbums(self.getAlbumIds(), self.findNextAlbums);
	        };

	        self.getPreviousAlbums = function () {
	        	animator.prototype.hideAlbums(self.getAlbumIds(), self.findPreviousAlbums);
	        };

	        self.findPreviousAlbums = function () {
	        	self.model.removeAll();
	        	self.albumsLoaded = 0;
	        	var prevAlbums = datacontext.getAlbumsForReviewLocal(self.albumsCount);
		        self.bindAlbums({results: prevAlbums});
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

	    viewmodel.prototype.activate = function(param) {
	        app.on('albumToReview:event').then(this.onAlbumLoaded);
	        return datacontext.getAlbumsForReview(this.albumsCount).then(this.bindAlbums);
	    };

	    return viewmodel;

	});