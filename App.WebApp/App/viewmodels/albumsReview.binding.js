define("viewmodels/albumsReview.binding", [],
    function () {

        var bindingUsed = 0;

        init = function () {
            bindingUsed = 0;
        },
        getBindingFunction = function () {
            if (bindingUsed == 0) {
                bindingUsed = 1;
                return bindNextAlbum;
            } else {
                bindingUsed = 0;
                return bindCurrentAlbum;
            }
        },
        bindCurrentAlbum = function (album, albumsVM) {
            albumsVM.CurrentAlbum.CurrentAlbumName(album.AlbumName);
            albumsVM.CurrentAlbum.CurrentYear(album.Year);
            albumsVM.CurrentAlbum.CurrentArtistName(album.ArtistName);
            albumsVM.CurrentAlbum.CurrentComments(album.Comments);
            albumsVM.CurrentAlbum.CurrentImageUrl('./Images/Covers/' + album.CoverUrl);
            albumsVM.IsLoading(false);
        },
        bindNextAlbum = function (album, albumsVM) {
            albumsVM.NextAlbum.NextAlbumName(album.AlbumName);
            albumsVM.NextAlbum.NextYear(album.Year);
            albumsVM.NextAlbum.NextArtistName(album.ArtistName);
            albumsVM.NextAlbum.NextComments(album.Comments);
            albumsVM.NextAlbum.NextImageUrl('./Images/Covers/' + album.CoverUrl);
            albumsVM.IsLoading(false);
        };

        return {
            getBindingFunction: getBindingFunction,
            bindCurrentAlbum: bindCurrentAlbum,
            bindNextAlbum: bindNextAlbum,
            init: init,
        };
    });
