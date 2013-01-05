window.albumApp.artistViewModel = (function (ko, datacontext) {

    var artists = datacontext.Artists,
        addArtist = function() {

        },
        deleteArtist = function() {

        },
        editArtist = function(data, event) {
            artists.selectedArtist.id(data.Id);
            artists.selectedArtist.name(data.Name);
            artists.selectedArtist.imageUrl(data.ImageUrl);
            $("#editDialog").dialog('open');
        },
        init = function() {
            ko.applyBindings(window.albumApp.artistViewModel);
            artists.clear();
            artistDialog();
            datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function(data) {
            ko.utils.arrayPushAll(artists.artistsCollection, data);
            artistEffects();
        },
        finishArtistEditing = function() {
            datacontext.updateArtist(artists.selectedArtist.getArtistDTO()).then(notifyArtistEdited);
        },
        notifyArtistEdited = function() {
            alert('modificacion ok');
        };


    return {
        artists: artists,
        addArtist: addArtist,
        editArtist: editArtist,
        deleteArtist: deleteArtist,
        finishArtistEditing: finishArtistEditing,
        init: init,
    };

})(ko, albumApp.datacontext);

