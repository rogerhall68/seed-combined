(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerList', ['$state', 'FreezerService', 'CacheService', function($state, FreezerService, CacheService) {
	var FreezerList = function($state, FreezerService, CacheService) {
		console.log('FreezerList Controller Called');
		var cntlr = this;
		cntlr.cntlrBrowser = null;  // Linked
		cntlr.freezers     = null;  // All freezers list
		cntlr.freezer      = null;  // Seletecd freezer
		cntlr.lastVisited  = CacheService.get('freezer.lastVisited') || { 'store_item_id': null };

		// Initialize list of freezers
		cntlr.freezers = FreezerService.getFreezers().then(function (data) { 
			cntlr.freezers = data; 
			// Set last freezer
			if (cntlr.lastVisited.store_item_id > 0) { 
				cntlr.freezer = cntlr.freezers.filter(function(element, index, array){ return element.store_item_id === this; }, cntlr.lastVisited.store_item_id)[0];
			} 
		});

		cntlr.selectFreezer = function(id) {
			cntlr.freezer = cntlr.freezers.filter(function(element, index, array){ return element.store_item_id === this; }, id)[0];
			cntlr.cntlrBrowser.freezerSelected(cntlr.freezer);
		};

		cntlr.setFreezer = function(id) {
			cntlr.freezer = cntlr.freezers.filter(function(element, index, array){ return element.store_item_id === this; }, id)[0];
		};
	};

	var link = function(scope, el, attrs, ctrls) {
		console.log('miFreezerList link', ctrls);
		var cntlrBrowser = ctrls[0];
		var cntlrList = ctrls[1];
		cntlrList.cntlrBrowser = cntlrBrowser;
		cntlrBrowser.list.setFreezer = cntlrList.setFreezer;
	};

	return {
		restrict: 'E',
		require: ['^miFreezerBrowser', 'miFreezerList'],
		templateUrl: 'mi-freezer-list.html',
		scope: { },
		controller: FreezerList,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Freezer List Directive Initialized');
