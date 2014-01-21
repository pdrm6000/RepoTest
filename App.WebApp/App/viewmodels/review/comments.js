define("viewmodels/review/comments",
	[
	    'jquery',
	    'bootstrap',
	],
	function ($, bootstrap) {

		var viewmodel = function () {
			var self = this;
			self.model = null;
			
			self.closePopover = function (p) {
				$('#comments' + p.model.albumId()).hide();
			};

			self.showPopover = function(p) {
				$('#comments' + p.model.albumId()).show();
			};

			self.sendComment = function(p) {
				alert("TODO save comment");
			};
		};
		
		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		return viewmodel;

	});
