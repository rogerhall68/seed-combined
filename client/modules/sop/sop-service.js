(function(){
'use strict';

var SOPService = function($http, $q, apiDomain, SOPBuildService, CacheService) {
	var srvc = this;
	srvc.getSOPs = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getSOPs Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getSOP = function(rootId){
		console.log('getSOP(' + rootId + ')');
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
				deferred.resolve(SOPBuildService.buildSOP(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
	srvc.getStructure = function(rootId){
		console.log('getStructure(' + rootId + ')');
		var structure = CacheService.get('sop.' + rootId);
		var deferred = null;
		if (structure) {
			console.log('CACHED structure', structure);
			deferred = $q.defer();
			deferred.resolve(structure);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/storage/structure/' + rootId,
				cache: false
			};
			// console.log('structure', structure);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				console.log('API structure', structure);
				deferred.resolve(SOPBuildService.buildStructure(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('sop')
.service('SOPService', [
	'$http',
	'$q',
	'apiDomain',
	'SOPBuildService',
	'CacheService',
	SOPService
]);

})();

console.log('SOP Service Initialized');
