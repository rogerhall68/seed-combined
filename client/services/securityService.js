(function(){
'use strict';

var SecurityService = function($http, $q, apiDomain, $rootScope, $state, CacheService) {
	console.log('SecurityService');
	var srvc = this;

	srvc.login = function(data, callback){
		console.log("  Login: ", data);
		var options = {
			method: 'POST',
			url: apiDomain + '/ldap/user',
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
			console.log('auth success: ', response.data);
			callback(response.data);
		}, function errorCallback(response) {
		    console.log('Login Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

	srvc.loadSession = function(userName, callback){
		console.log("  Load: ", userName);
		var options = {
			method: 'GET',
			url: apiDomain + '/security/user/' + userName,
			data: userName,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
			console.log('Load success: ', response.data);
			callback(response.data);
		}, function errorCallback(response) {
		    console.log('Load Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	}


// Initializing Modules ------------------------

	srvc.getModules = function(){
		console.log('getModules');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/module',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getModules Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

	var modules = null;
	srvc.init = function() {
		console.log('srvc.init');
		var modules = [];
		var parents = [];
		$state.get().forEach(function(s){
			if (s.security) {
				console.log(s.security.module, s.security.parent);
				parents.push(s.security.parent);
				modules.push(s.security.module);
			}	
		});

		console.log('parents', Array.from(new Set(parents)));
		console.log('modules', modules);
	};
};

angular
  .module('tmiApp')
  .service('SecurityService', [
	'$http',
	'$q',
	'apiDomain',
  	'$rootScope', 
  	'$state', 
  	'CacheService',
    SecurityService
  ]);

})();

console.log('SecurityService Initialized');
