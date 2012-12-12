// could be used applyBindings only in one zone of the page, example:
// http://stackoverflow.com/questions/9293761/knockoutjs-multiple-view-models-in-a-single-view


var MasterVM = {
    NextAlbumVM: {
        NextAlbumName : ko.observable(),
        NextYear : ko.observable(),
        NextArtistName : ko.observable(),
        NextComments : ko.observable(),
        NextImageUrl : ko.observable()
    },
    CurrentAlbumVM: {
        CurrentAlbumName: ko.observable(),
        CurrentYear: ko.observable(),
        CurrentArtistName: ko.observable(),
        CurrentComments: ko.observable(),
        CurrentImageUrl: ko.observable()
    },
    IsLoading: ko.observable()
};

function BindAlbum() {
    ko.applyBindings(MasterVM);
}

function BindCurrentAlbum(album) {
    MasterVM.CurrentAlbumVM.CurrentAlbumName(album.AlbumName);
    MasterVM.CurrentAlbumVM.CurrentYear(album.Year);
    MasterVM.CurrentAlbumVM.CurrentArtistName(album.ArtistName);
    MasterVM.CurrentAlbumVM.CurrentComments(album.Comments);
    MasterVM.CurrentAlbumVM.CurrentImageUrl('../../Images/Covers/' + album.CoverUrl);
    MasterVM.IsLoading(false);
}

function BindNextAlbum(album) {
    MasterVM.NextAlbumVM.NextAlbumName(album.AlbumName);
    MasterVM.NextAlbumVM.NextYear(album.Year);
    MasterVM.NextAlbumVM.NextArtistName(album.ArtistName);
    MasterVM.NextAlbumVM.NextComments(album.Comments);
    MasterVM.NextAlbumVM.NextImageUrl('../../Images/Covers/' + album.CoverUrl);
    MasterVM.IsLoading(false);
}

function DownloadAlbum() {
    MasterVM.IsLoading(true);
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
    BindAlbum();
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





