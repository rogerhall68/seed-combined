(function(){
'use strict';

var SecurityApplicationService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getApplications = function(){
		console.log('getApplications()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/application',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getApplications Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getApplications Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getApplicationModules = function(){
		console.log('getApplicationModules()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/application/module',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getApplicationModules Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getApplicationModules Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('securityApplication')
.service('SecurityApplicationService', [
	'$http',
	'$q',
	'apiDomain',
	SecurityApplicationService
]);

})();

console.log('SecurityApplication Service Initialized');
