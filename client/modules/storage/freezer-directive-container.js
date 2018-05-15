(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerContainer', ['$state', 'FreezerService', 'CacheService', function($state, FreezerService, CacheService) {

	// var link = function(scope, el, attrs, ctrls) {
	// };

	return {
		restrict: 'E',
		templateUrl: 'mi-freezer-container.html',
		// scope: { },
		// controller: FreezerSelect,
		// controllerAs: 'cntlr',
		// bindToController: true,
		// link: link
	};
}])
;

})();

console.log('Freezer Container Directive Initialized');
