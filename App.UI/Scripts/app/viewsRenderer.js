define("app/viewsRenderer", ['jquery', 'sammy', 'app/home.viewmodel', 'app/artist.viewModel', 'app/artist.albums.viewmodel', 'app/albumreview.viewmodel'],
    function ($, sammy, homeViewModel, artistViewModel, artistsWithAlbumsViewModel, albumReviewViewModel) {
        return {
            start: function () {
                homeViewModel.init();
                var app = sammy('#mainHidden', function () {
                    var viewModelToInit;
                    this.use('Template', 'html');
                    
                    this.get('#/', function (context) {
                        viewModelToInit = null;
                        homeViewModel.isGlobalLoading(true);
                        this.partial('Templates/Home/Index.html')
                            .then(startTransition);
                    });

                    this.get('#/AlbumsReview', function (context) {
                        viewModelToInit = albumReviewViewModel.init;
                        homeViewModel.isGlobalLoading(true);
                        this.partial('Templates/Albums/Review.html')
                            .then(startTransition);
                    });

                    this.get('#/AlbumsDirectory', function (context) {
                        viewModelToInit = artistsWithAlbumsViewModel.init;
                        homeViewModel.isGlobalLoading(true);
                        this.partial('Templates/Albums/Config.html')
                            .then(startTransition);
                    });

                    this.get('#/ArtistsDirectory', function (context) {
                        viewModelToInit = artistViewModel.init;
                        homeViewModel.isGlobalLoading(true);
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
                        homeViewModel.isGlobalLoading(false);
                        $("#main").fadeIn(400);
                    };
                });

                app.run('#/');

            }
        };
    });
