define("viewmodels/review/reviewAnimator",
	[
	    'jquery',
	],
	function ($) {

		var viewmodel = function () {
			var self = this;
		};

		viewmodel.prototype.showAlbums = function (albumIds) {
			$("#Albums").show();
			$.each(albumIds, function(key, value) {
				$('album' + value).delay(key * 500).fadeIn({ duration: 500 });
			});
		};
		
		viewmodel.prototype.hideAlbums = function (albumIds) {
			$("#Albums").hide();
		};


		return viewmodel;

	});
