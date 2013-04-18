define("viewmodels/artistsDirectory", ['viewmodels/artistsDirectory.model', 'viewmodels/datacontext'],
    function (artistModel, datacontext) {

        var artistModelLocal = artistModel;
        var editedArtist;
        var lasteditpopup;
        var lastaddpopup;



        var vm =
        addArtist = function () {
            artistModel.selectedArtist.id(0);
            artistModel.selectedArtist.name('');
            artistModel.selectedArtist.imageUrl('');
            $('#addDialog').modal('show');
        },
        deleteArtist = function () {

        },
        editArtist = function (data, event) {
            editedArtist = data;
            artistModel.selectedArtist.id(data.Id());
            artistModel.selectedArtist.name(data.Name());
            artistModel.selectedArtist.imageUrl(data.ImageUrl());
            $("#editDialog").modal('show');
        },
        activate = function () {
            artistModel.isLoading(true);
            artistModel.clear();
            return datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function (data) {
            artistModel.artistsCollection = ko.mapping.fromJS(data, mapArtistCollection);
            //ko.utils.arrayPushAll(artistModel.artistsCollection, data);
            //artistEffects();
            artistModel.isLoading(false);
        },
        mapArtistCollection = {
            '': {
                create: function (options) {
                    return new artistModel.artistNew(options.data);
                }
            }
        },
        finishArtistEditing = function () {
            lasteditpopup = toastr.info('Saving artist...');
            datacontext.updateArtist(artistModel.selectedArtist.getArtistDTO()).then(notifyArtistEdited);
        },
        finishArtistAdding = function () {
            lastaddpopup = toastr.info('Adding artist...');
            datacontext.addArtist(artistModel.selectedArtist.getArtistDTO()).then(notifyArtistAdded);
        },
        notifyArtistAdded = function (data) {
            artistModel.artistsCollection.push(data);
            toastr.success('<h4>Completed</h4>Artist added succesfully');
            toastr.clear(lastaddpopup);
        },
        notifyArtistEdited = function () {
            var index = artistModel.artistsCollection.indexOf(editedArtist);
            var replaceArtist = new artistModel.artistNew({
                Id: editedArtist.Id,
                Name: artistModel.selectedArtist.name(),
                ImageUrl: artistModel.selectedArtist.imageUrl()
            });
            artistModel.artistsCollection.replace(artistModel.artistsCollection()[index], replaceArtist);
            toastr.success('<h4>Completed</h4>Artist saved succesfully');
            toastr.clear(lasteditpopup);
        },
        viewAttached = function (view) {
            $(".AlbumsDirItem").hover(function () {
                $(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
            }, function () {
                $(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
            });
        };


        var self = {
            artists: artistModel,
            addArtist: addArtist,
            editArtist: editArtist,
            deleteArtist: deleteArtist,
            finishArtistEditing: finishArtistEditing,
            finishArtistAdding: finishArtistAdding,
            activate: activate,
            viewAttached: viewAttached,
            afterBind: viewAttached,
        };
        return self;
    });

