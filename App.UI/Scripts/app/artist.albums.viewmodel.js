define("app/artist.albums.viewmodel", ['jquery', 'knockout', 'knockout.mapping','bootstrap', 'app/artist.albums.model', 'app/datacontext'],
    function ($, ko, koMapping, bootstrap, artistsWithAlbums, datacontext) {

        var lastaddpopup;
        var vm =
            init = function () {
                artistsWithAlbums.isLoading(true);
                datacontext.downloadArtistsWithAlbums().then(processArtistsWithAlbums);
            },
            processArtistsWithAlbums = function (data) {
                artistsWithAlbums.artistCollection = koMapping.fromJS(data, mapAlbumsCollection);
                ko.applyBindings(self, document.getElementById("AlbumsConfig"));
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
                var vmLocal = koMapping.fromJS(data, mapAlbum);
                artist.Albums.push(vmLocal);
                toastr.success('<h4>Completed</h4>Album added succesfully');
                toastr.clear(lastaddpopup);
            },
            removeAlbum = function (data) {
                data.isDeleting(true);
            };

        var self = {
            artistsWithAlbums: artistsWithAlbums,
            init: init,
            addAlbum: addAlbum,
            finishAlbumAdding: finishAlbumAdding,
            removeAlbum: removeAlbum
        };
        return self;

    });

