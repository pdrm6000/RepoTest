define("viewmodels/data/authentication",
	[

	],
	function () {

	    var mData = function () {
	        var self = this;
	    };
	    
	    mData.getTwitterRequestToken = function () {
	        return $.ajax({
	            url: 'https://api.twitter.com/oauth/request_token',
	            type: 'POST',
	            beforeSend: function (request) {
	            	request.setRequestHeader("oauth_callback", encodeURIComponent(location.href));
	            	request.setRequestHeader("oauth_consumer_key", 'ZDvqm68goomg4XnOUZjRWg');
	            	request.setRequestHeader("oauth_consumer_secret", 'PSNcQwMvDD0p2uaoyJVsgWkyYt8FhyHpmiG867bJ0');
	            },
	        });
	    };

	    return mData;

	});