define("viewmodels/review/binder",
	[
        'knockout'
	],
	function (ko) {

	    var binder = function () {
	        var self = this;
	    };

	    binder.prototype.addToModel = function (model, albums) {
	        ko.utils.arrayForEach(albums, function (entity) {
	            model.push({
	                album: entity,
	                comments: ko.observableArray(),
	                rate: ko.observable(0),
	            });
	        });
	    };

	    binder.prototype.bindComments = function (model, comments) {
	        ko.utils.arrayForEach(model(), function (entity) {
	            if (comments && comments.results && comments.results[0][entity.album.Id()]) {
	                entity.comments(comments.results[0][entity.album.Id()]);
	            }
	        });
	    };

	    binder.prototype.bindRates = function(model, rates) {
	        ko.utils.arrayForEach(model(), function (entity) {
	            if (rates && rates.results && rates.results[0][entity.album.Id()]) {
	                entity.rate(rates.results[0][entity.album.Id()].toFixed(1));
	            }
	        });
	    };

	    return binder;

	});
