define("viewmodels/review/comments",
	[
	    'jquery',
	    'bootstrap',
	],
	function ($,bootstrap) {

		var viewmodel = function () {
			var self = this;
			self.model = null;
			
			self.closePopover = function (p) {
				$('#comments' + p.model.albumId()).hide();
			};

			self.showPopover = function(p) {
				$('#comments' + p.model.albumId()).show();
			};
		};

		viewmodel.prototype.attached = function () {
			//$('#popover' + this.model.albumId()).popover({
			//    html: true,
			//    content: function () {
			//    	var htmlCode = $('#' + this.id.replace('popover', 'comments')).html();
			//	    $('#' + this.id.replace('popover', 'comments')).empty();
			//	    return htmlCode;
			//	}
			//});
		};

		viewmodel.prototype.activate = function (param) {
			this.model = param;
		};

		return viewmodel;

	});
