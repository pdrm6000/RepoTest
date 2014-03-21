define("viewmodels/data/authentication",
	[

	],
	function () {

		var mData = function () {
			var self = this;
		};

		mData.twitterLogin = function () {
			window.location.href = '../api/AuthenticationRest/TwitterAuthentication?callbackUrl=' + location.href;
		};

		return mData;

	});