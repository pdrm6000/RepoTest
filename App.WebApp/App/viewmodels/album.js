define("viewmodels/album", ['viewmodels/datacontext', 'viewmodels/editAlbumModal'],
	function (datacontext, editAlbumModal) {

		var viewmodel = {
			lastaddpopup :null,
			albumModel: null,
			isDeleting: ko.observable(),
			activate: function (param) {
				this.albumModel = param.data;
				this.isDeleting = param.parent;
			},
			editAlbum: function (data,x,y) {
				editAlbumModal.show(data.albumModel).then(viewmodel.finishAlbumEditing);
			},
			finishAlbumEditing: function (data) {
				if (data) {
					viewmodel.lastaddpopup = toastr.info('Saving album...');
					datacontext.saveAlbums().then(viewmodel.notifyAlbumEdited);
				}
			},
			notifyAlbumEdited: function () {
				toastr.success('<h4>Completed</h4>Album saved succesfully');
				toastr.clear(viewmodel.lastaddpopup);
			},
		};
		
		return {
			activate: viewmodel.activate,
			albumModel: viewmodel.albumModel,
			editAlbum: viewmodel.editAlbum,
			isDeleting: viewmodel.isDeleting,
		};
		
	});
