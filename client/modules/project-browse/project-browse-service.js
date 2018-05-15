(function(){
'use strict';

var ProjectBrowseService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProjectBrowse = function(projectId){
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
				console.log("ProjectBrowseService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProjectBrowse Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project-browse')
.service('ProjectBrowseService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectBrowseService
]);

})();

console.log('Project Browse Service Initialized');
