﻿define("viewmodels/artistsDirectory.model", ['viewmodels/datacontext', 'breeze', 'knockout'], function (datacontext, breeze, ko) {

    var privMethods = {};
    privMethods.isLoading = ko.observable(true),
    privMethods.artistsCollection = ko.observableArray(),
    privMethods.test = { name: ko.observable('test111') },
    privMethods.selectedArtist = { FullImageUrl: ko.observable('/App.WebApp/Images/orderedList2.png'), ImageUrl: ko.observable(''), Name: ko.observable('') },
    privMethods.clear = function () {
        privMethods.artistsCollection.removeAll();
    },
    privMethods.artistDtoInitializer = function (artist) {
        artist.toDelete = ko.observable(false);
        artist.FullImageUrl = ko.computed(function () {
            return 'App.WebApp/Images/Artist/' + artist.ImageUrl();
        }, artist);
    },
    privMethods.createArtistModel = function (breezeStore) {
        breezeStore.addEntityType({
            shortName: "ArtistDTO",
            namespace: "App.Domain.ValueObjects.DTO",
            autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
            dataProperties: {
                Id: { dataType: DataType.Int32, isNullable: false, isPartOfKey: true },
                Name: {
                    dataType: DataType.String, maxLength: 100, isNullable: false,
                    validators: [Validator.required(), Validator.maxLength({ maxLength: 100 })]
                },
                ImageUrl: { dataType: DataType.String, isNullable: false },
            },
        });
        breezeStore.registerEntityTypeCtor("ArtistDTO", null, privMethods.artistDtoInitializer);
    };


    // Extract Breeze metadata definition types
    var DataType = breeze.DataType;
    var EntityType = breeze.EntityType;
    var DataProperty = breeze.DataProperty;
    var NavigationProperty = breeze.NavigationProperty;
    var AutoGeneratedKeyType = breeze.AutoGeneratedKeyType;
    var Validator = breeze.Validator;

    // The empty metadataStore to which we add types
    privMethods.createArtistModel(datacontext.artistsMetadataStore);

    return {
        isLoading: privMethods.isLoading,
        artistsCollection: privMethods.artistsCollection,
        selectedArtist: privMethods.selectedArtist,
        test: privMethods.test,
        clear: privMethods.clear,
        //artistNew: privMethods.artistNew
    };
});


function artistNew(data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);
    self.toDelete = ko.observable(false);
    self.FullImageUrl = ko.computed(function () {
        return 'App.WebApp/Images/Artist/' + self.ImageUrl();
    }, self);
};