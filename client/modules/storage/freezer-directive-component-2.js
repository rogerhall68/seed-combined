(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerComponent2', ['$state', 'FreezerService', 'CacheService', function($state, FreezerService, CacheService) {

	// var link = function(scope, el, attrs, ctrls) {
	// };

	return {
		restrict: 'E',
		templateUrl: 'mi-freezer-component-2.html',
		// scope: { },
		// controller: FreezerSelect,
		// controllerAs: 'cntlr',
		// bindToController: true,
		// link: link
	};
}])
;

})();

console.log('Freezer Component Directive Initialized');
