define("viewmodels/artists/artist",
	[
		'viewmodels/data/datacontext',
		'viewmodels/artists/editArtistModal',
	],
	function (datacontext, editArtistModal) {

		var viewmodel = function () {
			var self = this;

			self.model = null;
			self.lasteditpopup = null;
			
			self.editArtist = function (item) {
				editArtistModal.show(item.model).then(self.finishArtistEditing);
			};

			self.finishArtistEditing = function(artistEdited) {
				if (artistEdited) {
					self.lasteditpopup = toastr.info('Saving artist...');
					datacontext.saveArtists().then(self.notifyArtistEdited);
				}
			};
			
			self.notifyArtistEdited = function (e, result) {
				toastr.success('<h4>Completed</h4>Artist saved succesfully');
				toastr.clear(lasteditpopup);
			};
		};

		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		viewmodel.prototype.bindingComplete = function() {
			$(".span3").hover(function () {
				$(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
			}, function () {
				$(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
			});
		};

		return viewmodel;

	});
