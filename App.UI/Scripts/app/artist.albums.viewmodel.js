window.albumApp.artistWithAlbumsViewModel = (function (ko, datacontext) {

    var lastaddpopup;
    var artistsWithAlbums = datacontext.artistWithAlbums,
        init = function () {
            artistsWithAlbums.isLoading(true);
            datacontext.downloadArtistsWithAlbums().then(processArtistsWithAlbums);
        },
        processArtistsWithAlbums = function (data) {
            artistsWithAlbums.artistCollection = ko.mapping.fromJS(data, mapAlbumsCollection);
            ko.applyBindings(window.albumApp.artistWithAlbumsViewModel, document.getElementById("AlbumsConfig"));
            artistsWithAlbums.isLoading(false);
        },
        mapAlbumsCollection = {
            'Albums': {
                create: function (options) {
                    return new artistsWithAlbums.getNewAlbumModel(options.data);
                }
            }
        },
        mapAlbum = {
            '': {
                create: function (options) {
                    return new artistsWithAlbums.getNewAlbumModel(options.data);
                }
            }
        },
        addAlbum = function (data) {
            var currentTime = new Date();
            artistsWithAlbums.selectedAlbum.id(0);
            artistsWithAlbums.selectedAlbum.name('');
            artistsWithAlbums.selectedAlbum.year(currentTime.getFullYear());
            artistsWithAlbums.selectedAlbum.coverUrl('');
            artistsWithAlbums.selectedAlbum.artistName(data.Name());
            artistsWithAlbums.selectedAlbum.artistId(data.Id());
            $('#addDialog').modal('show');
        },
        finishAlbumAdding = function () {
            lastaddpopup = toastr.info('Adding album...');
            datacontext.addAlbum(artistsWithAlbums.selectedAlbum.getAlbumDTO()).then(notifyAlbumAdded);
        },
        notifyAlbumAdded = function (data) {
            var artist = ko.utils.arrayFirst(artistsWithAlbums.artistCollection(), function (item) {
                return data.ArtistId === item.Id();
            });
            var vm = ko.mapping.fromJS(data, mapAlbum);
            artist.Albums.push(vm);
            toastr.success('<h4>Completed</h4>Album added succesfully');
            toastr.clear(lastaddpopup);
        };

    return {
        artistsWithAlbums: artistsWithAlbums,
        init: init,
        addAlbum: addAlbum,
        finishAlbumAdding: finishAlbumAdding,
    };

})(ko, albumApp.datacontext);

