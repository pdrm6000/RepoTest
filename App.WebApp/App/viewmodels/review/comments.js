define("viewmodels/review/comments",
	[
	],
	function () {

		var viewmodel = function () {
			var self = this;
			self.model = null;
		};

		viewmodel.prototype.viewAttached = function () {
			$('#popover' + self.model.albumId()).popover({
				html: true,
				content: function () {
					return $('#comments' + self.model.albumId()).html();
				}
			});
		};

		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		return viewmodel;

	});
