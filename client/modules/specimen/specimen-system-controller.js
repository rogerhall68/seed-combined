(function(){
'use strict';

var SpecimenSystem = function($state, EditService, CrudService) {
	console.log('SpecimenSystem Controller Called');
	console.log('table_name', $state.current.system.table_name);
	var cntlr = this;

	cntlr.table = { name: $state.current.system.table_name, 
					getData: EditService.getCountries, 
					// attrs: [ { table_label_singular: $state.current.system.caption, is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('specimen')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('SpecimenSystem', {
		security: {
			module: "specimen-system",
			parent: "specimen"
		}
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenClass', {
		url: "/specimen/class",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_CLASS', caption: 'Class' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-class",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.class', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenDistributionType', {
		url: "/specimen/distribution-type",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_DISTRIBUTION_TYPE', caption: 'Distribution Type' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-distribution-type",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.distribution-type', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenGroup', {
		url: "/specimen/group",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_GROUP', caption: 'Group' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-group",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.group', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenLineage', {
		url: "/specimen/lineage",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_LINEAGE', caption: 'Lineage' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-lineage",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.lineage', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenReservationType', {
		url: "/specimen/reservation-type",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_RESERVATION_TYPE', caption: 'Reservation Type' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-reservation-type",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.reservation-type', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenStatus', {
		url: "/specimen/status",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_STATUS', caption: 'Status' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-status",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.status', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimenType', {
		url: "/specimen/type",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SpecimenSystem',
		system: { table_name: 'SPECIMEN_TYPE', caption: 'Type' },
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen-type",
			parent: "specimen-system"
		},
		cache: [
			{ key: 'specimen.type', mode: 'sessionStorage', default: {} }
		]
	})
	;
}])
.controller('SpecimenSystem', [
	'$state',
	'EditService',
	'CrudService',
	SpecimenSystem
])
;

})();

console.log('Specimen System Controller Initialized');