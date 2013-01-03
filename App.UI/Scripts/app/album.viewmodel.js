window.albumApp.albumViewModel = (function (ko, datacontext, albumBinder) {

    var myBinder = albumBinder;
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
            window.albumApp.reviewAnimator.init();
            areControlsLocked = false;
            ko.applyBindings(window.albumApp.albumViewModel);
            tryDownload(datacontext.downloadNextAlbum, function (data) {
                myBinder.bindCurrentAlbum(data, albums);
                areControlsLocked = false;
            });
        },
        processNextAlbumDownloaded = function (data) {
            if (data == null) {
                albums.IsLoading(false);
                window.albumApp.reviewAnimator.animationNoNextData();
            } else {
                var bindFunc = myBinder.getBindingFunction();
                bindFunc(data, albums);
                window.albumApp.reviewAnimator.setLeftAnimation();
                window.albumApp.reviewAnimator.slideOutCurrentAlbum();
            }
        },
        processPreviousAlbumDownloaded = function (data) {
            if (data == null) {
                albums.IsLoading(false);
                window.albumApp.reviewAnimator.animationNoPreviousData();
            } else {
                var bindFunc = myBinder.getBindingFunction();
                bindFunc(data, albums);
                window.albumApp.reviewAnimator.setRightAnimation();
                window.albumApp.reviewAnimator.slideOutCurrentAlbum();
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

})(ko, albumApp.datacontext, albumApp.albumBinder);

