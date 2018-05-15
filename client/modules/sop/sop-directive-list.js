(function(){
'use strict';

angular
.module('sop')
.directive('miSopList', ['$state', 'SOPService', 'CacheService', function($state, SOPService, CacheService) {
	var SOPList = function($state, SOPService, CacheService) {
		console.log('SOPList Controller Called');
		var cntlr = this;
		cntlr.cntlrPage = null;  // Linked
		cntlr.sops     = null;  // All sops list
		// cntlr.sop      = null;  // Seletecd sop
		// cntlr.lastVisited  = CacheService.get('sop.lastVisited') || { 'store_item_id': null };

		cntlr.set = function(sop) { cntlr.sop = sop; };
		cntlr.select = function(sop) { cntlr.cntlrPage.set(sop); };
		cntlr.update = function(sop) { 
			var found = cntlr.sops.filter(function(v){ if (v.id === sop.id) { return v; }	}).length;
			if (found === 0) {
				cntlr.sops.push(sop);
				cntlr.set(sop); 
				cntlr.select(sop); 
			} else {
				// Update
			}
		};

		// Initialize list of sops
		SOPService.getSOPs().then(function (data) { 
			cntlr.sops = data; 
			cntlr.cntlrPage.sops = data; 
			// Set last sop
			// if (cntlr.lastVisited.store_item_id > 0) { 
			// 	cntlr.sop = cntlr.sops.filter(function(element, index, array){ return element.store_item_id === this }, cntlr.lastVisited.store_item_id)[0];
			// } 
		});

		// cntlr.selectSOP = function(id) {
		// 	cntlr.sop = cntlr.sops.filter(function(element, index, array){ return element.id === this }, id)[0];
		// 	// cntlr.cntlrBrowser.sopSelected(cntlr.sop);
		// };

		// cntlr.setSOP = function(id) {
		// 	cntlr.sop = cntlr.sops.filter(function(element, index, array){ return element.store_item_id === this }, id)[0];
		// };
	};

	// var link = function(scope, el, attrs, ctrls) {
	// 	console.log('miSopList link', ctrls);
	// 	var cntlrBrowser = ctrls[0];
	// 	var cntlrList = ctrls[1];
	// 	cntlrList.cntlrBrowser = cntlrBrowser;
	// 	cntlrBrowser.list.setSOP = cntlrList.setSOP;
	// };

	var link = function(scope, el, attrs, ctrls) {
		var cntlrList = ctrls[0];
		var cntlrPage = scope.$parent.cntlr;
		cntlrList.cntlrPage = cntlrPage;
		cntlrPage.cntlrList = cntlrList;
	};

	return {
		restrict: 'E',
		require: ['miSopList'],
		templateUrl: 'mi-sop-list.html',
		scope: true,
		controller: SOPList,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('SOP List Directive Initialized');
