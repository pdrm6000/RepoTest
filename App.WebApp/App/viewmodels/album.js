define("viewmodels/album", ['viewmodels/datacontext', 'viewmodels/editAlbumModal', "viewmodels/addAlbumModal"],
	function (datacontext, editAlbumModal, addAlbumModal) {

		var viewmodel = {
			activate: function () {
				alert('ttttt');
			},
		};
		
		return {
			activate: viewmodel.activate,
		};
		
	});
