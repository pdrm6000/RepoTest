
define("viewmodels/review/albumsReview",
	[
		'viewmodels/data/datacontext',
		'viewmodels/review/albumsReview.binding',
		'viewmodels/review/albumsReview.animation',
		'viewmodels/review/albumsReview.model'
	],

	function (datacontext, albumReviewBinder, albumReviewAnimator, albumreviewModel) {

		var myBinder = albumReviewBinder;
		var myReviewAnimator = albumReviewAnimator;
		var vm =
			nextAlbum = function () {
				albumreviewModel.IsLoading(true);
				tryDownload(datacontext.downloadNextAlbum, processNextAlbumDownloaded);
			},
			previousAlbum = function () {
				albumreviewModel.IsLoading(true);
				tryDownload(datacontext.downloadPreviousAlbum, processPreviousAlbumDownloaded);
			},
			activate = function () {
				myBinder.init();
				myReviewAnimator.init();
				albumreviewModel.IsLoading(true);
				myReviewAnimator.setAreControlsLocked(true);
				return datacontext.downloadNextAlbum().then(function (data) {
					myBinder.bindCurrentAlbum(data.results[0], albumreviewModel);
					myReviewAnimator.setAreControlsLocked(false);
				});
			},
			processNextAlbumDownloaded = function (data) {
				var bindFunc = myBinder.getBindingFunction();
				bindFunc(data.results[0], albumreviewModel);
				myReviewAnimator.setLeftAnimation();
				myReviewAnimator.slideOutCurrentAlbum();
			},
			processPreviousAlbumDownloaded = function (data) {
				var bindFunc = myBinder.getBindingFunction();
				bindFunc(data.results[0], albumreviewModel);
				myReviewAnimator.setRightAnimation();
				myReviewAnimator.slideOutCurrentAlbum();
			},
			queryFailed = function (data) {
				albumreviewModel.IsLoading(false);
				myReviewAnimator.animationNoPreviousData();
			},
			tryDownload = function (downloadFunction, callbackFunction) {
				if (!myReviewAnimator.areControlsLocked()) {
					myReviewAnimator.setAreControlsLocked(true);
					downloadFunction().then(callbackFunction).fail(queryFailed);
				} else {
					albumreviewModel.IsLoading(false);
				}
			};

		var self = {
			albums: albumreviewModel,
			nextAlbum: nextAlbum,
			previousAlbum: previousAlbum,
			activate: activate,
		};
		return self;
	});

