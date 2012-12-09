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
            alert('Error: '+ textStatus);
        }
    });
}
  

function SlideOutCurrentAlbum() {
    var options = {};
    $("#CurrentAlbumData").effect('drop', options, 1000);
}

function SlideInNextAlbum() {

}

function DownloadNextAlbum() {
    var nextAlbum = DownloadAlbum();
    nextAlbum.done(function (data) { BindNextAlbum(data); });
    SlideOutCurrentAlbum();
    SlideInNextAlbum();
}

$(function () {
    $("#NextAlbum").click(DownloadNextAlbum);
});

$(function () {
    $("#PreviousAlbum").click(DownloadAlbum);
});

$(document).ready(function () {
    var currentAlbum = DownloadAlbum();
    currentAlbum.success(function (data) { BindCurrentAlbum(data); });
});



