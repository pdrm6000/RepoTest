define("viewmodels/data/authentication",
	[

	],
	function () {

	    var mData = function () {
	        var self = this;
	    };
	    
	    mData.getTwitterRequestToken = function () {
	        //return $.post("https://api.twitter.com/oauth/request_token", { oauth_callback: encodeURIComponent(location.href) });
	        return $.ajax({
	            url: 'https://api.twitter.com/oauth/request_token',
	            type: 'POST',
	            beforeSend: function (request) {
	                request.setRequestHeader("oauth_callback", encodeURIComponent(location.href));
	            },
	        });
	    };

	    return mData;

	});