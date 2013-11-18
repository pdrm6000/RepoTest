define("viewmodels/albumsDirectory", ['viewmodels/albumsDirectory.model', 'viewmodels/datacontext', 'viewmodels/editAlbumModal', "viewmodels/addAlbumModal"],
    function (albumsModel, datacontext, editAlbumModal, addAlbumModal) {

        var lastaddpopup;
        var viewmodel = {
            artistsWithAlbums: albumsModel,
            activate: function () {
                albumsModel.init(datacontext.albumsMetadataStore);
                return datacontext.downloadArtistsWithAlbums().then(viewmodel.processArtistsWithAlbums);
            },
            processArtistsWithAlbums: function (data) {
                var previousArtistId = 0;
                $.each(data.results, function (index, album) {
                    if (album.ArtistId() != previousArtistId) {
                        albumsModel.artistCollection.push({
                            Name: ko.observable(album.ArtistName()),
                            Id: album.ArtistId(),
                            Albums: ko.observableArray(),
                            removeVisible: ko.observable(true),
                            addVisible: ko.observable(true),
                            cancelVisible: ko.observable(false),
                            confirmVisible: ko.observable(false),
                        	isDeleting : ko.observable(false),
                        });
                        previousArtistId = album.ArtistId();
                    }
                    $(albumsModel.artistCollection()).last()[0].Albums().push(album);
                });
            },
            addAlbum: function (data) {
                albumsModel.selectedArtist = data;
                addAlbumModal.show(data.Id, data.Name()).then(viewmodel.finishAlbumAdding);
            },
            finishAlbumAdding: function (albumAdded) {
                if (albumAdded) {
                    lastaddpopup = toastr.info('Adding album...');
                    albumsModel.newAlbum = albumAdded; // keep a reference
                    datacontext.addAlbum(albumAdded);
                    datacontext.saveAlbums().then(viewmodel.notifyAlbumAdded);
                }
            },
            notifyAlbumAdded: function (data) {
                albumsModel.selectedArtist.Albums.push(albumsModel.newAlbum); // use the reference changed
                albumsModel.newAlbum.entityAspect.setUnchanged(); //TODO (investigate): I don't know why i have to do this, it is like after added the change is not reflected on client collection
                toastr.success('<h4>Completed</h4>Album added succesfully');
                toastr.clear(lastaddpopup);
            },
            removeAlbum: function(data) {
                data.isDeleting(true);
                data.cancelVisible(true);
                data.confirmVisible(true);
                data.removeVisible(false);
                data.addVisible(false);
            },
            editAlbum: function (data) {
                editAlbumModal.show(data).then(viewmodel.finishAlbumEditing);
            },
            finishAlbumEditing: function (data) {
                if (data) {
                    lastaddpopup = toastr.info('Saving album...');
                    datacontext.saveAlbums().then(viewmodel.notifyAlbumEdited);
                }
            },
            notifyAlbumEdited: function() {
                toastr.success('<h4>Completed</h4>Album saved succesfully');
                toastr.clear(lastaddpopup);
            },
            confirmAlbumRemoving: function(data) {
                var dataFiltered = ko.utils.arrayFilter(data.Albums(), function(item) { return item.toDelete() == true; });
                data.isDeleting(false);
                resetButtons(data);
                toastr.info('Deleting albums...');
                datacontext.saveAlbums().then(processAlbumsDeleted(dataFiltered, data.Albums));
            },
            processAlbumsDeleted: function(data, array) {
                ko.utils.arrayForEach(data, function(item) {
                    array.remove(item);
                    //ko.utils.arrayRemoveItem(array, item);
                });
                toastr.success('<h4>Completed</h4>Albums deleted succesfully');
            },
            cancelAlbumRemoving: function(data) {

                data.isDeleting(false);
                resetButtons(data);
            },
            resetButtons: function(data) {
                data.cancelVisible(false);
                data.confirmVisible(false);
                data.removeVisible(true);
                data.addVisible(true);
            },
            viewAttached: function(view) {
                //$(".albumImg").hover(function () {
                //    $(this).animate({ boxShadow : '0 1px 20px rgba(0, 0, 0, 0.5)' }, 100);
                //}, function () {
                //    $(this).animate({ boxShadow : '0 1px 3px rgba(0, 0, 0, 0.1)' }, 100);
                //});
            }
        };

        return  {
            artistsWithAlbums: viewmodel.artistsWithAlbums,
            activate: viewmodel.activate,
            addAlbum: viewmodel.addAlbum,
            finishAlbumAdding: viewmodel.finishAlbumAdding,
            removeAlbum: viewmodel.removeAlbum,
            confirmAlbumRemoving: viewmodel.confirmAlbumRemoving,
            cancelAlbumRemoving: viewmodel.cancelAlbumRemoving,
            editAlbum: viewmodel.editAlbum,
            finishAlbumEditing: viewmodel.finishAlbumEditing,
            viewAttached: viewmodel.viewAttached,
        };

    });
