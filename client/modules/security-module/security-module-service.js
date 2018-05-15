(function(){
'use strict';

var SecurityModuleService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getModules = function(){
		console.log('getModules()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/module',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			// console.log('getModules Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getModules Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getDimDirs = function(){
		console.log('getDimDirs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/dim/dir',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getDimDirs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getDimDirs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getDimLabs = function(){
		console.log('getDimLabs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/dim/lab',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getDimLabs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getDimLabs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getValidChildren = function(moduleId){
		console.log('getDimLabs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/module/child/' + moduleId,
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getDimLabs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getDimLabs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

};

angular
.module('securityModule')
.service('SecurityModuleService', [
	'$http',
	'$q',
	'apiDomain',
	SecurityModuleService
]);

})();

console.log('SecurityModule Service Initialized');
