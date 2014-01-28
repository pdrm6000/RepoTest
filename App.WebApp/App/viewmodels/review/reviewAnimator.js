define("viewmodels/review/reviewAnimator",
	[
	    'jquery',
	],
	function ($) {

	    var viewmodel = function () {
	        var self = this;
	    };

	    viewmodel.prototype.showAlbums = function (albumIds) {
	        $.each(albumIds, function (key, value) {
	            $('#album' + value).delay(key * 100).fadeIn({ duration: 300 });
	        });
	    };

	    viewmodel.prototype.hideAlbums = function (albumIds, callback) {
	        $.each(albumIds, function (key, value) {
	            var options = null;
	            if (albumIds.length - 1 == key) {
	                options = { duration: 300, complete: callback };
	            } else {
	                options = { duration: 300 };
	            }
	            $('#album' + value).delay(key * 100).fadeOut(options);
	        });
	    };


	    return viewmodel;

	});
