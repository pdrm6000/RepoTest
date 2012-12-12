// could be used separeted viewmodels using masterVM and $parent
// http://stackoverflow.com/questions/9293761/knockoutjs-multiple-view-models-in-a-single-view

function AlbumViewModel(album, year, artist, comments, image) {
    this.AlbumName = ko.observable(album);
    this.Year = ko.observable(year);
    this.ArtistName = ko.observable(artist);
    this.Comments = ko.observable(comments);
    this.ImageUrl = ko.observable('../../Images/Covers/' + image);
}

function NextAlbumViewModel(album, year, artist, comments, image) {
    this.NextAlbumName = ko.observable(album);
    this.NextYear = ko.observable(year);
    this.NextArtistName = ko.observable(artist);
    this.NextComments = ko.observable(comments);
    this.NextImageUrl = ko.observable('../../Images/Covers/' + image);
}

function BindCurrentAlbum(album) {
    ko.applyBindings(new AlbumViewModel(
                            album.AlbumName,
                            album.Year,
                            album.ArtistName,
                            album.Comments,
                            album.CoverUrl
                        ), document.getElementById('CurrentAlbumData'));
}

function BindNextAlbum(album) {
    ko.applyBindings(new NextAlbumViewModel(
                            album.AlbumName,
                            album.Year,
                            album.ArtistName,
                            album.Comments,
                            album.CoverUrl
                        ), document.getElementById('NextAlbumData'));
}

function DownloadAlbum() {
    return $.ajax({
        url: "../api/AlbumsRest",
        accepts: "application/json",
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error: ' + textStatus);
        }
    });
}


function SlideOutCurrentAlbum() {
    var options = { mode: "hide" };
    $("#CurrentAlbumData").effect('slide', options, 500, SlideInNextAlbum);
}

function SlideInNextAlbum() {
    var options = { direction: "right" };
    $("#NextAlbumData").effect('slide', options, 500, ChangeStyles);
}

function DownloadNextAlbum() {
    var nextAlbum = DownloadAlbum();
    nextAlbum.done(function (data) { BindNextAlbum(data); });
    SlideOutCurrentAlbum();
}

function ChangeStyles() {
    $("#NextAlbumData").attr("id", "tmp");
    $("#CurrentAlbumData").attr("id", "tmp2");
    $("#tmp").attr("id", "CurrentAlbumData");
    $("#tmp2").attr("id", "NextAlbumData");
}

$(function () {
    $("#NextAlbum").click(DownloadNextAlbum);
});

$(function () {
    //$("#PreviousAlbum").click(DownloadAlbum);
});

$(document).ready(function () {
    var currentAlbum = DownloadAlbum();
    currentAlbum.done(function (data) { BindCurrentAlbum(data); });
});







function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}





