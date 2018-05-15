(function(){
'use strict';

var AddressSystem = function($state, EditService, CrudService) {
	console.log('AddressSystem Controller Called');
	console.log('table_name', $state.current.system.table_name);
	var cntlr = this;

	cntlr.table = { name: $state.current.system.table_name, 
					getData: EditService.getCountries, 
					// attrs: [ { table_label_singular: $state.current.system.caption, is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('address')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('AddressSystem', {
		security: {
			module: "address-system",
			parent: "address"
		}
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('addressCountry', {
		url: "/address/country",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'AddressSystem',
		system: { table_name: 'ADDRESS_COUNTRY', caption: 'Country' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "address-country",
			parent: "address-system"
		},
		cache: [
			{ key: 'address.country', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('addressUSStates', {
		url: "/address/us-states",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'AddressSystem',
		system: { table_name: 'ADDRESS_US_STATES', caption: 'US States' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "address-us-states",
			parent: "address-system"
		},
		cache: [
			{ key: 'address.us-states', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('addressFormat', {
		url: "/address/format",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'AddressSystem',
		system: { table_name: 'ADDRESS_FORMAT', caption: 'Format' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "address-format",
			parent: "address-system"
		},
		cache: [
			{ key: 'address.format', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.controller('AddressSystem', [
	'$state',
	'EditService',
	'CrudService',
	AddressSystem
])
;

})();

console.log('Address System Controller Initialized');