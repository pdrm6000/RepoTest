define("viewmodels/albumsDirectory", ['viewmodels/albumsDirectory.model', 'viewmodels/datacontext'],
    function (artistsWithAlbums, datacontext) {

        var lastaddpopup;
        var vm =
            activate = function () {
                artistsWithAlbums.isLoading(true);
                return datacontext.downloadArtistsWithAlbums().then(processArtistsWithAlbums);
            },
            processArtistsWithAlbums = function (data) {
                artistsWithAlbums.artistCollection = ko.mapping.fromJS(data, mapAlbumsCollection);
                artistsWithAlbums.isLoading(false);
            },
            mapAlbumsCollection = {
                '': {
                    create: function (options) {
                        return new artistsWithAlbums.getNewArtistModel(options.data);
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
                var vmLocal = ko.mapping.fromJS(data, mapAlbum);
                artist.Albums.push(vmLocal);
                toastr.success('<h4>Completed</h4>Album added succesfully');
                toastr.clear(lastaddpopup);
            },
            removeAlbum = function (data) {
                data.isDeleting(true);
                data.cancelVisible(true);
                data.confirmVisible(true);
                data.removeVisible(false);
                data.addVisible(false);
            },
            confirmAlbumRemoving = function (data) {
                var dataFiltered = ko.utils.arrayFilter(data.Albums(), function (item) { return item.toDelete() == true; });
                var dataFlat = ko.utils.arrayMap(dataFiltered, function (item) { return item.Id(); });
                data.isDeleting(false);
                resetButtons(data);
                toastr.info('Deleting albums...');
                datacontext.deleteAlbums(dataFlat).then(processAlbumsDeleted(dataFiltered, data.Albums));
            },
            processAlbumsDeleted = function (data, array) {
                ko.utils.arrayForEach(data, function (item) {
                    ko.utils.arrayRemoveItem(array, item);
                });
                toastr.success('<h4>Completed</h4>Albums deleted succesfully');
            },
            cancelAlbumRemoving = function (data) {

                data.isDeleting(false);
                resetButtons(data);
            },
            resetButtons = function (data) {
                data.cancelVisible(false);
                data.confirmVisible(false);
                data.removeVisible(true);
                data.addVisible(true);
            };

        var self = {
            artistsWithAlbums: artistsWithAlbums,
            activate: activate,
            addAlbum: addAlbum,
            finishAlbumAdding: finishAlbumAdding,
            removeAlbum: removeAlbum,
            confirmAlbumRemoving: confirmAlbumRemoving,
            cancelAlbumRemoving: cancelAlbumRemoving
        };
        return self;

    });
