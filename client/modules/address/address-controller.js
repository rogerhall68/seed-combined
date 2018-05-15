(function(){
'use strict';

var Address = function($state, EditService, CrudService) {
	console.log('Address Controller Called');
	var cntlr = this;

	cntlr.table = { name: 'ADDRESS', 
					// getData: EditService.getCountries, 
					attrs: [ { table_label_singular: 'Address', is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('address')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('address', {
		url: "/address",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'Address',
		system: {},
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "address",
			parent: "address"
		},
		hotkeys: { app: [], state: [] },
		cache: []
	})
	;
}])
.controller('Address', [
	'$state',
	'EditService',
	'CrudService',
	Address
])
;

})();

console.log('Address Controller Initialized');

