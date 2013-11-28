define("viewmodels/album", ['viewmodels/datacontext', 'viewmodels/editAlbumModal'],
	function (datacontext, editAlbumModal) {

		var viewmodel = function () {
			var self = this;
			self.lastaddpopup = null;
			self.albumModel = null;
			self.isDeleting = ko.observable();
			self.editAlbum = function (data) {
				editAlbumModal.show(data.albumModel).then(viewmodel.finishAlbumEditing);
			};
			self.finishAlbumEditing = function (data) {
				if (data) {
					viewmodel.lastaddpopup = toastr.info('Saving album...');
					datacontext.saveAlbums().then(viewmodel.notifyAlbumEdited);
				}
			};
			self.notifyAlbumEdited = function () {
				toastr.success('<h4>Completed</h4>Album saved succesfully');
				toastr.clear(viewmodel.lastaddpopup);
			};
		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param.data;
			this.isDeleting = param.parent;
		};

		return viewmodel;

	});
