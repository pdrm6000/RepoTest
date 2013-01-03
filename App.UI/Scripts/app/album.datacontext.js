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

    var datacontext = {
        downloadNextAlbum: downloadNextAlbum,
        downloadPreviousAlbum: downloadPreviousAlbum,
    };
    return datacontext;

    function downloadNextAlbum() {
        var nextAlbum = downloadAlbum('Next');
        return nextAlbum.done();
    }

    function downloadPreviousAlbum() {
        var previousAlbum = downloadAlbum('Previous');
        return previousAlbum.done();
    }

    function downloadAlbum(action) {
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



})(ko);