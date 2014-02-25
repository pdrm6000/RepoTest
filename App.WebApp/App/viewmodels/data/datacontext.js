define("viewmodels/data/datacontext",
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
		var commentsRestManager = new breeze.EntityManager({
		    dataService: new breeze.DataService({
		        serviceName: urlBase + 'CommentsRest',
		        hasServerMetadata: false // don't ask the server for metadata
		    })
		});
		var ratesRestManager = new breeze.EntityManager({
		    dataService: new breeze.DataService({
		        serviceName: urlBase + 'RatesRest',
		        hasServerMetadata: false // don't ask the server for metadata
		    })
		});

		artistsMetadataStore = artistsRestManager.metadataStore,
		albumsMetadataStore = albumsRestManager.metadataStore,
		commentsMetadataStore = commentsRestManager.metadataStore,
		ratesMetadataStore = ratesRestManager.metadataStore,

		downloadNextAlbum = function() {
			var nextAlbum = downloadAlbum('Next');
			return nextAlbum;
		},
		downloadPreviousAlbum = function() {
			var previousAlbum = downloadAlbum('Previous');
			return previousAlbum;
		},
		downloadAlbum = function(action) {
			var query = new breeze.EntityQuery().from(action);
			return albumsRestManager.executeQuery(query);
		},
		downloadArtist = function(action) {
		    var query = new breeze.EntityQuery().from(action).orderBy("Name");
			return artistsRestManager.executeQuery(query);
		},
		downloadAllArtists = function() {
			var allArtists = downloadArtist('GET');
			return allArtists;
		},
		
		createArtist = function(initialValues) {
			var customerType = artistsRestManager.metadataStore.getEntityType('ArtistDTO');
			return customerType.createEntity(initialValues);
		},
		createAlbum = function(initialValues) {
			var customerType = albumsRestManager.metadataStore.getEntityType('AlbumCatalogDTO');
			return customerType.createEntity(initialValues);
		},
		createRate = function (initialValues) {
			var customerType = ratesRestManager.metadataStore.getEntityType('RateDTO');
			return customerType.createEntity(initialValues);
		},
		createComment = function (initialValues) {
			var customerType = commentsRestManager.metadataStore.getEntityType('CommentDTO');
			return customerType.createEntity(initialValues);
		},
		
		addComment = function (comment) {
		    commentsRestManager.addEntity(comment);
		},
		addRate = function (rate) {
		    ratesRestManager.addEntity(rate);
		},
		addArtist = function(artist) {
			artistsRestManager.addEntity(artist);
		},
		addAlbum = function(album) {
			albumsRestManager.addEntity(album);
		},
		
		saveArtists = function() {
			return artistsRestManager.saveChanges();
		},
		saveAlbums = function() {
			return albumsRestManager.saveChanges();
		},
		saveComments = function () {
		    return commentsRestManager.saveChanges();
        },
		saveRates = function () {
		    return ratesRestManager.saveChanges();
		},
		
		getAlbums = function() {
			var query = new breeze.EntityQuery().from('GET').orderBy("ArtistName");
			return albumsRestManager.executeQuery(query);
		},
		getCommentsByAlbums= function (ids) {
		    var query = new breeze
		        .EntityQuery()
		        .from('GetCommentsByAlbums')
		        .withParameters({albumIds: ids});
		    return commentsRestManager.executeQuery(query);
		},
		getRatesByAlbums = function (ids) {
			var query = new breeze
                .EntityQuery()
                .from('GetRatesByAlbums')
                .withParameters({ albumIds: ids });
			return ratesRestManager.executeQuery(query);
		},
		getAlbumsForReview = function(count, page) {
			var query = new breeze
				.EntityQuery()
				.from('GetAlbumsForReview')
				.withParameters({ albumsCount: count, page: page });
			return albumsRestManager.executeQuery(query);
		},
		getAlbumsForReviewLocal = function(count, page) {
			var query = new breeze
				.EntityQuery()
				.from('GetAlbumsForReview')
				.withParameters({ albumsCount: count, page: page })
		        .skip(count * page)
                .take(count)
				.toType('AlbumCatalogDTO');
			return albumsRestManager.executeQueryLocally(query);
		};
	    

		return {
			artistsMetadataStore: artistsMetadataStore,
			albumsMetadataStore: albumsMetadataStore,
			commentsMetadataStore: commentsMetadataStore,
			ratesMetadataStore: ratesMetadataStore,
			downloadNextAlbum: downloadNextAlbum,
			downloadPreviousAlbum: downloadPreviousAlbum,
			downloadAllArtists: downloadAllArtists,
			
			addArtist: addArtist,
			addAlbum: addAlbum,
			addRate: addRate,
			addComment: addComment,

			saveArtists: saveArtists,
			saveAlbums: saveAlbums,
			saveComments: saveComments,
			saveRates: saveRates,

			createArtist: createArtist,
			createAlbum: createAlbum,
			createRate: createRate,
			createComment: createComment,
			
			getAlbums: getAlbums,
			getAlbumsForReview: getAlbumsForReview,
			getAlbumsForReviewLocal: getAlbumsForReviewLocal,
			getCommentsByAlbums: getCommentsByAlbums,
			getRatesByAlbums: getRatesByAlbums,
		};
});