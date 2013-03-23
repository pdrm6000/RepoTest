define("viewmodels/albumsDirectory.model", [],
    function () {

        isLoading = ko.observable(true),
        artistCollection = ko.observableArray(), // overrided in mapping
        selectedAlbum = new album(),
        getNewArtistModel = function (data) {
            return new artistModel(data);
        },
        getNewAlbumModel = function (data) {
            return new albumModel(data);
        };
        return {
            isLoading: isLoading,
            artistCollection: artistCollection,
            selectedAlbum: selectedAlbum,
            getNewArtistModel: getNewArtistModel,
            getNewAlbumModel: getNewAlbumModel
        };

        function album() {
            this.id = ko.observable();
            this.name = ko.observable();
            this.year = ko.observable();
            this.artistId = ko.observable();
            this.coverUrl = ko.observable();
            this.artistName = ko.observable();
            this.fullCoverUrl = ko.computed(function () {
                return "./Images/Covers/" + this.coverUrl();
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
                return './Images/Covers/' + self.CoverUrl();
            }, self);
        };

        function artistModel(data) {
            var self = this;
            var mapping = {
                '': {
                    create: function (options) {
                        return new albumModel(options.data);
                    }
                }
            };
            self.Albums = ko.mapping.fromJS(data.Albums, mapping);
            ko.mapping.fromJS(data, {}, self);
            self.isDeleting = ko.observable(false);
        };

    });