(function (ko, datacontext) {
    datacontext.artistWithAlbums = new artistWithAlbums();

    function artistWithAlbums() {
        this.isLoading = ko.observable(true);
        this.artistCollection = ko.observableArray(); // overrided in mapping
        this.selectedAlbum = new album();
        this.getNewArtistModel = function (data) {
            return new artistModel(data);
        };
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
        var self = this;
        ko.mapping.fromJS(data, {}, self);
        self.FullCoverUrl = ko.computed(function () {
            return '../../Images/Covers/' + self.CoverUrl();
        }, self);
    };
    var mapping = {
        '': {
            create: function(options) {
                return new albumModel(options.data);
            }
        }
    };
    function artistModel(data) {
        var self = this;
        self.Albums = ko.mapping.fromJS(data.Albums, mapping);
        ko.mapping.fromJS(data, {}, self);
        self.isDeleting = ko.observable(false);
        //self.Albums = new albumModel(data.Albums);
        
    };

})(ko, albumApp.datacontext);