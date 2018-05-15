(function(){
'use strict';

var SysProfile = function($state, SystemService, CacheService) {
	console.log('SysProfile Controller Called');
	console.log('$state', $state.get());
	var cntlr = this;

	// cntlr.init = SecurityService.init;
};

angular
.module('sysProfile')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('sysProfile', {
		url: "/sys/profile",
		templateUrl: 'modules/sys-profile/sys-profile.html',
		controllerAs: 'cntlr',
		controller: 'SysProfile',
		security: {
			module: "sys-profile",
			parent: "sys"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('SysProfile', [
	'$state',
	'SystemService',
	'CacheService',
	SysProfile
])
;

})();

console.log('SysProfile Controller Initialized');
