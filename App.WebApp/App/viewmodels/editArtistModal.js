define("viewmodels/editArtistModal", ['viewmodels/datacontext', 'plugins/dialog', 'knockout'], function (datacontext, dialog, ko) {

    var editArtistModal = function (item) {
        this.originalItem = item;
        this.artistToUpdate = datacontext.createArtist();
        copyTo(this.artistToUpdate, this.originalItem);
    };

    editArtistModal.prototype.ok = function () {
        copyTo(this.originalItem, this.artistToUpdate);
        dialog.close(this, this.artistToUpdate);
    };

    editArtistModal.prototype.cancel = function () {
        dialog.close(this, null);
    };

    editArtistModal.prototype.canDeactivate = function () {
        return true;
    };

    editArtistModal.show = function (item) {
        return dialog.show(new editArtistModal(item));
    };

    function copyTo(artist, newArtist) {
        artist.Name(newArtist.Name());
        artist.ImageUrl(newArtist.ImageUrl());
    };

    return editArtistModal;
});