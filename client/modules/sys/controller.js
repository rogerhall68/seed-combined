(function(){
'use strict';

var Tables = function($state, SysService) {
	console.log('Tables');
	var sys = this;
	sys.data = null;
	SysService.getTables().then(function (data) { sys.data = data; });
};
var Properties = function($state, $stateParams, SysService) {
	console.log('Properties');
	var changeList = [];
	var sys = this;

	console.log($stateParams.table_name);
	sys.data = SysService.getProperties($stateParams.table_name).then(function (data) { sys.data = data; });
	sys.change = function(which) {
		if (changeList.indexOf(which) < 0) {
			changeList.push(which);
		}
	};
	sys.blur = function(which) {
		var value = function() { if (Object.prototype.hasOwnProperty.call(sys.data[0], which)) { return sys.data[0][which]; } else { return 'Error: key ' + which + ' not found'; } }();
		if (changeList.indexOf(which) > -1) {
			// Set class
			changeList.splice(changeList.indexOf(which), 1);
			console.log("changed update " + $stateParams.table_name + ', ' + which + ', ' + value);
			var data = { 'table_name': $stateParams.table_name, 
						 'property_name': which, 
						 'value': value };
			SysService.updateTable(data).then( function() { console.log('Updated!'); } );
		}
	};
};
var Property = function($state, $stateParams, SysService) {
	console.log('Property');
	var changeList = [];

	var sys = this;
	// sys.data = SysService.getProperties($stateParams.table_name).then(function (data) { sys.data = data; console.log('sys.data', sys.data); });
	console.log($stateParams.table_name, $stateParams.attrib_name);
	sys.rec = SysService.getProperty($stateParams.table_name, $stateParams.attrib_name).then(function (data) { 
		sys.rec = data[0]; 
		console.log('sys.rec', data[0]);
	});
	sys.change = function(property) {
		if (changeList.indexOf(property) < 0) {
			changeList.push(property);
		}
	};
	sys.blur = function(property) {
		var value = sys.rec[property];
		console.log('blur', property, value);

		if (changeList.indexOf(property) > -1) {
			// Set class
			changeList.splice(changeList.indexOf(property), 1);
			console.log("changed update " + $stateParams.table_name + ', ' + $stateParams.attrib_name + ', ' + property + ', ' + value);
			var data = { 'table_name': $stateParams.table_name, 
						 'attribute_name': $stateParams.attrib_name, 
						 'property_name': property, 
						 // 'attribute_name': property, 
						 // 'property_name': $stateParams.attrib_name, 
						 'value': value };
			console.log("data " + data);
			SysService.updateProperty(data).then( function() { console.log('Updated!'); } );
		}
	};
};

var LocalStorage = function(CacheService) {
	console.log('LocalStorage');
	var sys = this;
	sys.freezer = CacheService.sysCache.get('/freezer/lastVisited');
	sys.category = CacheService.sysCache.get('/category/lastVisited');
};


angular
.module('sys', [])

// .config(['$stateProvider', '$urlRouterProvider', registerRoutes]);
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('tables', {
		url: '/sys',
		templateUrl: 'modules/sys/index.html',
		controllerAs: 'sys',
		controller: 'Tables'
	})
	.state('table', {
		url: "/sys/table/:table_name",
		templateUrl: 'modules/sys/table.html',
		controllerAs: 'sys',
		controller: 'Properties'
	})
	.state('attrib', {
		url: "/sys/table/:table_name/attrib/:attrib_name",
		templateUrl: 'modules/sys/attribute.html',
		controllerAs: 'sys',
		controller: 'Property'
	})
	.state('localStorage', {
		url: "/sys/localStorage",
		templateUrl: 'modules/sys/localStorage.html',
		controllerAs: 'sys',
		controller: 'LocalStorage'
	})
	;
}])
.controller('Tables', [
	'$state',
	'SysService',
	Tables
])
.controller('Properties', [
	'$state',
	'$stateParams',
	'SysService',
	Properties
])
.controller('Property', [
	'$state',
	'$stateParams',
	'SysService',
	Property
])
.controller('LocalStorage', [
	'CacheService',
	LocalStorage
])
;

})();

console.log('Sys Module Initialized');