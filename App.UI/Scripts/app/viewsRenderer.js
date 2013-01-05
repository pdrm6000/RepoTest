(function ($) {

    var app = $.sammy('#main', function () {
        this.use('Template', 'html');
      
        this.get('#/', function (context) {
            this.partial('Templates/Home/Index.html');
        });
        
        this.get('#/AlbumsReview', function (context) {
            this.partial('Templates/Albums/Review.html')
                .then(window.albumApp.albumReviewViewModel.init);
        });
        
        this.get('#/AlbumsDirectory', function (context) {
            this.partial('Templates/Albums/Config.html');
        });

        this.get('#/ArtistsDirectory', function (context) {
            this.partial('Templates/Artists/Config.html')
                .then(window.albumApp.artistViewModel.init);
        });
    });

    $(function() {
        app.run('#/');
    });
})(jQuery);

