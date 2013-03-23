
define("viewmodels/albumsReview", ['viewmodels/datacontext', 'viewmodels/albumsReview.binding', 'viewmodels/albumsReview.animation', 'viewmodels/albumsReview.model'],
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
                return datacontext.downloadNextAlbum().then(function(data) {
                    myBinder.bindCurrentAlbum(data, albumreviewModel);
                    myReviewAnimator.setAreControlsLocked(false);
                });
            },
            processNextAlbumDownloaded = function (data) {
                if (data == null) {
                    albumreviewModel.IsLoading(false);
                    myReviewAnimator.animationNoNextData();
                } else {
                    var bindFunc = myBinder.getBindingFunction();
                    bindFunc(data, albumreviewModel);
                    myReviewAnimator.setLeftAnimation();
                    myReviewAnimator.slideOutCurrentAlbum();
                }
            },
            processPreviousAlbumDownloaded = function (data) {
                if (data == null) {
                    albumreviewModel.IsLoading(false);
                    myReviewAnimator.animationNoPreviousData();
                } else {
                    var bindFunc = myBinder.getBindingFunction();
                    bindFunc(data, albumreviewModel);
                    myReviewAnimator.setRightAnimation();
                    myReviewAnimator.slideOutCurrentAlbum();
                }
            },
            tryDownload = function (downloadFunction, callbackFunction) {
                if (!myReviewAnimator.areControlsLocked()) {
                    myReviewAnimator.setAreControlsLocked(true);
                    downloadFunction().then(callbackFunction);
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

