define("viewmodels/home/home",
	[
		'viewmodels/data/globalConfig',
	    'viewmodels/data/authentication'
	],
	function (globalConfig, authentication) {

    var self = {
    	activate: function() {
    		globalConfig.prototype.moduleIsFullyLoaded();
    	},
        twitterLogin: function () {
            authentication.getTwitterRequestToken().done(self.processTwitterResponse);
        },
    };
    return self;
});