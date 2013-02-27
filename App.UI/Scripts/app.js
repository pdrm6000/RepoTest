requirejs.config({
    baseUrl: 'Scripts',
    paths: {
        lib: 'lib',
        app: 'app',
    },
    //shim: {
    //    'lib/jquery-1.8.3': {
    //        exports: 'lib/jquery-1.8.3'
    //    }
    //},
});

// Start the main app logic.
requirejs(['app/viewsRenderer'],
function (viewRenderer) {
    viewRenderer.start();
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});