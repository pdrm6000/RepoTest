// could be used applyBindings only in one zone of the page, example:
// http://stackoverflow.com/questions/9293761/knockoutjs-multiple-view-models-in-a-single-view


var MasterVM;
var myBinder;
var BoxOut;
var BoxIn;
var CurrentAlbumAnimation;
var NextAlbumAnimation;
var AreControlsLocked;

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

function DownloadAlbum(action) {
    MasterVM.IsLoading(true);
    return $.ajax({
        url: "../api/AlbumsRest/" + action,
        accepts: "application/json",
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error: ' + textStatus);
        }
    });
}

function SlideOutCurrentAlbum() {
    var options = { mode: "hide", direction: CurrentAlbumAnimation };
    $(BoxOut).effect('slide', options, 500, SlideInNextAlbum);
}

function SlideInNextAlbum() {
    var options = { direction: NextAlbumAnimation };
    $(BoxIn).effect('slide', options, 500, UnlockControls);
    ChangeBoxes();
}

function AnimationNoPreviousData() {
    $(BoxOut).animate({ "left": "+=40px" }, 150, AnimationNoPreviousDataStepTwo);
}

function AnimationNoPreviousDataStepTwo() {
    $(BoxOut).animate({ "left": "-=40px" }, 150, UnlockControls);
}

function AnimationNoNextData() {
    $(BoxOut).animate({ "left": "-=40px" }, 150, AnimationNoNextDataStepTwo);
}

function AnimationNoNextDataStepTwo() {
    $(BoxOut).animate({ "left": "+=40px" }, 150, UnlockControls);
}

function UnlockControls() {
    AreControlsLocked = false;
}

function ChangeBoxes() {
    var boxTmp = BoxOut;
    BoxOut = this.BoxIn;
    BoxIn = boxTmp;
}

function ProcessNextAlbumDownloaded(data) {
    if (data == null) {
        MasterVM.IsLoading(false);
        AnimationNoNextData();
    } else {
        var bindFunc = myBinder.GetBindingFunction();
        bindFunc(data);
        CurrentAlbumAnimation = 'left';
        NextAlbumAnimation = 'right';
        SlideOutCurrentAlbum();
    }
}

function ProcessPreviousAlbumDownloaded(data) {
    if (data == null) {
        MasterVM.IsLoading(false);
        AnimationNoPreviousData();
    } else {
        var bindFunc = myBinder.GetBindingFunction();
        bindFunc(data);
        CurrentAlbumAnimation = 'right';
        NextAlbumAnimation = 'left';
        SlideOutCurrentAlbum();
    }
}

function DownloadNextAlbum() {
    var nextAlbum = DownloadAlbum('Next');
    nextAlbum.done(function (data) { ProcessNextAlbumDownloaded(data); });
}

function DownloadPreviousAlbum() {
    var nextAlbum = DownloadAlbum('Previous');
    nextAlbum.done(function (data) { ProcessPreviousAlbumDownloaded(data); });
}

function TryDownload(downloadFunction) {
    if (!AreControlsLocked) {
        AreControlsLocked = true;
        downloadFunction();
    }
}

function Init() {
    MasterVM = {
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

    myBinder = new Binder();
    BoxOut = '#AlbumData0';
    BoxIn = '#AlbumData1';
    CurrentAlbumAnimation = 'left';
    NextAlbumAnimation = 'right';
    AreControlsLocked = false;
    
    $(function () {
        $("#NextAlbum").click(function () { TryDownload(DownloadNextAlbum); });
    });

    $(function () {
        $("#PreviousAlbum").click(function () { TryDownload(DownloadPreviousAlbum); });
    });
    BindAlbum();
    var currentAlbum = DownloadAlbum('Next');
    currentAlbum.done(function (data) { myBinder.BindAlbum(data); });
}




