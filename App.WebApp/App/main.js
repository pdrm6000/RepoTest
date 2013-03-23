requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(function(require) {
    var app = require('durandal/app'),
        viewLocator = require('durandal/viewLocator'),
        system = require('durandal/system'),
        router = require('durandal/plugins/router');
    
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';
    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();
        
        //configure routingewq
        router.useConvention();
        router.mapNav('viewmodels/home', 'viewmodels/home', 'Home');
        router.mapNav('viewmodels/albumsReview', 'viewmodels/albumsReview', 'Review');
        router.mapNav('viewmodels/artistsDirectory', 'viewmodels/artistsDirectory', 'Artists');
        router.mapNav('viewmodels/albumsDirectory', 'viewmodels/albumsDirectory', 'Albums');
        
        app.adaptToDevice();
        
        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});