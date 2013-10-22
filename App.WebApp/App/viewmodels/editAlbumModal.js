define("viewmodels/editAlbumModal", ['viewmodels/datacontext', 'plugins/dialog'], function (datacontext, dialog) {

    var editAlbumModal = function (item) {
        this.originalItem = item;
        this.albumToUpdate = datacontext.createAlbum();
        copyTo(this.albumToUpdate, this.originalItem);
    };

    editAlbumModal.prototype.ok = function () {
        copyTo(this.originalItem, this.albumToUpdate);
        dialog.close(this, this.albumToUpdate);
    };

    editAlbumModal.prototype.cancel = function () {
        dialog.close(this, null);
    };

    editAlbumModal.prototype.canDeactivate = function () {
        return true;
    };

    editAlbumModal.show = function (item) {
        return dialog.show(new editAlbumModal(item));
    };

    function copyTo(album, newAlbum) {
        album.AlbumName(newAlbum.AlbumName());
        album.CoverUrl(newAlbum.CoverUrl());
        album.Year(newAlbum.Year());
    };

    return editAlbumModal;
});