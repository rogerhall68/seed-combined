(function(){
'use strict';

var SecurityGroupService = function($http, $q, apiDomain) {
	var srvc = this;
	srvc.getGroups = function(){
		console.log('getGroups()');
		var options = {
			method: 'GET',
			url: apiDomain + '/security/group',
			cache: true
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getGroups Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getGroups Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('securityGroup')
.service('SecurityGroupService', [
	'$http',
	'$q',
	'apiDomain',
	SecurityGroupService
]);

})();

console.log('SecurityGroup Service Initialized');
