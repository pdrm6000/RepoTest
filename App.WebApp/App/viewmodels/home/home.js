define("viewmodels/home/home",
	[
		'viewmodels/data/globalConfig'
	],
	function (globalConfig) {

    var self = {
    	activate: function() {
    		globalConfig.prototype.moduleIsFullyLoaded();
    	},
    };
    return self;
});