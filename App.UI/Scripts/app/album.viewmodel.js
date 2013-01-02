window.albumApp.albumViewModel = (function (ko, datacontext) {
    var albums = datacontext.Albums,
        nextAlbum = function () {
            datacontext.getNextAlbum(albums);
        },
        previousAlbum = function () {
            datacontext.getPreviousAlbum(albums);
        };
        init = function () {
            datacontext.init();
        };
    return {
        albums: albums,
        nextAlbum: nextAlbum,
        previousAlbum: previousAlbum,
        init: init
    };

})(ko, albumApp.datacontext);

