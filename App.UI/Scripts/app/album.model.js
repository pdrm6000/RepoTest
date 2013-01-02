(function (ko, datacontext) {
    datacontext.Albums = new Albums();
    
    function Albums(data) {
        var self = this;
        data = data || {};
        self.NextAlbum = new nextAlbum();
        self.CurrentAlbum = new currentAlbum();
        self.IsLoading = ko.observable();
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
    
})(ko, albumApp.datacontext);