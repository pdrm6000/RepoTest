define("viewmodels/artists/artistsDirectory",
	[
		'viewmodels/data/globalConfig',
		'viewmodels/data/datacontext',
		'viewmodels/artists/addArtistModal'
	],
	function (globalConfig, datacontext, addArtistModal) {

		var lastaddpopup;
		var viewmodel = {

			artistsCollection: ko.observableArray(),
			newArtist: null,
			
			deleteArtist: function () {

			},
			processArtistsDownloaded: function (data) {
				viewmodel.artistsCollection(data.results);
				globalConfig.prototype.moduleIsFullyLoaded();
			},
			
			addArtist: function () {
				addArtistModal.show().then(viewmodel.finishArtistAdding);
			},
			finishArtistAdding: function (artistAdded) {
				if (artistAdded) {
					lastaddpopup = toastr.info('Adding artist...');
					viewmodel.newArtist = artistAdded; // keep a reference
					datacontext.addArtist(artistAdded);
					datacontext.saveArtists().then(viewmodel.notifyArtistAdded);
				}
			},
			notifyArtistAdded: function (data) {
				viewmodel.artistsCollection.push(viewmodel.newArtist); // use the reference changed
				viewmodel.newArtist.entityAspect.setUnchanged(); //TODO (investigate): I don't know why i have to do this, it is like after added the change is not reflected on client collection
				toastr.success('<h4>Completed</h4>Artist added succesfully');
				toastr.clear(lastaddpopup);
			},
			
			activate: function () {
				viewmodel.artistsCollection.removeAll();
				return datacontext.downloadAllArtists().then(viewmodel.processArtistsDownloaded);
			},
		};

		return {
			artists: viewmodel.artistsCollection,
			addArtist: viewmodel.addArtist,
			deleteArtist: viewmodel.deleteArtist,
			finishArtistAdding: viewmodel.finishArtistAdding,
			activate: viewmodel.activate,
		};
	});

