(function(){
'use strict';

var EditService = function($http, $q, apiDomain, CacheService, SysService) {
	var srvc = this;
	srvc.sysEdit = function(sysEditConfig) {
		SysService.getProperties(sysEditConfig.name).then(function(data){
			console.log('getProperties', data);
			sysEditConfig.attrs = data.filter(function(d){
				return d.is_chron_var === false;
			});
			sysEditConfig.caption = sysEditConfig.attrs.filter(function(a){ return a.is_primary_key === true; })[0].table_label_singular;
			sysEditConfig.tmpl = sysEditConfig.attrs.map(function(a){
				return { value: null, changed: false };
			});

			sysEditConfig.getData().then(function(data){
				console.log('countries', data);
				var visualModel = Object.keys(data).map(function(k){
					return Object.keys(data[k]).map(function(j){
						return { value: data[k][j], changed: false };
					});
				});
				visualModel.push(JSON.parse(JSON.stringify(sysEditConfig.tmpl)));
				sysEditConfig.data = visualModel;
			});
		});
		// return sysEditConfig;

		sysEditConfig.change = function(r, c) {
			sysEditConfig.data[r][c].changed = true;
		};
		sysEditConfig.new = function() {
			var newRecord = JSON.parse(JSON.stringify(sysEditConfig.tmpl));
			sysEditConfig.data.push(newRecord);
		};
		sysEditConfig.blur = function(r, c) {
			console.log('blur', r, c);
			var tableKey = sysEditConfig.attrs.filter(function(a){ return a.is_primary_key; })[0].attrib_name;
			// console.log('tableKey', tableKey);
			var keyIndex = sysEditConfig.attrs.findIndex(function(a){ return a.attrib_name == tableKey; });
			// console.log('keyIndex', keyIndex);
			var keyValue = sysEditConfig.data[r][keyIndex].value;
			// console.log('keyValue', keyValue);
			
			if (keyValue === null) {														// adding record
				var requiredAttrs   = sysEditConfig.attrs
									  .filter(function(a){ return a.req; });
				var requiredIndex   = requiredAttrs
									  .map(attr => sysEditConfig.attrs.findIndex(function(a){ return a.name == attr.name; }));
				var requiredChanged = requiredIndex
									  .filter(function(i){ return sysEditConfig.data[r][i].changed; }); 
				var requiredValues  = requiredIndex
									  .filter(function(i){ return sysEditConfig.data[r][i].changed; });
				if (requiredChanged.length == requiredIndex.length) {    // required fields have all been changed from presumed null todo: accept default values
					var allChanged    = sysEditConfig.data[r].filter(function(col){ return col.changed; });
					var changedIndex  = allChanged.map(attr => sysEditConfig.data[r].findIndex(function(d){ return d.value == attr.value; }));
					var changedAttrs  = changedIndex.map(i => sysEditConfig.attrs[i].attrib_name); 
					var changedValues = changedIndex.map(i => sysEditConfig.data[r][i].value); 

					// Insert new record and update keyValue for new record
					// var sql = "insert into " + sysEditConfig.name + " (" + changedAttrs + ") values (" + changedValues + ")";
					// console.log('sql', sql);				
					var values = {};
					changedIndex.map(i => values[sysEditConfig.attrs[i].attrib_name] = sysEditConfig.data[r][i].value); 
					var inputValues = JSON.stringify({ "insert_values": [ values ] });
					// console.log('inputValues', inputValues);				

					var insert = {
						table: sysEditConfig.name,
						values: inputValues,
						user: '1',
						edit_interval_id: '1234567890L',
						success_id: null,
						success_msg: ''
					};
					// console.log('insert', insert);				
					// console.log('insert', JSON.stringify(insert));				
					
					srvc.insertAsync(insert).then(function(data){
						console.log('blur inserted', data);

						// Add new null record
						sysEditConfig.new();
					});
				}
			} else if (sysEditConfig.data[r][c].changed) {
				var update = {
					table: sysEditConfig.name,
					table_key: tableKey,
					table_key_value: keyValue,
					attribute: sysEditConfig.attrs[c].attrib_name,
					attribute_value: sysEditConfig.data[r][c].value,
					edit_user: '1',
					edit_interval_id: '1234567890L'
				};

				srvc.updateAsync(update).then(function(data){
					console.log('blur updated');
				});
			}
		};

	};

	srvc.insertAsync = function(data) {
		console.log('insertAsync() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/i/' + data.table,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('insertAsync Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: EditService.insertAsync() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.updateAsync = function(data) {
		console.log('updateAsync() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/u/' + data.table,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('updateAsync Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: EditService.updateAsync() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getCountries = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/addr/country',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
			console.log('getCountries', response.data);
		}, function errorCallback(response) {
		    console.log('getCountries Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
	srvc.getLeaves = function(){
		var options = {
			method: 'GET',
			url: apiDomain + '/sys/leaves',
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('getEdits Error: ' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('sysEdit')
.service('EditService', [
	'$http',
	'$q',
	'apiDomain',
	'CacheService',
	'SysService',
	EditService
]);

})();

console.log('SysEdit Service Initialized');
