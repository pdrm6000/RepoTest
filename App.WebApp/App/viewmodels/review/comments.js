define("viewmodels/review/comments",
	[
	    'jquery',
	    'bootstrap',
	],
	function ($,bootstrap) {

		var viewmodel = function () {
			var self = this;
			self.model = null;
		};

		viewmodel.prototype.attached = function () {
			$('#popover' + this.model.albumId()).popover({
			    html: true,
				content: function () {
				    return $('#' + this.id.replace('popover', 'comments')).html();
				}
			});
		};

		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		return viewmodel;

	});
