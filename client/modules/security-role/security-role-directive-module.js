(function(){
'use strict';

angular
.module('securityRole')
.directive('miModulePrivileges', ['$state', 'SecurityRoleService', 'CacheService', function($state, SecurityRoleService, CacheService) {

	// var link = function(scope, el, attrs, ctrls) {
	// };

	return {
		restrict: 'E',
		templateUrl: 'mi-module-privileges.html',
		// scope: { },
		// controller: RoleSelect,
		// controllerAs: 'cntlr',
		// bindToController: true,
		// link: link
	};
}])
;

})();

console.log('Role Module Directive Initialized');
