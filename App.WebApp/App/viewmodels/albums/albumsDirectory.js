define("viewmodels/albums/albumsDirectory",
	[
		'viewmodels/data/globalConfig',
		'viewmodels/data/datacontext'
	],
	function (globalConfig , datacontext){
		var viewmodel = {
			artistsWithAlbums: ko.observableArray(),
			
			activate: function () {
				return datacontext.getAlbums().then(viewmodel.groupAlbumsByArtist);
			},
			
			groupAlbumsByArtist: function (data) {
				var previousArtistId = 0;
				$.each(data.results, function (index, album) {
					if (album.ArtistId() != previousArtistId) {
						viewmodel.artistsWithAlbums().push({
							Name: ko.observable(album.ArtistName()),
							Id: album.ArtistId(),
							Albums: ko.observableArray(),
							removeVisible: ko.observable(true),
							addVisible: ko.observable(true),
							cancelVisible: ko.observable(false),
							confirmVisible: ko.observable(false),
							isDeleting : ko.observable(false),
						});
						previousArtistId = album.ArtistId();
					}
					$(viewmodel.artistsWithAlbums()).last()[0].Albums().push(album);
				});
				globalConfig.prototype.moduleIsFullyLoaded();
			},
		};

		return {
			artistsWithAlbums: viewmodel.artistsWithAlbums,
			activate: viewmodel.activate,
		};

	});
