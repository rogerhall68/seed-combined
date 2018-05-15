(function(){
'use strict';

var Organization = function($state, EditService, CrudService) {
	console.log('Organization Controller Called');
	var cntlr = this;

	cntlr.table = { name: 'ORGANIZATION', 
					// getData: EditService.getCountries, 
					attrs: [ { table_label_singular: 'Organization', is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('organization')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('organization', {
		url: "/organization",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'Organization',
		system: {},
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "organization",
			parent: "organization"
		},
		hotkeys: { app: [], state: [] },
		cache: []
	})
	;
}])
.controller('Organization', [
	'$state',
	'EditService',
	'CrudService',
	Organization
])
;

})();

console.log('Organization Controller Initialized');

