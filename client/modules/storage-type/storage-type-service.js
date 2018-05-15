(function(){
'use strict';

var StorageTypeService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getTypes = function(){
		console.log('getTypes()');
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/type',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getTypes Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getTypes Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.putType = function(data){
		console.log('putType()', data);
		var options = {
			method: 'POST',
			url: apiDomain + '/storage/type',
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('putType Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('putType Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.deleteType = function(data){
		console.log('deleteType()', data);
		var options = {
			method: 'DELETE',
			url: apiDomain + '/storage/type/' + data.store_type_id,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('deleteType Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('deleteType Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getCategories = function(){
		console.log('getCategories()');
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/category',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getCategories Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getCategories Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('storageType')
.service('StorageTypeService', [
	'$http',
	'$q',
	'apiDomain',
	StorageTypeService
]);

})();

console.log('StorageType Service Initialized');
