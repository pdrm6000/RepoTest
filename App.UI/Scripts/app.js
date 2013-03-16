requirejs.config({
    baseUrl: 'Scripts/lib',
    paths: {
        app: '../app',
        "jquery": "./jquery-1.8.3",
    },
});

// Start the main app logic.
requirejs(['jquery', 'sammy', 'app/viewsRenderer'],
function ($, sammy, viewRenderer) {
    viewRenderer.start();
});