(function() {
'use strict';

angular
.module('tmiApp', [
	 'ui.router',
	 'ngTouch',
	 'ngAnimate',
	 'ui.grid',
	 'ui.bootstrap',
	 'nya.bootstrap.select',
	 'cfp.hotkeys',
	 'angular-cache',
	 'ngSanitize',
	 'toaster',
	 'linktest',
	 'address',
	 'login',
	 'workbench',
	 'freezer',
	 'organization',
	 'securityGroup',
	 'securityModule',
	 'securityRole',
	 'securityUser',
	 'specimen',
	 // 'storage',
	 'sop',
	 'sopProcedure',
	 'sopWorksheet',
	 'sopVariable',
	 'sopList',
	 'storageBuilder',
	 'storageConfig',
	 'storageType',
	 'admin',
	 'sys',
	 'sysProfile',
	 'sysMeta',
	 'sysEdit',
	 'viewEdit'
])
.config([
	'$urlRouterProvider', function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/lo');
	}
])
.constant('cacheName', 'edu.uams.tmyi')
.constant('apiName', 'tmyi')
// .constant('apiDomain', 'http://localhost:8081/api')
.constant('apiDomain', 'http://dmirt037:8081/api')
.run(function($rootScope, $state, $location, hotkeys, CacheService) {
	$state.get().forEach(function(s){
		// console.log('state', s);

		// Add app level hotkeys from each state
		if (s.data && s.data.hotkeys && s.data.hotkeys.app) {
		    s.data.hotkeys.app.forEach(function(hk){
		    	// console.log('hk', hk);
				hotkeys.bindTo($rootScope)
				.add({
				    combo: hk.combo,
				    description: hk.description,
				    callback: function() { $location.path(hk.path); }
				});
		    });
		}
		// Add cache keys from each state
		if (s.cache) { CacheService.init(s.cache); }

		// // Module name
		// if (s.security) {
		// 	console.log('module', s.security.module, 'parent', s.security.parent);
		// }
	});

	// Add roles from each module

})
// .directive('autoFocus', function($timeout) {
//     return {
//         link: function(_scope, _element) {
//             $timeout(function(){
//                 _element[0].nativeElement.focus();
//             }, 100);
//         }
//     };
// })
.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
})
;

})();

console.log('tmiApp Initialized');