﻿define("viewmodels/data/datacontext",
	[
		'breeze',
		'knockout'
	],
	function (breeze, ko) {

		window["ko"] = ko;
		breeze.config.initializeAdapterInstance("modelLibrary", "ko", true);

		var urlBase = "../api/";
		var artistsRestManager = new breeze.EntityManager({ dataService: new breeze.DataService({
			serviceName: urlBase + 'ArtistsRest',
			hasServerMetadata: false // don't ask the server for metadata
			})
		});
		var albumsRestManager = new breeze.EntityManager({
			dataService: new breeze.DataService({
				serviceName: urlBase + 'AlbumsRest',
				hasServerMetadata: false // don't ask the server for metadata
			})
		});

		artistsMetadataStore = artistsRestManager.metadataStore,
		albumsMetadataStore = albumsRestManager.metadataStore,
		downloadNextAlbum = function () {
			var nextAlbum = downloadAlbum('Next');
			return nextAlbum;
		},
		downloadPreviousAlbum = function () {
			var previousAlbum = downloadAlbum('Previous');
			return previousAlbum;
		},
		downloadAlbum = function (action) {
			var query = new breeze.EntityQuery().from(action);
			return albumsRestManager.executeQuery(query);
		},
		downloadArtist = function (action) {
			var query = new breeze.EntityQuery().from(action).orderBy("Name");
			return artistsRestManager.executeQuery(query);
		},
		downloadAllArtists = function () {
			var allArtists = downloadArtist('GET');
			return allArtists;
		},
		createArtist = function (initialValues) {
			var customerType = artistsRestManager.metadataStore.getEntityType('ArtistDTO'); 
			return customerType.createEntity(initialValues);
		},
		createAlbum = function (initialValues) {
			var customerType = albumsRestManager.metadataStore.getEntityType('AlbumCatalogDTO');
			return customerType.createEntity(initialValues);
		},
		addArtist = function (artist) {
			artistsRestManager.addEntity(artist);
		},
		addAlbum = function (album) {
			albumsRestManager.addEntity(album);
		},
		saveArtists = function () {
			return artistsRestManager.saveChanges();
		},
		saveAlbums = function () {
			return albumsRestManager.saveChanges();
		},
		downloadArtistsWithAlbums = function () {
			var query = new breeze.EntityQuery().from('GET').orderBy("ArtistName");
			return albumsRestManager.executeQuery(query);
		};

		return {
			artistsMetadataStore: artistsMetadataStore,
			albumsMetadataStore: albumsMetadataStore,
			downloadNextAlbum: downloadNextAlbum,
			downloadPreviousAlbum: downloadPreviousAlbum,
			downloadAllArtists: downloadAllArtists,
			addArtist: addArtist,
			addAlbum: addAlbum,
			downloadArtistsWithAlbums: downloadArtistsWithAlbums,
			saveArtists: saveArtists,
			saveAlbums: saveAlbums,
			createArtist: createArtist,
			createAlbum: createAlbum,
		};
});