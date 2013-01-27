(function (ko, datacontext) {
    datacontext.artistWithAlbums = new artistWithAlbums();
    
    function artistWithAlbums() {
        this.isLoading = ko.observable(true);
        this.artistCollection = ko.observableArray();
    };
    
})(ko, albumApp.datacontext);