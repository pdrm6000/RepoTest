// could be used applyBindings only in one zone of the page, example:
// http://stackoverflow.com/questions/9293761/knockoutjs-multiple-view-models-in-a-single-view


var MasterVM = {
    NextAlbumVM: {
        NextAlbumName: ko.observable(),
        NextYear: ko.observable(),
        NextArtistName: ko.observable(),
        NextComments: ko.observable(),
        NextImageUrl: ko.observable()
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

var myBinder = new Binder();
var BoxOut = '#AlbumData0';
var BoxIn = '#AlbumData1';
   

function Binder() {
    
    this.BindingUsed = '0';
    this.GetBindingFunction = GetBindFunctionToUse;
    this.BindAlbum = BindCurrentAlbum;
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

    function GetBindFunctionToUse() {
        if (this.BindingUsed == 0) {
            this.BindingUsed = 1;
            return BindNextAlbum;
        }
        else {
            this.BindingUsed = 0;
            return BindCurrentAlbum;
        }
    }
}

function BindAlbum() {
    ko.applyBindings(MasterVM);
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
    $(BoxOut).effect('slide', options, 500, SlideInNextAlbum);
}

function SlideInNextAlbum() {
    var options = { direction: "right" };
    $(BoxIn).effect('slide', options, 500);
    ChangeBoxes();
}

function ChangeBoxes() {
    var boxTmp = BoxOut;
    BoxOut = this.BoxIn;
    BoxIn = boxTmp;
}

function ProcessDownloadedAlbum(data) {
    var bindFunc = myBinder.GetBindingFunction();
    bindFunc(data);
    SlideOutCurrentAlbum();
}

function DownloadNextAlbum() {
    var nextAlbum = DownloadAlbum();
    nextAlbum.done(function (data) { ProcessDownloadedAlbum(data); });
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
    currentAlbum.done(function (data) { myBinder.BindAlbum(data); });
});
