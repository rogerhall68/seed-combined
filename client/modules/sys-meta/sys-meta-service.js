(function(){
'use strict';

var MetaService = function($http, $q, apiDomain, CacheService) {
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
		    console.log('getMetas Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('sysMeta')
.service('MetaService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	MetaService
]);

})();

console.log('SysMeta Service Initialized');
