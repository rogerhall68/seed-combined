(function(){
'use strict';

var SecurityUserService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getUsers = function(){
		console.log('getUsers()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/user',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getUsers Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getUsers Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getLabs = function(){
		console.log('getLabs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/lab',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getLabs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getLabs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('securityUser')
.service('SecurityUserService', [
	'$http',
	'$q',
	'apiDomain',
	SecurityUserService
]);

})();

console.log('SecurityUser Service Initialized');
