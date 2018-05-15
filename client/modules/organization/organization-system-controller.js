(function(){
'use strict';

var OrganizationSystem = function($state, EditService, CrudService) {
	console.log('OrganizationSystem Controller Called');
	console.log('table_name', $state.current.system.table_name);
	var cntlr = this;

	cntlr.table = { name: $state.current.system.table_name, 
					getData: EditService.getCountries, 
					// attrs: [ { table_label_singular: $state.current.system.caption, is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('organization')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('OrganizationSystem', {
		security: {
			module: "organization-system",
			parent: "organization"
		}
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationBuilding', {
		url: "/organization/building",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'BUILDING', caption: 'Building' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-building",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.building', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationRoom', {
		url: "/organization/room",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'ROOM', caption: 'Room' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-room",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.room', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationLaboratory', {
		url: "/organization/laboratory",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'LABORATORY', caption: 'Laboratory' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-laboratory",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.laboratory', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationDepartment', {
		url: "/organization/department",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'DEPARTMENT', caption: 'Department' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-department",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.department', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationContact', {
		url: "/organization/contact",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'CONTACT', caption: 'Contact' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-contact",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.contact', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organizationGroup', {
		url: "/organization/group",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'OrganizationSystem',
		system: { table_name: 'ORGANIZATION_GROUP', caption: 'Group' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization-group",
			parent: "organization-system"
		},
		cache: [
			{ key: 'organization.group', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.controller('OrganizationSystem', [
	'$state',
	'EditService',
	'CrudService',
	OrganizationSystem
])
;

})();

console.log('Organization System Controller Initialized');