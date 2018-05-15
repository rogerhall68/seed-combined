(function(){
'use strict';

var SysMeta = function($state, SystemService, CacheService) {
	console.log('SysMeta Controller Called');
	console.log('$state', $state.get());
	var cntlr = this;

	// cntlr.init = SecurityService.init;
};

angular
.module('sysMeta')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('sysMeta', {
		url: "/sys/meta",
		templateUrl: 'modules/sys-meta/sys-meta.html',
		controllerAs: 'cntlr',
		controller: 'SysMeta',
		security: {
			module: "sys-meta",
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
.controller('SysMeta', [
	'$state',
	'SystemService',
	'CacheService',
	SysMeta
])
;

})();

console.log('SysMeta Controller Initialized');
