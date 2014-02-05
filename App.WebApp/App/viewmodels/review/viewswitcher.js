define("viewmodels/review/viewswitcher",
	[
	    'durandal/app',
        'knockout',
	    'viewmodels/review/animator'
	],
	function (app, ko, animator) {

	    var viewswitcher = (function () {

	        function viewswitcher() {
	        }
	        
	        var setAlbumView = function (album, albumView) {
	            if (album.AlbumView() == albumView) {
	                app.trigger('albumToReview:event', album.Id()); // no changes needed
	            } else {
	                album.AlbumView(albumView);
	            }
	        };
	        
	        var setCustomViewCollection = function (albums) {
	            setAlbumView(albums[0], 'views/review/reviewAlbumLarge.html');
	            setAlbumView(albums[1], 'views/review/reviewAlbumMinuature.html');
	            setAlbumView(albums[2], 'views/review/reviewAlbumMinuature.html');
	            setAlbumView(albums[3], 'views/review/reviewAlbumLandscape.html');
	        };

	        viewswitcher.prototype.setCustomViewCollection = setCustomViewCollection;

	        viewswitcher.prototype.setCustomView = function (model, albumIds) {
	            animator.prototype.hideAlbums(albumIds, function () {
	                var albums = [];
	                ko.utils.arrayForEach(model(), function (entity) {
	                    albums.push(entity.album);
	                });
	                setCustomViewCollection(albums);
	            });
	        };

	        viewswitcher.prototype.setMiniatureView = function (model, albumIds) {
	            animator.prototype.hideAlbums(albumIds, function () {
	                ko.utils.arrayForEach(model(), function (entity) {
	                    setAlbumView(entity.album, 'views/review/reviewAlbumMinuature.html');
	                });
	            });
	        };

	        viewswitcher.prototype.setLandscapeView = function (model, albumIds) {
	            animator.prototype.hideAlbums(albumIds, function() {
	                ko.utils.arrayForEach(model(), function(entity) {
	                    setAlbumView(entity.album, 'views/review/reviewAlbumLandscape.html');
	                });
	            });
	        };
	        
	        return viewswitcher;
	    })();

	    return viewswitcher;

	});
