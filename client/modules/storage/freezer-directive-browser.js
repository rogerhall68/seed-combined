(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerBrowser', ['$rootScope', '$state', 'FreezerService', 'StorageService', function($rootScope, $state, FreezerService, StorageService) {
	var FreezerBrowser = function($rootScope, $state, FreezerService, StorageService) {
		console.log('FreezerBrowser Controller Called');
		var cntlr         = this;
		cntlr.freezer     = null; // Selected freezer
		cntlr.list        = { 'setFreezer': null, 'setContainer': null };
		cntlr.navigation  = { 'setFreezer': null, 'setContainer': null };
		cntlr.display     = { 'setFreezer': null, 'setContainer': null };
		cntlr.favorites   = { 'setFreezer': null, 'setContainer': null };
		cntlr.lastVisited = StorageService.loadLastFreezer();                                                // Cache lastVisited
		console.log('cntlr.lastVisited', cntlr.lastVisited);

		cntlr.freezerSelected = function(freezer) { 
			// console.log('mi-freezer-browser', 'freezerSelected', freezer);
			FreezerService.getStructure(freezer.store_item_id).then(function (data) { 
				console.log("GOT STRUCTURE");
				StorageService.saveStructure(data);                                                   // Cache freezer data
				StorageService.saveLastFreezer(freezer);                                                // Cache lastVisited
				cntlr.freezer = data;
				cntlr.navigation.setFreezer(cntlr.freezer);
				cntlr.display.setFreezer(cntlr.freezer);
			});
		};

		cntlr.containerSelected = function(containerId) { 
			// console.log('mi-freezer-browser', 'containerSelected', containerId);
			FreezerService.getContainer(containerId).then(function (data) { 
				StorageService.saveContainer(data);                                                   // Cache freezer data
				cntlr.container = data;
				cntlr.display.setContainer(cntlr.container);
			});

		};

		cntlr.favoriteSelected = function(container) { 
			cntlr.list.setFreezer(cntlr.freezer);
			cntlr.navigation.setFreezer(cntlr.freezer);
			cntlr.display.setContainer(cntlr.freezer);
		};

		// Init freezer
		// $rootScope.$on('$viewContentLoaded', function() {
		// 	if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
		// 		cntlr.freezerSelected(cntlr.lastVisited);
		// 	} // TODO: Initial Visit 
		// });

		cntlr.init = function(scope,elem,attr) {
			// console.log('!!! cntlr.init !!!', scope, elem, attr);
			// console.log('!!! cntlr.init !!!', cntlr.lastVisited);
			if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
				cntlr.freezerSelected(cntlr.lastVisited);
			} // TODO: Initial Visit 
		};
		// if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
		// 	cntlr.freezerSelected(cntlr.lastVisited);
		// } // TODO: Initial Visit 

	};

	return {
		// require: ['miFreezerList', 'miFreezerNavigation', 'miContainerDisplay', 'miFreezerFavorites'],
		restrict: 'E',
		templateUrl: 'mi-freezer-browser.html',
		scope: { },
		controller: FreezerBrowser,
		controllerAs: 'cntlr',
		bindToController: true,
		link: { post: function(scope,elem,attr) {
			// console.log('link post', scope, elem, attr);
			// console.log('scope cntlr', scope.cntlr);
			scope.cntlr.init(scope, elem, attr);
		}}
	};
}])
;

})();

console.log('Freezer Browser Directive Initialized');
