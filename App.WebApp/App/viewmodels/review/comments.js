define("viewmodels/review/comments",
	[
	    'jquery',
	    'bootstrap',
	    'viewmodels/data/datacontext'
	],
	function ($, bootstrap, datacontext) {

		var viewmodel = function () {
			var self = this;
			self.model = null;
			self.newComment = null;
		    self.lastPopup = null;
		    
			self.closePopover = function (p) {
				$('#comments' + p.model.albumId()).hide();
			};

			self.showPopover = function(p) {
				$('#comments' + p.model.albumId()).show();
			};

			self.sendComment = function(p) {
			    self.lastPopup = toastr.info('Sending your comment...');
			    var comment = datacontext.createComment();
			    comment.Body(p.newComment());
			    comment.Date(Date.now());
			    comment.AlbumId(self.model.albumId());
			    comment.UserId('anonymous');
			    datacontext.addComment(comment);
			    datacontext.saveComments().then(function () { self.notifyCommentSent(comment); });
			};

		    self.notifyCommentSent = function(comment) {
		        toastr.success('<img src=' + self.model.albumCover + ' width=50 height=50 /> Your comment has been sent !');
		        toastr.clear(self.lastPopup);
		        comment.entityAspect.setUnchanged();
		        self.model.comments.push(comment);
		        self.newComment('');
		    };
		};
		
		viewmodel.prototype.activate = function (param) {
		    this.model = param;
		    this.newComment = ko.observable();
		};

		return viewmodel;

	});
