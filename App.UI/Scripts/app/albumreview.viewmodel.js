window.albumApp.albumReviewViewModel = (function (ko, datacontext, albumReviewBinder, albumReviewAnimator) {

    var myBinder = albumReviewBinder;
    var myReviewAnimator = albumReviewAnimator;
    var areControlsLocked;
    var albums = datacontext.Albums,
        nextAlbum = function () {
            tryDownload(datacontext.downloadNextAlbum, processNextAlbumDownloaded);
        },
        previousAlbum = function () {
            tryDownload(datacontext.downloadPreviousAlbum, processPreviousAlbumDownloaded);
        },
        init = function () {
            myBinder.init();
            myReviewAnimator.init();
            areControlsLocked = false;
            ko.applyBindings(window.albumApp.albumReviewViewModel);
            tryDownload(datacontext.downloadNextAlbum, function (data) {
                myBinder.bindCurrentAlbum(data, albums);
                areControlsLocked = false;
            });
        },
        processNextAlbumDownloaded = function (data) {
            if (data == null) {
                albums.IsLoading(false);
                myReviewAnimator.animationNoNextData();
            } else {
                var bindFunc = myBinder.getBindingFunction();
                bindFunc(data, albums);
                myReviewAnimator.setLeftAnimation();
                myReviewAnimator.slideOutCurrentAlbum();
            }
        },
        processPreviousAlbumDownloaded = function (data) {
            if (data == null) {
                albums.IsLoading(false);
                myReviewAnimator.animationNoPreviousData();
            } else {
                var bindFunc = myBinder.getBindingFunction();
                bindFunc(data, albums);
                myReviewAnimator.setRightAnimation();
                myReviewAnimator.slideOutCurrentAlbum();
            }
        },
        tryDownload = function (downloadFunction, callbackFunction) {
            if (!areControlsLocked) {
                areControlsLocked = true;
                downloadFunction().then(callbackFunction);
            }
        },
        setAreControlsLocked = function (value) {
            areControlsLocked = value;
        };

    return {
        albums: albums,
        nextAlbum: nextAlbum,
        previousAlbum: previousAlbum,
        init: init,
        setAreControlsLocked: setAreControlsLocked
    };

})(ko, albumApp.datacontext, albumApp.albumReviewBinder, albumApp.albumReviewAnimator);

