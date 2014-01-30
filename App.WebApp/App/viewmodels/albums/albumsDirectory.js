define("viewmodels/albums/albumsDirectory",
	[
		'viewmodels/data/globalConfig',
		'viewmodels/albums/albumsDirectory.model',
		'viewmodels/data/datacontext'
	],
	function (globalConfig ,albumsModel, datacontext){
		var viewmodel = {
			artistsWithAlbums: albumsModel,
			
			activate: function () {
				return datacontext.getAlbums().then(viewmodel.groupAlbumsByArtist);
			},
			
			groupAlbumsByArtist: function (data) {
				var previousArtistId = 0;
				$.each(data.results, function (index, album) {
					if (album.ArtistId() != previousArtistId) {
						albumsModel.artistCollection.push({
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
					$(albumsModel.artistCollection()).last()[0].Albums().push(album);
				});
				globalConfig.prototype.moduleIsFullyLoaded();
			},
			
			viewAttached: function(view) {
				$(".albumImg").hover(function () {
				    $(this).animate({ boxShadow : '0 1px 20px rgba(0, 0, 0, 0.5)' }, 100);
				}, function () {
				    $(this).animate({ boxShadow : '0 1px 3px rgba(0, 0, 0, 0.1)' }, 100);
				});
			}
		};

		return {
			artistsWithAlbums: viewmodel.artistsWithAlbums,
			activate: viewmodel.activate,
			viewAttached: viewmodel.viewAttached,
		};

	});
