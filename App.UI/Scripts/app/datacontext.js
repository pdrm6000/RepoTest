﻿define("app/datacontext", [], function () {

    downloadNextAlbum = function () {
        var nextAlbum = downloadAlbum('Next');
        return nextAlbum.done();
    },
    downloadPreviousAlbum = function () {
        var previousAlbum = downloadAlbum('Previous');
        return previousAlbum.done();
    },
    downloadAlbum = function (action) {
        return $.ajax({
            url: "/api/AlbumsRest/" + action,
            accepts: "application/json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    downloadArtist = function (action) {
        return $.ajax({
            url: "/api/ArtistsRest/" + action,
            accepts: "application/json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    downloadAllArtists = function () {
        var allArtists = downloadArtist('GET');
        return allArtists.done();
    },
    addArtist = function (artist) {
        return $.ajax({
            url: "/api/ArtistsRest/Post/",
            data: JSON.stringify(artist),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    addAlbum = function (artist) {
        return $.ajax({
            url: "/api/AlbumsRest/Post/",
            data: JSON.stringify(artist),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    updateArtist = function (artist) {
        return $.ajax({
            url: "/api/ArtistsRest/Put/" + artist.Id,
            data: JSON.stringify(artist),
            type: "PUT",
            contentType: "application/json;charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    downloadArtistsWithAlbums = function () {
        return $.ajax({
            url: "/api/ArtistsRest/GetWithAlbums",
            accepts: "application/json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    };

    return {
        downloadNextAlbum: downloadNextAlbum,
        downloadPreviousAlbum: downloadPreviousAlbum,
        downloadAllArtists: downloadAllArtists,
        updateArtist: updateArtist,
        addArtist: addArtist,
        addAlbum: addAlbum,
        downloadArtistsWithAlbums: downloadArtistsWithAlbums,
    };
});