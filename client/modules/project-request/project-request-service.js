(function(){
'use strict';

var ProjectRequestService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProjectRequest = function(projectId){
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
				console.log("ProjectRequestService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProjectRequest Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project-request')
.service('ProjectRequestService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectRequestService
]);

})();

console.log('Project Request Service Initialized');
