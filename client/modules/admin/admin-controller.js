(function(){
'use strict';

var Admin = function($state, SecurityService, SystemService, CacheService) {
	console.log('Admin Controller Called');
	console.log('$state', $state.get());
	var cntlr = this;

	cntlr.init = SecurityService.init;
};

angular
.module('admin')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('admin', {
		url: "/admin",
		templateUrl: 'modules/admin/admin.html',
		controllerAs: 'cntlr',
		controller: 'Admin',
		security: {
			module: "admin-browser",
			parent: "admin"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('Admin', [
	'$state',
	'SecurityService',
	'SystemService',
	'CacheService',
	Admin
])
;

})();

console.log('Admin Controller Initialized');
