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
    },
    downloadArtist = function(action) {
        return $.ajax({
            url: "../api/ArtistsRest/" + action,
            accepts: "application/json",
            cache: false,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    downloadAllArtists = function() {
        var allArtists = downloadArtist('');
        return allArtists.done();
    },
    updateArtist = function (artist) {
        return $.ajax({
            url: "/api/ArtistsRest/Put/" + artist.Id,
            data: JSON.stringify(artist),
            type: "PUT",
            contentType: "application/json;charset=utf-8",
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    };
    
    var datacontext = {
        downloadNextAlbum: downloadNextAlbum,
        downloadPreviousAlbum: downloadPreviousAlbum,
        downloadAllArtists: downloadAllArtists,
        updateArtist: updateArtist,
    };
    return datacontext;
})(ko);