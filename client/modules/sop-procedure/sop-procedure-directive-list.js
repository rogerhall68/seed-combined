(function(){
'use strict';

angular
.module('sopProcedure')
.directive('miProcedureList', ['$state', 'ProcedureService', 'CacheService', function($state, ProcedureService, CacheService) {
	var ProcedureList = function($state, ProcedureService, CacheService) {
		console.log('ProcedureList Controller Called');
		var cntlr = this;
		cntlr.cntlrBrowser = null;  // Linked
		cntlr.procedures     = null;  // All procedures list
		cntlr.procedure      = null;  // Seletecd procedure
		cntlr.lastVisited  = CacheService.get('procedure.lastVisited') || { 'store_item_id': null };

		// Initialize list of procedures
		cntlr.procedures = ProcedureService.getProcedures().then(function (data) { 
			cntlr.procedures = data; 
			// Set last procedure
			if (cntlr.lastVisited.store_item_id > 0) { 
				cntlr.procedure = cntlr.procedures.filter(function(element, index, array){ return element.store_item_id === this; }, cntlr.lastVisited.store_item_id)[0];
			} 
		});

		cntlr.selectProcedure = function(id) {
			cntlr.procedure = cntlr.procedures.filter(function(element, index, array){ return element.id === this; }, id)[0];
			// cntlr.cntlrBrowser.procedureSelected(cntlr.procedure);
		};

		cntlr.setProcedure = function(id) {
			cntlr.procedure = cntlr.procedures.filter(function(element, index, array){ return element.store_item_id === this; }, id)[0];
		};
	};

	// var link = function(scope, el, attrs, ctrls) {
	// 	console.log('miProcedureList link', ctrls);
	// 	var cntlrBrowser = ctrls[0];
	// 	var cntlrList = ctrls[1];
	// 	cntlrList.cntlrBrowser = cntlrBrowser;
	// 	cntlrBrowser.list.setProcedure = cntlrList.setProcedure;
	// };

	return {
		restrict: 'E',
		// require: ['^miProcedureBrowser', 'miProcedureList'],
		templateUrl: 'mi-procedure-list.html',
		scope: { },
		controller: ProcedureList,
		controllerAs: 'cntlr',
		bindToController: true
		// bindToController: true,
		// link: link
	};
}])
;

})();

console.log('SOP Procedure List Directive Initialized');
