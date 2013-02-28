requirejs.config({
    baseUrl: 'Scripts/lib',
    paths: {
        app: '../app',
        "jquery": "/Scripts/lib/jquery-1.8.3",
        //"sammy": "/Scripts/lib/sammy"
    },
    //shim: {
    //    "sammy": {
    //        deps: ["jquery"],
    //        exports: "Sammy"
    //    }
    //}
});

// Start the main app logic.
requirejs(['jquery', 'sammy', 'app/viewsRenderer'],
function ($, sammy, viewRenderer) {
    viewRenderer.start();
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});