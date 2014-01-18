define("viewmodels/albums/albumsDirectory.model",
	[
		'knockout'
	],
	function (ko) {
		var model = {
		    artistCollection: ko.observableArray(),
		};

		return {
			artistCollection: model.artistCollection,
		};

	});