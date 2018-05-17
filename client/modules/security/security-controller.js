(function(){
'use strict';

var Security = function($state, SecurityService, SystemService, CacheService) {
	console.log('$state', $state.get());
	var cntlr = this;

	cntlr.init = SecurityService.init;
};

angular
.module('security')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('security', {
		url: "/security",
		templateUrl: 'modules/security/security.html',
		controllerAs: 'cntlr',
		controller: 'Security',
		newProperty: 'Dude Abides',
		data: {
			security: {
				module: "security",
				parent: "security"
			},
			hotkeys: {
				app: [],
				state: []
			},
		cache: []
		}
	})
	;
}])
.controller('Security', [
	'$state',
	'SecurityService',
	'SystemService',
	'CacheService',
	Security
])
;

})();

console.log('Security Controller Initialized');
