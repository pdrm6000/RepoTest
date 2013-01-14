﻿window.albumApp.artistViewModel = (function (ko, datacontext) {

    var editedArtist;
    var artists = datacontext.Artists,
        addArtist = function() {
            artists.selectedArtist.id(0);
            artists.selectedArtist.name('');
            artists.selectedArtist.imageUrl('');
            $("#addDialog").dialog('open');
        },
        deleteArtist = function() {

        },
        editArtist = function (data, event) {
            editedArtist = data;
            artists.selectedArtist.id(data.Id);
            artists.selectedArtist.name(data.Name);
            artists.selectedArtist.imageUrl(data.ImageUrl);
            $("#editDialog").dialog('open');
        },
        init = function() {
            ko.applyBindings(window.albumApp.artistViewModel, document.getElementById("ArtistsConfig"));
            artists.isLoading(true);
            artists.clear();
            createArtistDialog("#editDialog", finishArtistEditing, 600);
            createArtistDialog("#addDialog", finishArtistAdding, 350);
            datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function(data) {
            ko.utils.arrayPushAll(artists.artistsCollection, data);
            artistEffects();
            artists.isLoading(false);
        },
        finishArtistEditing = function () {
            datacontext.updateArtist(artists.selectedArtist.getArtistDTO()).then(notifyArtistEdited);
        },
        finishArtistAdding = function () {
            datacontext.addArtist(artists.selectedArtist.getArtistDTO()).then(notifyArtistAdded);
        },
        notifyArtistAdded = function (data) {
            artists.artistsCollection.push(data);
            //Appear notifications alert('modificacion ok');
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
            //Appear notifications alert('modificacion ok');
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
