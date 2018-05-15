(function(){
'use strict';

var FreezerService = function($http, $q, apiDomain, FreezerBuildService, CacheService) {
	var srvc = this;
	srvc.getFreezers = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/storage/freezer',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getFreezers Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getFreezer = function(rootId){
		console.log('getFreezer(' + rootId + ')');
		var freezer = CacheService.get('freezer.' + rootId);
		var deferred = null;
		if (freezer) {
			deferred = $q.defer();
			deferred.resolve(freezer);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/storage/freezer/' + rootId,
				cache: false
			};
			// console.log('freezer', freezer);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				deferred.resolve(FreezerBuildService.buildFreezer(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getFreezer Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
	srvc.getStructure = function(rootId){
		console.log('getStructure(' + rootId + ')');
		var structure = CacheService.get('freezer.' + rootId);
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
				deferred.resolve(FreezerBuildService.buildStructure(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getStructure Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;	dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		}
	};
	srvc.getContainer = function(rootId){
		console.log('getContainer(' + rootId + ')');
		var container = CacheService.get('container.' + rootId);
		var deferred = null;
		if (container) {
			console.log('CACHED container', container);
			deferred = $q.defer();
			deferred.resolve(container);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/storage/container/' + rootId,
				cache: false
			};
			// console.log('container', container);
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				console.log('API container', container);
				deferred.resolve(FreezerBuildService.buildContainer(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getContainer Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
	srvc.move = function(moving_item_id, new_parent_item_id, new_parent_pos_id){
		console.log('move', moving_item_id, new_parent_item_id, new_parent_pos_id);
		var data = {
			"moving_item_id": moving_item_id,
			"new_parent_item_id": new_parent_item_id,
			"new_parent_pos_id": new_parent_pos_id,
			"user": 1,
			"edit_interval_id": '12345'
		};
		var options = {
			method: 'POST',
			url: apiDomain + '/storage/move',
			data: data,
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('moveProduct Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('moveProduct Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;

	};
};

angular
.module('freezer')
.service('FreezerService', [
	'$http',
	'$q',
	'apiDomain',
	'FreezerBuildService',
	'CacheService',
	FreezerService
]);

})();

console.log('Freezer Service Initialized');
