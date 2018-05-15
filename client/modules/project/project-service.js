(function(){
'use strict';

var ProjectService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProject = function(projectId){
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
				console.log("ProjectService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProject Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project')
.service('ProjectService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectService
]);

})();

console.log('Project Service Initialized');
