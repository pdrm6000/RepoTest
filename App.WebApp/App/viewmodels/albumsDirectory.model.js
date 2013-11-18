﻿define("viewmodels/albumsDirectory.model", ['breeze', 'knockout'],
    function (breeze, ko) {
        var model = {
            artistCollection: ko.observableArray(),
            initializeAlbumDto: function (album) {
            	album.toDelete = ko.observable(false);
                album.FullCoverUrl = ko.computed(function () {
                    return 'App.WebApp/Images/Covers/' + album.CoverUrl();
                }, album);
            },
            init: function (breezeStore) {
                // Extract Breeze metadata definition types
                var dataType = breeze.DataType;
                var autoGeneratedKeyType = breeze.AutoGeneratedKeyType;
                var validator = breeze.Validator;

                breezeStore.addEntityType({
                    shortName: "AlbumCatalogDTO",
                    namespace: "App.ApplicationService.DTO",
                    autoGeneratedKeyType: autoGeneratedKeyType.Identity,
                    dataProperties: {
                        Id: { dataType: dataType.Int32, isNullable: false, isPartOfKey: true },
                        AlbumName: { dataType: dataType.String, maxLength: 100, isNullable: false, validators: [validator.required(), validator.maxLength({ maxLength: 100 })] },
                        CoverUrl: { dataType: dataType.String, isNullable: false },
                        Year: { dataType: dataType.Int32, isNullable: false },
                        ArtistId: { dataType: dataType.Int32, isNullable: false },
                        ArtistName: { dataType: dataType.String, isNullable: true },
                    },
                });
                breezeStore.registerEntityTypeCtor("AlbumCatalogDTO", null, model.initializeAlbumDto);
            },
        };

        return {
            artistCollection: model.artistCollection,
            init: model.init,
        };

    });