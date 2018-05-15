(function(){
'use strict';

var CrudService = function($http, $q, apiDomain, SysService) {
	var srvc = this;
	srvc.sysCrud = function(sysCrudConfig) {
		SysService.getProperties(sysCrudConfig.name).then(function(data){
			console.log('getProperties', data);
			if (!sysCrudConfig.hasOwnProperty('attrs')) {				
				console.log('did not have');
				sysCrudConfig.attrs = data.filter(function(d){
					return d.is_chron_var === false;
				});
			} else {
				console.log('did have');
			}
			sysCrudConfig.caption = sysCrudConfig.attrs.filter(function(a){ return a.is_primary_key === true; })[0].table_label_singular;
			sysCrudConfig.tmpl = sysCrudConfig.attrs.map(function(a){
				return { value: null, changed: false };
			});

			console.log('sysCrudConfig.name', sysCrudConfig.name);
			var select = {
				table: sysCrudConfig.name,
				success_value: '',
				success_msg: ''
			};
			srvc.selectAsync(select).then(function(data){
				console.log(sysCrudConfig.name, data);
				var visualModel = Object.keys(data).map(function(k){
					return Object.keys(data[k]).map(function(j){
						return { value: data[k][j], changed: false };
					});
				});
				visualModel.push(JSON.parse(JSON.stringify(sysCrudConfig.tmpl)));
				sysCrudConfig.data = visualModel;
			});
		});

		sysCrudConfig.select = function(r, c) {
			var select = {
				table: sysCrudConfig.name,
				success_value: '',
				success_msg: ''
			};
			
			srvc.selectAsync(select).then(function(data){
				console.log('data selected', data);
			});
		};
		sysCrudConfig.selectLU = function(r, c) {
			var selectLU = {
				table: sysCrudConfig.name,
				order_by_name: 1,
				success_value: '',
				success_msg: ''
			};
			
			srvc.selectAsyncLU(selectLU).then(function(data){
				console.log('lookup selected', data);
			});
		};
		sysCrudConfig.change = function(r, c) {
			sysCrudConfig.data[r][c].changed = true;
		};
		sysCrudConfig.new = function() {
			var newRecord = JSON.parse(JSON.stringify(sysCrudConfig.tmpl));
			sysCrudConfig.data.push(newRecord);
		};
		sysCrudConfig.blur = function(r, c) {
			console.log('blur', r, c);
			var tableKey = sysCrudConfig.attrs.filter(function(a){ return a.is_primary_key; })[0].attrib_name;
			// console.log('tableKey', tableKey);
			var keyIndex = sysCrudConfig.attrs.findIndex(function(a){ return a.attrib_name == tableKey; });
			// console.log('keyIndex', keyIndex);
			var keyValue = sysCrudConfig.data[r][keyIndex].value;
			// console.log('keyValue', keyValue);
			
			if (keyValue === null) {														// adding record
				var requiredAttrs   = sysCrudConfig.attrs
									  .filter(function(a){ return a.req; });
				var requiredIndex   = requiredAttrs
									  .map(attr => sysCrudConfig.attrs.findIndex(function(a){ return a.name == attr.name; }));
				var requiredChanged = requiredIndex
									  .filter(function(i){ return sysCrudConfig.data[r][i].changed; }); 
				var requiredValues  = requiredIndex
									  .filter(function(i){ return sysCrudConfig.data[r][i].changed; });
				if (requiredChanged.length == requiredIndex.length) {    // required fields have all been changed from presumed null todo: accept default values
					var allChanged    = sysCrudConfig.data[r].filter(function(col){ return col.changed; });
					var changedIndex  = allChanged.map(attr => sysCrudConfig.data[r].findIndex(function(d){ return d.value == attr.value; }));
					var changedAttrs  = changedIndex.map(i => sysCrudConfig.attrs[i].attrib_name); 
					var changedValues = changedIndex.map(i => sysCrudConfig.data[r][i].value); 

					// Insert new record and update keyValue for new record
					// var sql = "insert into " + sysCrudConfig.name + " (" + changedAttrs + ") values (" + changedValues + ")";
					// console.log('sql', sql);				
					var values = {};
					changedIndex.map(i => values[sysCrudConfig.attrs[i].attrib_name] = sysCrudConfig.data[r][i].value); 
					var inputValues = JSON.stringify({ "insert_values": [ values ] });
					// console.log('inputValues', inputValues);				

					var insert = {
						table: sysCrudConfig.name,
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
						sysCrudConfig.new();
					});
				}
			} else if (sysCrudConfig.data[r][c].changed) {
				var update = {
					table: sysCrudConfig.name,
					table_key: tableKey,
					table_key_value: keyValue,
					attribute: sysCrudConfig.attrs[c].attrib_name,
					attribute_value: sysCrudConfig.data[r][c].value,
					edit_user: '1',
					edit_interval_id: '1234567890L'
				};

				srvc.updateAsync(update).then(function(data){
					console.log('blur updated');
				});
			}
		};

	};

	srvc.selectAsync = function(data) {
		console.log('selectAsync() ', data);
		var options = {
			method: 'POST',
			url: apiDomain + '/s/' + data.table,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('selectAsync Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: CrudService.selectAsync() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

	srvc.selectAsyncLU = function(data) {
		console.log('selectAsyncLU() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/l/' + data.table,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('selectAsyncLU Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: CrudService.selectAsyncLU() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
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
		    console.log('Error: CrudService.insertAsync() failed' + response.statusText);
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
		    console.log('Error: CrudService.updateAsync() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};

	srvc.deleteAsync = function(data) {
		console.log('deleteAsync() ' + data);
		var options = {
			method: 'POST',
			url: apiDomain + '/u/' + data.table,
			data: data,
			cache: false
		};
		var deferred = $q.defer();
		$http(options)
		.then(function successCallback(response) {
			console.log('deleteAsync Success: ' + JSON.stringify(response.data));
			deferred.resolve(response.data);
		}, function errorCallback(response) {
		    console.log('Error: CrudService.deleteAsync() failed' + response.statusText);
		    deferred.reject(response.statusText);
		});
		return deferred.promise;
	};
};

angular
.module('tmiApp')
.service('CrudService', [
	'$http',
	'$q',
	'apiDomain',
	'SysService',
	CrudService
]);

})();

console.log('CrudService Initialized');
