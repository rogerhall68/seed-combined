(function(){
'use strict';

var WorkbenchService = function($http, $q, apiDomain, WorkbenchBuildService, CacheService) {
	var srvc = this;
	srvc.getWorkbench = function(rootId){
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
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				console.log("WorkbenchService", "response.data", response.data);
				deferred.resolve(WorkbenchBuildService.buildWorkbench(response.data, rootId));
			}, function errorCallback(response) {
			    console.log('getList Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('workbench')
.service('WorkbenchService', [
	'$http',
	'$q',
	'apiDomain',
	'WorkbenchBuildService',
	'CacheService',
	WorkbenchService
]);

})();

console.log('Workbench Service Initialized');
