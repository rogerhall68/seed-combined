(function(){
'use strict';

angular
.module('freezer')
.directive('miContainerDisplay', ['$rootScope', 'CacheService', 'FreezerService', function($rootScope, CacheService, FreezerService) {
	function ContainerDisplay($rootScope) {
		console.log('ContainerDisplay Controller Called');
		var cntlr = this;
		cntlr.container = null;
		cntlr.miMove = null;
			
		cntlr.setContainer = function(container) {
			// console.log('mi-container-display', 'setContainer', container);
			// $rootScope.miMove = container.moveButtons;
			// console.log('mi-container-display', '$rootScope.miMove', $rootScope.miMove);
			cntlr.container = container;
			// cntlr.miMove = container.moveButtons;
		};

		cntlr.setFreezer = function(freezer) {
			// console.log('mi-container-display', 'setFreezer', freezer);
			var lastContainers = CacheService.get('freezer.lastContainers');
			var containerId = lastContainers[freezer.id];

			FreezerService.getContainer(containerId).then(function (data) { 
				cntlr.setContainer(data);
			});
		};
	}

	var link = function(scope, el, attrs, ctrls) {
		console.log('miContainerDisplay link', ctrls);
		var cntlrBrowser = ctrls[0];
		var cntlrDisplay = ctrls[1];

		cntlrBrowser.display.setFreezer   = cntlrDisplay.setFreezer;
		cntlrBrowser.display.setContainer = cntlrDisplay.setContainer;
		// console.log('miContainerDisplay link', cntlrBrowser.display.setContainer);
	};

	return {
		restrict: 'E',
		require: ['^miFreezerBrowser', 'miContainerDisplay'],
		templateUrl: 'mi-container-display.html',
		scope: { },
		controller: ContainerDisplay,
		controllerAs: 'cntlr',
		bindToController: true,
		link: { pre: link }
	};
}])
;

})();

console.log('Freezer Container Display Directive Initialized');
