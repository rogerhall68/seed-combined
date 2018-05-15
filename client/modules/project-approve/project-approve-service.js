(function(){
'use strict';

var ProjectApproveService = function($http, $q, apiDomain, CacheService) {
	var srvc = this;
	srvc.getProjectApprove = function(projectId){
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
				console.log("ProjectApproveService", "response.data", response.data);
				deferred.resolve(response.data);
			}, function errorCallback(response) {
			    console.log('getProjectApprove Error: ' + response.statusText);
			    deferred.reject(response.statusText);
			});
			return deferred.promise;
		}
	};
};

angular
.module('project-approve')
.service('ProjectApproveService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	ProjectApproveService
]);

})();

console.log('Project Approve Service Initialized');
