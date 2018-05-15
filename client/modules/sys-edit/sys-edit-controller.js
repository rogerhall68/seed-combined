(function(){
'use strict';

// var SysEdit = function($state, SystemService, SysService, EditService, CacheService) {
var SysEdit = function($state, EditService, CrudService) {
	console.log('SysEdit Controller Called');
	// console.log('$state', $state.get());
	console.log('$state', $state.current.settings.showIds);
	var cntlr = this;

	cntlr.table = { name: 'ADDRESS_COUNTRY', showIds: $state.current.settings.showIds.default };
	CrudService.sysCrud(cntlr.table);
};

angular
.module('sysEdit')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('sysEdit', {
		url: "/sys/edit",
		templateUrl: 'modules/sys-edit/sys-edit.html',
		controllerAs: 'cntlr',
		controller: 'SysEdit',
		newProperty: 'Dude Abides',
		settings: {
			showIds: { priv: 'admin', default: true }         // define settings here initially, user data should have these.
		},
		security: {
			module: "sys-edit",
			parent: "sys"
		},
		hotkeys: { app: [], state: [] },
		cache: []
	})
	;
}])
.controller('SysEdit', [
	'$state',
	// 'SystemService',
	// 'SysService',
	'EditService',
	// 'CacheService',
	'CrudService',
	SysEdit
])
;

})();

console.log('SysEdit Controller Initialized');

