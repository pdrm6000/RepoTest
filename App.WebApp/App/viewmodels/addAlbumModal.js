define("viewmodels/addAlbumModal", ['viewmodels/datacontext', 'plugins/dialog'], function (datacontext, dialog) {

    var addAlbumModal = function (artistId, artistName) {
        var currentTime = new Date();
        this.albumToAdd = datacontext.createAlbum({ ArtistId: artistId, ArtistName: artistName, Year: currentTime.getFullYear() });
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

    addAlbumModal.show = function (artistId, artistName) {
        return dialog.show(new addAlbumModal(artistId, artistName));
    };

    return addAlbumModal;
});