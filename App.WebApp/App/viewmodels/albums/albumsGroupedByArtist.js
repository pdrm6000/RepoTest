define("viewmodels/albums/albumsGroupedByArtist",
	[
		'viewmodels/data/datacontext',
		'viewmodels/albums/addAlbumModal'
	],
	function (datacontext, addAlbumModal) {
		var viewmodel = function () {
			var self = this;
			self.model = null;
			self.selectedArtist = null;
			self.newAlbum = null;
			self.lastaddpopup = null;

			self.addAlbum = function(data) {
				self.selectedArtist = data.model;
				addAlbumModal.show(data.model.Id, data.model.Name()).then(self.finishAlbumAdding);
			};
			
			self.finishAlbumAdding = function(albumAdded) {
				if (albumAdded) {
					self.lastaddpopup = toastr.info('Adding album...');
					self.newAlbum = albumAdded; // keep a reference
					datacontext.addAlbum(albumAdded);
					datacontext.saveAlbums().then(self.notifyAlbumAdded);
				}
			};
			
			self.notifyAlbumAdded = function(data) {
				self.selectedArtist.Albums.push(self.newAlbum); // use the reference changed
				self.newAlbum.entityAspect.setUnchanged(); //TODO (investigate): I don't know why i have to do this, it is like after added the change is not reflected on client collection
				toastr.success('<h4>Completed</h4>Album added succesfully');
				toastr.clear(self.lastaddpopup);
			};
			
			self.removeAlbum = function(data) {
				data.model.isDeleting(true);
				data.model.cancelVisible(true);
				data.model.confirmVisible(true);
				data.model.removeVisible(false);
				data.model.addVisible(false);
			};
			
			self.confirmAlbumRemoving = function(data) {
				data.model.isDeleting(false);
				self.resetButtons(data.model);
				var dataFiltered = ko.utils.arrayFilter(data.model.Albums(), function(item) { return item.toDelete() == true; });
				if (dataFiltered) {
					ko.utils.arrayForEach(dataFiltered, function(entity) {
						entity.entityAspect.setDeleted();
					});
					toastr.info('Deleting albums...');
					datacontext.saveAlbums().then(self.processAlbumsDeleted(dataFiltered, data.model.Albums));
				}
			};

			self.processAlbumsDeleted = function(data, array) {
				//TODO: invetigate how apply deleting automatically
				ko.utils.arrayForEach(data, function(item) {
					array.remove(item);
				});
				toastr.success('<h4>Completed</h4>Albums deleted succesfully');
			};

			self.cancelAlbumRemoving = function(data) {
				data.model.isDeleting(false);
				self.resetButtons(data.model);
			};

			self.resetButtons = function(data) {
				data.cancelVisible(false);
				data.confirmVisible(false);
				data.removeVisible(true);
				data.addVisible(true);
			};
		};

		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		return viewmodel;
	});