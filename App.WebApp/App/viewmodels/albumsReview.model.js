define("viewmodels/albumsReview.model", [], function () {

    NextAlbum = new nextAlbum(),
    CurrentAlbum = new currentAlbum(),
    IsLoading = ko.observable();
    return {
        NextAlbum: NextAlbum,
        CurrentAlbum: CurrentAlbum,
        IsLoading: IsLoading
    };

    function currentAlbum() {
        this.CurrentAlbumName = ko.observable();
        this.CurrentYear = ko.observable();
        this.CurrentArtistName = ko.observable();
        this.CurrentComments = ko.observable();
        this.CurrentImageUrl = ko.observable();
    };

    function nextAlbum() {
        this.NextAlbumName = ko.observable();
        this.NextYear = ko.observable();
        this.NextArtistName = ko.observable();
        this.NextComments = ko.observable();
        this.NextImageUrl = ko.observable();
    };

});