define("viewmodels/artists/artistsDirectory",
	[
		'viewmodels/data/datacontext',
		'viewmodels/artists/artistsDirectory.model',
		'viewmodels/artists/editArtistModal',
		'viewmodels/artists/addArtistModal'
	],
	function (datacontext, artistModel, editArtistModal, addArtistModal) {

		var lasteditpopup;
		var lastaddpopup;
		var viewmodel = {

			addArtist: function () {
				addArtistModal.show().then(viewmodel.finishArtistAdding);
			},
			deleteArtist: function () {

			},
			editArtist: function (item) {
				editArtistModal.show(item).then(viewmodel.finishArtistEditing);
			},
			activate: function () {
				artistModel.clear();
				return datacontext.downloadAllArtists().then(viewmodel.processArtistsDownloaded);
			},
			processArtistsDownloaded: function (data) {
				artistModel.artistsCollection(data.results);
			},
			finishArtistEditing: function (artistEdited) {
				if (artistEdited) {
					lasteditpopup = toastr.info('Saving artist...');
					datacontext.saveArtists().then(viewmodel.notifyArtistEdited);
				}
			},
			finishArtistAdding: function (artistAdded) {
				if (artistAdded) {
					lastaddpopup = toastr.info('Adding artist...');
					artistModel.newArtist = artistAdded; // keep a reference
					datacontext.addArtist(artistAdded);
					datacontext.saveArtists().then(viewmodel.notifyArtistAdded);
				}
			},
			notifyArtistAdded: function (data) {
				artistModel.artistsCollection.push(artistModel.newArtist); // use the reference changed
				artistModel.newArtist.entityAspect.setUnchanged(); //TODO (investigate): I don't know why i have to do this, it is like after added the change is not reflected on client collection
				toastr.success('<h4>Completed</h4>Artist added succesfully');
				toastr.clear(lastaddpopup);
			},
			notifyArtistEdited: function (e, result) {
				toastr.success('<h4>Completed</h4>Artist saved succesfully');
				toastr.clear(lasteditpopup);
			},
			viewAttached: function (view) {
				$(".span3").hover(function () {
					$(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
				}, function () {
					$(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
				});
			}
		};

		return {
			artists: artistModel,
			addArtist: viewmodel.addArtist,
			editArtist: viewmodel.editArtist,
			deleteArtist: viewmodel.deleteArtist,
			finishArtistEditing: viewmodel.finishArtistEditing,
			finishArtistAdding: viewmodel.finishArtistAdding,
			activate: viewmodel.activate,
			viewAttached: viewmodel.viewAttached,
			bindingComplete: viewmodel.viewAttached,
		};
	});

