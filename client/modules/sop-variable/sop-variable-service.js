(function(){
'use strict';

var VariableService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getVariables = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/variable',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getVariables Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getVariableTypes = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/variable/type',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getVariables Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getVariableUnits = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/unit',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getVariables Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getVariableDataTypes = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/variable/datatype',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getVariables Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getVariable = function(rootId){
		console.log('getVariable(' + rootId + ')');
		var sop = CacheService.get('sop.' + rootId);
		var deferred = null;
		if (sop) {
			deferred = $q.defer();
			deferred.resolve(sop);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/storage/sop/' + rootId,
				cache: false
			};
			console.log('sop', sop);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('sopVariable')
.service('VariableService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	VariableService
]);

})();

console.log('SOP Variable Service Initialized');
