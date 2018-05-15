(function(){
'use strict';

var StorageConfigService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getConfigs = function(){
		console.log('getConfigs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/config',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getConfigs Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getConfigs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getDimDirs = function(){
		console.log('getDimDirs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/dim/dir',
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
			url: apiDomain + '/storage/dim/lab',
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
	srvc.getValidChildren = function(configId){
		console.log('getDimLabs()');
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/config/child/' + configId,
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
	srvc.postConfig = function(data){
		console.log('postConfig()');
		var options = {
			method: 'POST',
			url: apiDomain + '/storage/config',
			data: data,
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('postConfig Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('postConfig Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.deleteConfig = function(data){
		console.log('deleteConfig()');
		var options = {
			method: 'DELETE',
			url: apiDomain + '/storage/config/' + data.store_config_id,
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('deleteConfig Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('deleteConfig Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

};

angular
.module('storageConfig')
.service('StorageConfigService', [
	'$http',
	'$q',
	'apiDomain',
	StorageConfigService
]);

})();

console.log('StorageConfig Service Initialized');
