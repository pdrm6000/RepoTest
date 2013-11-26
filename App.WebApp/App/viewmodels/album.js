define("viewmodels/album", ['viewmodels/datacontext', 'viewmodels/editAlbumModal'],
	function (datacontext, editAlbumModal) {

		var viewmodel = {
			lastaddpopup :null,
			albumModel: null,
			isDeleting: ko.observable(),
			activate: function (param) {
				viewmodel.albumModel = param.data;
				viewmodel.isDeleting = param.parent;
			},
			editAlbum: function (data) {
				editAlbumModal.show(data).then(viewmodel.finishAlbumEditing);
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
			getView: function() {
				var x = "";
			},
			binding: function() {
				var x = "";
			},
			bindingComplete: function() {
				var x = "";
			}
		};
		
		return {
			activate: viewmodel.activate,
			albumModel: viewmodel.albumModel,
			editAlbum: viewmodel.editAlbum,
			isDeleting: viewmodel.isDeleting,
			getView: viewmodel.getView,
			binding: viewmodel.binding,
			bindingComplete: viewmodel.bindingComplete,
		};
		
	});
