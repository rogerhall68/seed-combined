(function(){
'use strict';

// var ProcedureService = function($http, $q, apiDomain, ProcedureBuildService, CacheService) {
var ProcedureService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProcedures = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/procedure',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getProcedures Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getProcedure = function(rootId){
		console.log('getProcedure(' + rootId + ')');
		var procedure = CacheService.get('procedure.' + rootId);
		var deferred = null;
		if (procedure) {
			deferred = $q.defer();
			deferred.resolve(procedure);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/sop/procedure/' + rootId,
				cache: false
			};
			console.log('procedure', procedure);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				// deferred.resolve(ProcedureBuildService.buildProcedure(response.data, rootId));
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
	srvc.getStructure = function(rootId){
		console.log('getStructure(' + rootId + ')');
		var structure = CacheService.get('procedure.' + rootId);
		var deferred = null;
		if (structure) {
			console.log('CACHED structure', structure);
			deferred = $q.defer();
			deferred.resolve(structure);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/sop/structure/' + rootId,
				cache: false
			};
		// console.log('structure', structure);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				console.log('API structure', structure);
				// deferred.resolve(ProcedureBuildService.buildStructure(response.data, rootId));
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
.module('sopProcedure')
.service('ProcedureService', [
	'$http',
	'$q',
	'apiDomain',
	// 'ProcedureBuildService',
	'CacheService',
	ProcedureService
]);

})();

console.log('SOP Procedure Service Initialized');
