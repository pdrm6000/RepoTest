define("viewmodels/addAlbumModal", ['viewmodels/datacontext', 'plugins/dialog'], function (datacontext, dialog) {

    var addAlbumModal = function () {
        this.albumToAdd = datacontext.createAlbum();
        var currentTime = new Date();
        this.albumToAdd.Year(currentTime.getFullYear());
    };

    addAlbumModal.prototype.ok = function () {
        dialog.close(this, this.albumToAdd);
    };

    addAlbumModal.prototype.cancel = function () {
        dialog.close(this, null);
    };

    addAlbumModal.prototype.canDeactivate = function () {
        return true;
    };

    addAlbumModal.show = function () {
        return dialog.show(new addAlbumModal());
    };

    return addAlbumModal;
});