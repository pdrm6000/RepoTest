requirejs.config({
    baseUrl: 'Scripts/lib',
    paths: {
        app: '../app',
        "jquery": "/Scripts/lib/jquery-1.8.3",
    },
});

// Start the main app logic.
requirejs(['jquery', 'sammy', 'app/viewsRenderer'],
function ($, sammy, viewRenderer) {
    viewRenderer.start();
});