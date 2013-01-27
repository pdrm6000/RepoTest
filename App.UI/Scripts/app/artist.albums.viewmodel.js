window.albumApp.artistWithAlbumsViewModel = (function (ko, datacontext) {


    var artistsWithAlbums = datacontext.artistWithAlbums,
        init = function () {
            ko.applyBindings(window.albumApp.artistWithAlbumsViewModel, document.getElementById("AlbumsConfig"));
            artistsWithAlbums.isLoading(true);
            datacontext.downloadArtistsWithAlbums().then(processArtistsWithAlbums);
        },
        processArtistsWithAlbums = function (data) {
            ko.utils.arrayPushAll(artistsWithAlbums.artistCollection, data);
            artistsWithAlbums.isLoading(false);
        };

    return {
        artistsWithAlbums: artistsWithAlbums,
        init: init,
    };

})(ko, albumApp.datacontext);

