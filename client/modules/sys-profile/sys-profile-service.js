(function(){
'use strict';

var ProfileService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getTables = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sys/tables',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getProfiles Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('sysProfile')
.service('ProfileService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProfileService
]);

})();

console.log('SysProfile Service Initialized');
