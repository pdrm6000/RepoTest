(function ($) {

    var app = $.sammy('#mainHidden', function () {
        var viewModelToInit;
        this.use('Template', 'html');

        this.get('#/', function (context) {
            viewModelToInit = null;
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Home/Index.html')
                .then(startTransition);
        });

        this.get('#/AlbumsReview', function (context) {
            viewModelToInit = window.albumApp.albumReviewViewModel.init;
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Albums/Review.html')
                .then(startTransition);
        });

        this.get('#/AlbumsDirectory', function (context) {
            viewModelToInit = null;
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Albums/Config.html')
                .then(startTransition);
        });

        this.get('#/ArtistsDirectory', function (context) {
            viewModelToInit = window.albumApp.artistViewModel.init;
            window.albumApp.homeViewModel.isGlobalLoading(true);
            this.partial('Templates/Artists/Config.html')
                .then(startTransition);
        });
        
        var startTransition = function () {
            $("#main").fadeOut(400, copyContent);
        };
        var copyContent = function () {
            $("#main").empty();
            $("#main").append($("#mainHidden").html());
            $("#mainHidden").empty();
            renderView();
        };

        function renderView() {
            if (viewModelToInit != null)
                viewModelToInit();
            window.albumApp.homeViewModel.isGlobalLoading(false);
            $("#main").fadeIn(400);
        };
    });





    $(function () {
        app.run('#/');
    });
})(jQuery);

