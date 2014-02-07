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
	    		var modelObject = {
	    			album: entity,
	    			comments: ko.observableArray(),
	    			rate: ko.observable(0),
	    		};
	    		modelObject.rateStyle = ko.computed(function() {
	    			var returnStyle = "";
	    			switch (Math.round(modelObject.rate())) {
	    			case 1:
	    				returnStyle = "rate1";
	    				break;
	    			case 2:
	    				returnStyle = "rate2";
	    				break;
	    			case 3:
	    				returnStyle = "rate3";
	    				break;
	    			case 4:
	    				returnStyle = "rate4";
	    				break;
	    			case 5:
	    				returnStyle = "rate5";
	    				break;
	    			default:
	    				returnStyle = "rate0";
	    				break;
	    			}
	    			return returnStyle;
	    		});
	            model.push(modelObject);
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
