define("viewmodels/artists/artistsDirectory.model",
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
		};

		return {
			newArtist: privMethods.newArtist,
			artistsCollection: privMethods.artistsCollection,
			clear: privMethods.clear,
		};
});
