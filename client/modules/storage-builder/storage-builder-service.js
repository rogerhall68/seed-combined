(function(){
'use strict';

var StorageBuilderService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getFreezers = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/freezer',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
		    console.log('response.data', response.data);
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getList Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('storageBuilder')
.service('StorageBuilderService', [
	'$http',
	'$q',
	'apiDomain',
	StorageBuilderService
]);

})();

console.log('StorageBuilder Service Initialized');
