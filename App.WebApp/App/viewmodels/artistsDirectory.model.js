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
        clear: clear
    };

    function artist() {
        this.id = ko.observable();
        this.name = ko.observable();
        this.imageUrl = ko.observable();
        this.fullImageUrl = ko.computed(function () {
            return "./Images/Artist/" + this.imageUrl();
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