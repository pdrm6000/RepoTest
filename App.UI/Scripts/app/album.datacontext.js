window.albumApp = window.albumApp || {};

window.albumApp.datacontext = (function (ko) {

    downloadNextAlbum = function() {
        var nextAlbum = downloadAlbum('Next');
        return nextAlbum.done();
    },
    downloadPreviousAlbum = function() {
        var previousAlbum = downloadAlbum('Previous');
        return previousAlbum.done();
    },
    downloadAlbum = function(action) {
        datacontext.Albums.IsLoading(true);
        return $.ajax({
            url: "../api/AlbumsRest/" + action,
            accepts: "application/json",
            cache: false,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    };
    
    var datacontext = {
        downloadNextAlbum: downloadNextAlbum,
        downloadPreviousAlbum: downloadPreviousAlbum,
    };
    return datacontext;
})(ko);