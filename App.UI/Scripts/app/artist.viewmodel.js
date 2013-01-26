window.albumApp.artistViewModel = (function (ko, datacontext) {

    var editedArtist;
    var lasteditpopup;
    var lastaddpopup;
    var artists = datacontext.Artists,
        addArtist = function () {
            artists.selectedArtist.id(0);
            artists.selectedArtist.name('');
            artists.selectedArtist.imageUrl('');
            $('#addDialog').modal('show');
        },
        deleteArtist = function () {

        },
        editArtist = function (data, event) {
            editedArtist = data;
            artists.selectedArtist.id(data.Id);
            artists.selectedArtist.name(data.Name);
            artists.selectedArtist.imageUrl(data.ImageUrl);
            $("#editDialog").modal('show');
        },
        init = function () {
            ko.applyBindings(window.albumApp.artistViewModel, document.getElementById("ArtistsConfig"));
            artists.isLoading(true);
            artists.clear();
            datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function (data) {
            ko.utils.arrayPushAll(artists.artistsCollection, data);
            artistEffects();
            artists.isLoading(false);
        },
        finishArtistEditing = function () {
            lasteditpopup = toastr.info('Saving artist...');
            datacontext.updateArtist(artists.selectedArtist.getArtistDTO()).then(notifyArtistEdited);
        },
        finishArtistAdding = function () {
            lastaddpopup = toastr.info('Adding artist...');
            datacontext.addArtist(artists.selectedArtist.getArtistDTO()).then(notifyArtistAdded);
        },
        notifyArtistAdded = function (data) {
            artists.artistsCollection.push(data);
            toastr.success('<h4>Completed</h4>Artist added succesfully');
            toastr.clear(lastaddpopup);
        },
        notifyArtistEdited = function () {
            var index = artists.artistsCollection.indexOf(editedArtist);
            var replaceArtist = {
                Id: editedArtist.Id,
                Name: artists.selectedArtist.name(),
                ImageUrl: artists.selectedArtist.imageUrl(),
                FullImageUrl: editedArtist.FullImageUrl
            };
            artists.artistsCollection.replace(artists.artistsCollection()[index], replaceArtist);
            toastr.success('<h4>Completed</h4>Artist saved succesfully');
            toastr.clear(lasteditpopup);
        };


    return {
        artists: artists,
        addArtist: addArtist,
        editArtist: editArtist,
        deleteArtist: deleteArtist,
        finishArtistEditing: finishArtistEditing,
        finishArtistAdding : finishArtistAdding,
        init: init,
    };

})(ko, albumApp.datacontext);

