(function(){
'use strict';

var ListService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getLists = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/list',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getLists Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getListTypes = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sop/list/type',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getLists Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('sopList')
.service('ListService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ListService
]);

})();

console.log('SOP List Service Initialized');
