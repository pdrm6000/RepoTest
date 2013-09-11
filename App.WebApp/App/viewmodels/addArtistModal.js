define("viewmodels/addArtistModal", ['viewmodels/datacontext', 'plugins/dialog'], function (datacontext, dialog) {

    var addArtistModal = function () {
        this.artistToAdd = datacontext.createArtist();
    };

    addArtistModal.prototype.ok = function () {
        dialog.close(this, this.artistToAdd);
    };

    addArtistModal.prototype.cancel = function () {
        dialog.close(this, null);
    };

    addArtistModal.prototype.canDeactivate = function () {
        return true;
    };

    addArtistModal.show = function () {
        return dialog.show(new addArtistModal());
    };

    return addArtistModal;
});