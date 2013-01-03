window.albumApp.albumViewModel = (function (ko, datacontext) {
    var myBinder;
    var areControlsLocked;
    var albums = datacontext.Albums,
        nextAlbum = function () {
            tryDownload(datacontext.downloadNextAlbum).then(processNextAlbumDownloaded);
        },
        previousAlbum = function () {
            tryDownload(datacontext.downloadPreviousAlbum).then(processPreviousAlbumDownloaded);
        },
        init = function () {
            myBinder = new Binder();
            window.albumApp.reviewAnimator.init();
            areControlsLocked = false;
            ko.applyBindings(window.albumApp.albumViewModel);
            tryDownload(datacontext.downloadNextAlbum).then(function (data) {
                myBinder.BindAlbum(data, datacontext.Albums);
                areControlsLocked = false;
            });
        },
        processNextAlbumDownloaded = function (data) {
            if (data == null) {
                datacontext.Albums.IsLoading(false);
                window.albumApp.reviewAnimator.animationNoNextData();
            } else {
                var bindFunc = myBinder.GetBindingFunction();
                bindFunc(data, datacontext.Albums);
                window.albumApp.reviewAnimator.setLeftAnimation();
                window.albumApp.reviewAnimator.slideOutCurrentAlbum();
            }
        },
        processPreviousAlbumDownloaded = function (data) {
            if (data == null) {
                datacontext.Albums.IsLoading(false);
                window.albumApp.reviewAnimator.animationNoPreviousData();
            } else {
                var bindFunc = myBinder.GetBindingFunction();
                bindFunc(data, datacontext.Albums);
                window.albumApp.reviewAnimator.setRightAnimation();
                window.albumApp.reviewAnimator.slideOutCurrentAlbum();
            }
        },
        tryDownload = function (downloadFunction) {
            if (!areControlsLocked) {
                areControlsLocked = true;
                return downloadFunction();
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
        setAreControlsLocked : setAreControlsLocked
    };

})(ko, albumApp.datacontext);

