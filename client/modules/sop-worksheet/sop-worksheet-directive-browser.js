(function(){
'use strict';

angular
.module('sopWorksheet')
.directive('miWorksheetBrowser', ['$rootScope', '$state', 'WorksheetService', 'StorageService', function($rootScope, $state, WorksheetService, StorageService) {
	var WorksheetBrowser = function($rootScope, $state, WorksheetService, StorageService) {
		console.log('WorksheetBrowser Controller Called');
		var cntlr         = this;
		// cntlr.list        = { 'setWorksheet': null, 'setContainer': null };
		// cntlr.navigation  = { 'setWorksheet': null, 'setContainer': null };
		// cntlr.display     = { 'setWorksheet': null, 'setContainer': null };
		// cntlr.favorites   = { 'setWorksheet': null, 'setContainer': null };
		// cntlr.lastVisited = StorageService.loadLastWorksheet();                                                // Cache lastVisited
	
		cntlr.worksheets = null;
		cntlr.worksheet   = null; // Selected worksheet
		cntlr.mantra      = "dude abides";

		// Initialize list of worksheets
		cntlr.worksheets = WorksheetService.getWorksheets().then(function (data) { 
			console.log('worksheets', data);
			cntlr.worksheets = data; 
			// // Set last worksheet
			// if (cntlr.lastVisited.store_item_id > 0) { 
			// 	cntlr.worksheet = cntlr.worksheets.filter(function(element, index, array){ return element.store_item_id === this }, cntlr.lastVisited.store_item_id)[0];
			// } 
		});

		// cntlr.worksheetSelected = function(worksheet) { 
		// 	// console.log('mi-worksheet-browser', 'worksheetSelected', worksheet);
		// 	WorksheetService.getStructure(worksheet.store_item_id).then(function (data) { 
		// 		// StorageService.saveStructure(data);                                                   // Cache worksheet data
		// 		// StorageService.saveLastWorksheet(worksheet);                                                // Cache lastVisited
		// 		cntlr.worksheet = data;
		// 		cntlr.navigation.setWorksheet(cntlr.worksheet);
		// 		cntlr.display.setWorksheet(cntlr.worksheet);
		// 	});
		// };

		// cntlr.containerSelected = function(containerId) { 
		// 	// console.log('mi-worksheet-browser', 'containerSelected', containerId);
		// 	WorksheetService.getContainer(containerId).then(function (data) { 
		// 		StorageService.saveContainer(data);                                                   // Cache worksheet data
		// 		cntlr.container = data;
		// 		cntlr.display.setContainer(cntlr.container);
		// 	});

		// };

		// cntlr.favoriteSelected = function(container) { 
		// 	cntlr.list.setWorksheet(cntlr.worksheet);
		// 	cntlr.navigation.setWorksheet(cntlr.worksheet);
		// 	cntlr.display.setContainer(cntlr.worksheet);
		// };

		// Init worksheet
		// $rootScope.$on('$viewContentLoaded', function() {
		// 	if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
		// 		cntlr.worksheetSelected(cntlr.lastVisited);
		// 	} // TODO: Initial Visit 
		// });

		cntlr.init = function(scope,elem,attr) {
			console.log('!!! cntlr.init !!!', scope, elem, attr);
			console.log('!!! cntlr.init !!!', cntlr.lastVisited);
			// if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
			// 	cntlr.worksheetSelected(cntlr.lastVisited);
			// } // TODO: Initial Visit 
		};
		// if (cntlr.lastVisited.hasOwnProperty('store_item_id')) {
		// 	cntlr.worksheetSelected(cntlr.lastVisited);
		// } // TODO: Initial Visit 

	};

	return {
		// require: ['miWorksheetList', 'miWorksheetNavigation', 'miContainerDisplay', 'miWorksheetFavorites'],
		restrict: 'E',
		templateUrl: 'mi-worksheet-browser.html',
		scope: { },
		controller: WorksheetBrowser,
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

console.log('Worksheet Browser Directive Initialized');
