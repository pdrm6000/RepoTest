define("viewmodels/albums/album",
	[
		'viewmodels/data/datacontext',
		'viewmodels/albums/editAlbumModal'
	],
	function (datacontext, editAlbumModal) {

		var viewmodel = function () {
			var self = this;
			self.lastaddpopup = null;
			self.albumModel = null;
			self.isDeleting = ko.observable();
			
			self.editAlbum = function (data) {
				editAlbumModal.show(data.albumModel).then(self.finishAlbumEditing);
			};
			
			self.finishAlbumEditing = function (data) {
				if (data) {
					self.lastaddpopup = toastr.info('Saving album...');
					datacontext.saveAlbums().then(self.notifyAlbumEdited);
				}
			};
			
			self.notifyAlbumEdited = function () {
				toastr.success('<h4>Completed</h4>Album saved succesfully');
				toastr.clear(self.lastaddpopup);
			};
			
		};

		viewmodel.prototype.activate = function (param) {
			this.albumModel = param.data;
			this.isDeleting = param.parent;
		};

		return viewmodel;

	});
