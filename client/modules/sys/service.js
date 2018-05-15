(function(){
'use strict';

var SysService = function($http, $q, apiDomain) {
	var sys = this;
	sys.getTables = function() {
		console.log('getTables');
		var options = {
			method: 'GET',
			url: apiDomain + '/table',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getRecord Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getRecord Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	sys.getProperties = function(table_name) {
		console.log('getTable', table_name);
		var options = {
			method: 'GET',
			url: apiDomain + '/table/' + table_name,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getRecord Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getRecord Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};	
	sys.getProperty = function(table_name, attrib_name) {
		console.log('getAttrib');
		var options = {
			method: 'GET',
			url: apiDomain + '/table/' + table_name + '/attrib/' + attrib_name,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getRecord Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getRecord Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	sys.updateTable = function(data) {
		console.log('updateTable() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/table/' + data.table_name,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('getRecord Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: SysService.updateTable() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	sys.updateProperty = function(data) {
		console.log('updateTable() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/table/' + data.table_name + '/attrib/' + data.attribute_name,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('updateProperty Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('updateProperty Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('sys')
.service('SysService', [
	'$http',
	'$q',
	'apiDomain',
	SysService
]);

})();

console.log('Sys Service Initialized');
