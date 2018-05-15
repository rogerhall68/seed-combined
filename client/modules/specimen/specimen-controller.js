(function(){
'use strict';

var Specimen = function($state, EditService, CrudService) {
	console.log('Specimen Controller Called');
	var cntlr = this;

	cntlr.table = { name: 'SPECIMEN', 
					// getData: EditService.getCountries, 
					attrs: [ { table_label_singular: 'Specimen', is_primary_key: true } ],
					showIds: $state.current.settings.showIds.default };

	CrudService.sysCrud(cntlr.table);
};

angular
.module('specimen')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('specimen', {
		url: "/specimen",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'Specimen',
		system: {},
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "specimen",
			parent: "specimen"
		},
		hotkeys: { app: [], state: [] },
		cache: []
	})
	;
}])
.controller('Specimen', [
	'$state',
	'EditService',
	'CrudService',
	Specimen
])
;

})();

console.log('Specimen Controller Initialized');

