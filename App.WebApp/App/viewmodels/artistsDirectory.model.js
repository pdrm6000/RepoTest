﻿define("viewmodels/artistsDirectory.model", ['breeze', 'knockout'], function (breeze, ko) {

    var privMethods = {
        newArtist : null,
        artistsCollection: ko.observableArray(),
        clear: function () {
            privMethods.artistsCollection.removeAll();
        },
        artistDtoInitializer: function (artist) {
            artist.toDelete = ko.observable(false);
            artist.FullImageUrl = ko.computed(function () {
               return 'App.WebApp/Images/Artist/' + artist.ImageUrl();
            }, artist);
        },
        init: function (breezeStore) {
            // Extract Breeze metadata definition types
            var dataType = breeze.DataType;
            var autoGeneratedKeyType = breeze.AutoGeneratedKeyType;
            var validator = breeze.Validator;

            breezeStore.addEntityType({
                shortName: "ArtistDTO",
                namespace: "App.ApplicationService.DTO",
                autoGeneratedKeyType: autoGeneratedKeyType.Identity,
                dataProperties: {
                    Id: { dataType: dataType.Int32, isNullable: false, isPartOfKey: true },
                    Name: { dataType: dataType.String, maxLength: 100, isNullable: false, validators: [validator.required(), validator.maxLength({ maxLength: 100 })] },
                    ImageUrl: { dataType: dataType.String, isNullable: false },
                },
            });
            breezeStore.registerEntityTypeCtor("ArtistDTO", null, privMethods.artistDtoInitializer);
        },
    };


    return {
        newArtist: privMethods.newArtist,
        artistsCollection: privMethods.artistsCollection,
        clear: privMethods.clear,
        init: privMethods.init,
    };
});










(function (window) {

    // Stores past URLs that failed to load. Used for a quick lookup
    // and because `onerror` is not triggered in some browsers
    // if the response is cached.
    var errors = {};

    // Check the existence of an image file at `url` by creating a
    // temporary Image element. The `success` callback is called
    // if the image loads correctly or the image is already complete.
    // The `failure` callback is called if the image fails to load
    // or has failed to load in the past.
    window.checkImage = function (url, success, failure) {
        var img = new Image(),    // the 
            loaded = false,
            errored = false;

        // Run only once, when `loaded` is false. If `success` is a
        // function, it is called with `img` as the context.
        img.onload = function () {
            if (loaded) {
                return;
            }

            loaded = true;

            if (success && success.call) {
                success.call(img);
            }
        };

        // Run only once, when `errored` is false. If `failure` is a
        // function, it is called with `img` as the context.
        img.onerror = function () {
            if (errored) {
                return;
            }

            errors[url] = errored = true;

            if (failure && failure.call) {
                failure.call(img);
            }
        };

        // If `url` is in the `errors` object, trigger the `onerror`
        // callback.
        if (errors[url]) {
            img.onerror.call(img);
            return;
        }

        // Set the img src to trigger loading
        img.src = url;

        // If the image is already complete (i.e. cached), trigger the
        // `onload` callback.
        if (img.complete) {
            img.onload.call(img);
        }
    };

})(this);

