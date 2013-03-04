define("app/artist.viewModel", ['jquery', 'knockout-2.2.0', 'app/artist.model', 'app/datacontext'], function ($, ko, artistModel, datacontext) {

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
        artistModel.selectedArtist.id(data.Id);
        artistModel.selectedArtist.name(data.Name);
        artistModel.selectedArtist.imageUrl(data.ImageUrl);
        $("#editDialog").modal('show');
    },
    init = function () {
        ko.applyBindings(self, document.getElementById("ArtistsConfig"));
        artistModel.isLoading(true);
        artistModel.clear();
        datacontext.downloadAllArtists().then(processArtistsDownloaded);
    },
    processArtistsDownloaded = function (data) {
        ko.utils.arrayPushAll(artistModel.artistsCollection, data);
        artistEffects();
        artistModel.isLoading(false);
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
        var replaceArtist = {
            Id: editedArtist.Id,
            Name: artistModel.selectedArtist.name(),
            ImageUrl: artistModel.selectedArtist.imageUrl(),
            FullImageUrl: editedArtist.FullImageUrl
        };
        artistModel.artistsCollection.replace(artistModel.artistsCollection()[index], replaceArtist);
        toastr.success('<h4>Completed</h4>Artist saved succesfully');
        toastr.clear(lasteditpopup);
    },
    artistEffects = function () {
        $(".AlbumsDirItem").hover(function () {
            $(this).animate({ borderColor: "#5c5c5c" }, 150);
            $(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
        }, function () {
            $(this).animate({ borderColor: "fdfdfd" }, 150);
            $(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
        });
    };


    var self = {
        artists: artistModelLocal,
        addArtist: addArtist,
        editArtist: editArtist,
        deleteArtist: deleteArtist,
        finishArtistEditing: finishArtistEditing,
        finishArtistAdding: finishArtistAdding,
        init: init,
    };
    return self;
});

