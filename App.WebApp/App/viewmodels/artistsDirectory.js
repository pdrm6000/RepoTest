define("viewmodels/artistsDirectory", ['viewmodels/datacontext', 'viewmodels/artistsDirectory.model'],
    function (datacontext, artistModel) {

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
        editArtist = function (data) {
            editedArtist = data;
            artistModel.selectedArtist.Name(data.Name());
            artistModel.selectedArtist.FullImageUrl(data.FullImageUrl());
            artistModel.selectedArtist.ImageUrl(data.ImageUrl());
            $("#editDialog").modal('show');
        },
        activate = function () {
            artistModel.clear();
            return datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function (data) {
            artistModel.artistsCollection(data.results);
        },
        finishArtistEditing = function () {
            lasteditpopup = toastr.info('Saving artist...');
            editedArtist.ImageUrl(artistModel.selectedArtist.ImageUrl());
            editedArtist.Name(artistModel.selectedArtist.Name());
            datacontext.updateArtist().then(notifyArtistEdited);
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
        notifyArtistEdited = function (e,result) {
            toastr.success('<h4>Completed</h4>Artist saved succesfully');
            toastr.clear(lasteditpopup);
        },
        viewAttached = function (view) {
            $(".span3").hover(function () {
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

