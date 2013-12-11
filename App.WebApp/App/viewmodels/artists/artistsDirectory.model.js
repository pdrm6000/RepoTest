﻿define("viewmodels/artists/artistsDirectory.model",
	[
		'breeze',
		'knockout'
	],
	function (breeze, ko) {
		
		var privMethods = {
			newArtist : null,
			artistsCollection: ko.observableArray(),
			clear: function () {
				privMethods.artistsCollection.removeAll();
			},
			initializeArtistDto : function (artist) {
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
				breezeStore.registerEntityTypeCtor("ArtistDTO", null, privMethods.initializeArtistDto);
			},
		};

		return {
			newArtist: privMethods.newArtist,
			artistsCollection: privMethods.artistsCollection,
			clear: privMethods.clear,
			init: privMethods.init,
		};
});