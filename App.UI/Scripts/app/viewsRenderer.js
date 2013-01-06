(function ($) {

    var app = $.sammy('#main', function () {
        this.use('Template', 'html');

        this.get('#/', function (context) {
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Home/Index.html')
                .then(turnOffLoading);
        });

        this.get('#/AlbumsReview', function (context) {
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Albums/Review.html')
                .then(turnOffLoading)
                .then(window.albumApp.albumReviewViewModel.init);
        });

        this.get('#/AlbumsDirectory', function (context) {
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Albums/Config.html')
                .then(turnOffLoading);
        });

        this.get('#/ArtistsDirectory', function (context) {
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Artists/Config.html')
                .then(turnOffLoading)
                .then(window.albumApp.artistViewModel.init);
        });
    });

     function turnOffLoading() {
        window.albumApp.homeViewModel.isGlobalLoading(false);
    };


    $(function () {
        app.run('#/');
    });
})(jQuery);

