(function(){
'use strict';

var ProjectReserveService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProjectReserve = function(projectId){
		var project = CacheService.get('project.' + projectId);
		var deferred = null;
		if (project) {
			deferred = $q.defer();
			deferred.resolve(project);
			return deferred.promise;
		} else {
			var options = {
				method: 'GET',
				url: apiDomain + '/project/' + projectId,
				cache: false
			};
			deferred = $q.defer();
			$http(options)
			.then(function successCallback(response) {	
				console.log("ProjectReserveService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProjectReserve Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project-reserve')
.service('ProjectReserveService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectReserveService
]);

})();

console.log('Project Reserve Service Initialized');
