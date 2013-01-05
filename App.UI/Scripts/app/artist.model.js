(function (ko, datacontext) {
    datacontext.Artists = new Artists();
    
    function Artists() {
        this.artistsCollection = ko.observableArray();
        this.selectedArtist = new Artist();
        this.clear = function() {
            this.artistsCollection.removeAll();
        };
        function Artist() {
            this.id = ko.observable();
            this.name = ko.observable();
            this.imageUrl = ko.observable();
            this.fullImageUrl = ko.computed(function() {
                return "../../Images/Artist/" + this.imageUrl();
            }, this),
            this.getArtistDTO = function() {
                return {
                    Id : this.id(),
                    Name : this.name(),
                    ImageUrl : this.imageUrl(),
                    FullImageUrl : '',
                };
            };
        };
    };
    
})(ko, albumApp.datacontext);