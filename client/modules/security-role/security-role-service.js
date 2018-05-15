(function(){
'use strict';

var SecurityRoleService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getRoles = function(){
		console.log('getRoles()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/role',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			// console.log('getRoles Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getRoles Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.postPrivs = function(data){
		console.log('postPrivs()');
		var options = {
			method: 'POST',
			url: apiDomain + '/security/priv',
			data: data,
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			// console.log('postPrivs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('postPrivs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('securityRole')
.service('SecurityRoleService', [
	'$http',
	'$q',
	'apiDomain',
	SecurityRoleService
]);

})();

console.log('SecurityRole Service Initialized');
