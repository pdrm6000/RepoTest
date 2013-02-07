(function (ko, datacontext) {
    datacontext.artistWithAlbums = new artistWithAlbums();

    function artistWithAlbums() {
        this.isLoading = ko.observable(true);
        this.artistCollection = ko.observableArray(); // overrided in mapping
        this.selectedAlbum = new album();
        this.getNewAlbumModel = function (data) {
            return new albumModel(data);
        };
    };

    function album() {
        this.id = ko.observable();
        this.name = ko.observable();
        this.year = ko.observable();
        this.artistId = ko.observable();
        this.coverUrl = ko.observable();
        this.artistName = ko.observable();
        this.fullCoverUrl = ko.computed(function () {
            return "../../Images/Covers/" + this.coverUrl();
        }, this),
        this.getAlbumDTO = function () {
            return {
                Id: this.id(),
                AlbumName: this.name(),
                Year: this.year(),
                CoverUrl: this.coverUrl(),
                ArtistId: this.artistId(),
            };
        };
    };

    function albumModel(data) {
        ko.mapping.fromJS(data, {}, this);
        this.FullCoverUrl = ko.computed(function () {
            return '../../Images/Covers/' + this.CoverUrl();
        }, this);
    };

})(ko, albumApp.datacontext);