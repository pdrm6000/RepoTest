function Binder() {

    this.BindingUsed = '0';
    this.GetBindingFunction = GetBindFunctionToUse;
    this.BindAlbum = BindCurrentAlbum;
    function BindCurrentAlbum(album,albumsVM) {
        albumsVM.CurrentAlbum.CurrentAlbumName(album.AlbumName);
        albumsVM.CurrentAlbum.CurrentYear(album.Year);
        albumsVM.CurrentAlbum.CurrentArtistName(album.ArtistName);
        albumsVM.CurrentAlbum.CurrentComments(album.Comments);
        albumsVM.CurrentAlbum.CurrentImageUrl('../../Images/Covers/' + album.CoverUrl);
        albumsVM.IsLoading(false);
    }

    function BindNextAlbum(album, albumsVM) {
        albumsVM.NextAlbum.NextAlbumName(album.AlbumName);
        albumsVM.NextAlbum.NextYear(album.Year);
        albumsVM.NextAlbum.NextArtistName(album.ArtistName);
        albumsVM.NextAlbum.NextComments(album.Comments);
        albumsVM.NextAlbum.NextImageUrl('../../Images/Covers/' + album.CoverUrl);
        albumsVM.IsLoading(false);
    }

    function GetBindFunctionToUse() {
        if (this.BindingUsed == 0) {
            this.BindingUsed = 1;
            return BindNextAlbum;
        }
        else {
            this.BindingUsed = 0;
            return BindCurrentAlbum;
        }
    }
}



window.albumApp = window.albumApp || {};

window.albumApp.datacontext = (function (ko) {
    
    var myBinder = new Binder();
    var areControlsLocked;
    
    var datacontext = {
        getNextAlbum: getNextAlbum,
        getPreviousAlbum: getPreviousAlbum,
        init: Init,
        setAreControlsLocked: setAreControlsLocked,
    };
    return datacontext;


    function setAreControlsLocked(value) {
        areControlsLocked = value;
    }

    function getNextAlbum(albumsObservable) {
        TryDownload(DownloadNextAlbum);
    }

    function getPreviousAlbum(albumsObservable) {
        TryDownload(DownloadPreviousAlbum);
    }
   
    function TryDownload(downloadFunction) {
        if (!areControlsLocked) {
            areControlsLocked = true;
            downloadFunction();
        }
    }
    
    function DownloadNextAlbum() {
        var nextAlbum = DownloadAlbum('Next');
        nextAlbum.done(function (data) { ProcessNextAlbumDownloaded(data); });
    }

    function DownloadPreviousAlbum() {
        var nextAlbum = DownloadAlbum('Previous');
        nextAlbum.done(function (data) { ProcessPreviousAlbumDownloaded(data); });
    }

    function DownloadAlbum(action) {
        datacontext.Albums.IsLoading(true);
        return $.ajax({
            url: "../api/AlbumsRest/" + action,
            accepts: "application/json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    }

    function ProcessNextAlbumDownloaded(data) {
        if (data == null) {
            datacontext.Albums.IsLoading(false);
            window.albumApp.reviewAnimator.animationNoNextData();
        } else {
            var bindFunc = myBinder.GetBindingFunction();
            bindFunc(data, datacontext.Albums);
            window.albumApp.reviewAnimator.setLeftAnimation();
            window.albumApp.reviewAnimator.slideOutCurrentAlbum();
        }
    }

    function ProcessPreviousAlbumDownloaded(data) {
        if (data == null) {
            datacontext.Albums.IsLoading(false);
            window.albumApp.reviewAnimator.animationNoPreviousData();
        } else {
            var bindFunc = myBinder.GetBindingFunction();
            bindFunc(data, datacontext.Albums);
            window.albumApp.reviewAnimator.setRightAnimation();
            window.albumApp.reviewAnimator.slideOutCurrentAlbum();
        }
    }
   
    function Init() {
        myBinder = new Binder();
        window.albumApp.reviewAnimator.init();
        areControlsLocked = false;
        ko.applyBindings(window.albumApp.albumViewModel);
        var currentAlbum = DownloadAlbum('Next');
        currentAlbum.done(function (data) { myBinder.BindAlbum(data, datacontext.Albums); });
    }

})(ko);