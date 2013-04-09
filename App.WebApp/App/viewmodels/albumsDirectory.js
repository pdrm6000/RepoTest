define("viewmodels/albumsDirectory", ['viewmodels/albumsDirectory.model', 'viewmodels/datacontext'],
    function (artistsWithAlbums, datacontext) {

        var lastaddpopup;
        var editedAlbum;
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
            editAlbum = function (data) {
                editedAlbum = data;
                artistsWithAlbums.selectedAlbum.id(data.Id());
                artistsWithAlbums.selectedAlbum.name(data.AlbumName());
                artistsWithAlbums.selectedAlbum.year(data.Year());
                artistsWithAlbums.selectedAlbum.coverUrl(data.CoverUrl());
                artistsWithAlbums.selectedAlbum.artistId(data.ArtistId());
                $('#editDialog').modal('show');
            },
            finishAlbumEditing = function (data) {
                lastaddpopup = toastr.info('Saving album...');
                datacontext.updateAlbum(artistsWithAlbums.selectedAlbum.getAlbumDTO()).then(notifyAlbumEdited);
            },
            notifyAlbumEdited = function () {
                var artist = ko.utils.arrayFirst(artistsWithAlbums.artistCollection(), function (item) {
                    return item.Id() == editedAlbum.ArtistId();
                });
                var replacedAlbum = artistsWithAlbums.getNewAlbumModel({
                    Id: editedAlbum.Id,
                    AlbumName: artistsWithAlbums.selectedAlbum.name(),
                    Year: artistsWithAlbums.selectedAlbum.year(),
                    CoverUrl: artistsWithAlbums.selectedAlbum.coverUrl(),
                    ArtistId: artistsWithAlbums.selectedAlbum.artistId(),
                });
                var index = artist.Albums.indexOf(editedAlbum);
                artist.Albums.replace(artist.Albums()[index], replacedAlbum);
                toastr.success('<h4>Completed</h4>Album saved succesfully');
                toastr.clear(lastaddpopup);
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
                    array.remove(item);
                    //ko.utils.arrayRemoveItem(array, item);
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
            },
            viewAttached = function (view) {
                //$(".albumImg").hover(function () {
                //    $(this).animate({ boxShadow : '0 1px 20px rgba(0, 0, 0, 0.5)' }, 100);
                //}, function () {
                //    $(this).animate({ boxShadow : '0 1px 3px rgba(0, 0, 0, 0.1)' }, 100);
                //});
            };

        var self = {
            artistsWithAlbums: artistsWithAlbums,
            activate: activate,
            addAlbum: addAlbum,
            finishAlbumAdding: finishAlbumAdding,
            removeAlbum: removeAlbum,
            confirmAlbumRemoving: confirmAlbumRemoving,
            cancelAlbumRemoving: cancelAlbumRemoving,
            editAlbum: editAlbum,
            finishAlbumEditing: finishAlbumEditing,
            viewAttached: viewAttached,
        };
        return self;

    });
