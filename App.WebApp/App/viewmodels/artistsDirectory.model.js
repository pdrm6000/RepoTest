define("viewmodels/artistsDirectory.model", [], function () {

    isLoading = ko.observable(true),
    artistsCollection = ko.observableArray(),
    selectedArtist = new artist(),
    clear = function () {
        artistsCollection.removeAll();
    };
    return {
        isLoading: isLoading,
        artistsCollection: artistsCollection,
        selectedArtist: selectedArtist,
        clear: clear,
        artistNew: artistNew
    };

    function artistNew(data) {
        var self = this;
        ko.mapping.fromJS(data, {}, self);
        self.toDelete = ko.observable(false);
        self.FullImageUrl = ko.computed(function () {
            return 'App.WebApp/Images/Artist/' + self.ImageUrl();
        }, self);
    };
    
    function artist() {
        this.id = ko.observable();
        this.name = ko.observable();
        this.imageUrl = ko.observable();
        this.fullImageUrl = ko.computed(function () {
            return "App.WebApp/Images/Artist/" + this.imageUrl();
        }, this),
        this.getArtistDTO = function () {
            return {
                Id: this.id(),
                Name: this.name(),
                ImageUrl: this.imageUrl(),
                FullImageUrl: '',
            };
        };
    };

});