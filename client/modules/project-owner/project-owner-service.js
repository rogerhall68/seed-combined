(function(){
'use strict';

var ProjectOwnerService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProjectOwner = function(projectId){
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
				console.log("ProjectOwnerService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProjectOwner Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project-owner')
.service('ProjectOwnerService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectOwnerService
]);

})();

console.log('Project Owner Service Initialized');
