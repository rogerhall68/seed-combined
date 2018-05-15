(function(){
'use strict';

// var WorksheetService = function($http, $q, apiDomain, WorksheetBuildService, CacheService) {
var WorksheetService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getWorksheets = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/worksheet',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getWorksheets Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getWorksheet = function(rootId){
		console.log('getWorksheet(' + rootId + ')');
		var worksheet = CacheService.get('worksheet.' + rootId);
		var deferred = null;
		if (worksheet) {
			deferred = $q.defer();
			deferred.resolve(worksheet);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/sop/worksheet/' + rootId,
				cache: false
			};
			console.log('worksheet', worksheet);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				// deferred.resolve(WorksheetBuildService.buildWorksheet(response.data, rootId));
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
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
		    console.log('getVariableTypes Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getVariableVars = function(){
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
		    console.log('getVariableTypes Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getUnit = function(){
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
		    console.log('getVariableTypes Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

};

angular
.module('sopWorksheet')
.service('WorksheetService', [
	'$http',
	'$q',
	'apiDomain',
	// 'WorksheetBuildService',
	'CacheService',
	WorksheetService
]);

})();

console.log('SOP Worksheet Service Initialized');
