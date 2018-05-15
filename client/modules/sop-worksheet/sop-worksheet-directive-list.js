(function(){
'use strict';

angular
.module('sopWorksheet')
.directive('miWorksheetList', ['$state', 'WorksheetService', 'CacheService', function($state, WorksheetService, CacheService) {
	var WorksheetList = function($state, WorksheetService, CacheService) {
		console.log('WorksheetList Controller Called');
		var cntlr = this;
		cntlr.cntlrPage = null;  // Linked
		cntlr.worksheets = null;  // All worksheets list

		cntlr.set = function(worksheet) { cntlr.worksheet = worksheet; };
		cntlr.select = function(worksheet) { cntlr.cntlrPage.set(worksheet); };
		cntlr.update = function(worksheet) { 
			var found = cntlr.worksheets.filter(function(v){ if (v.id === worksheet.id) { return v; }	}).length;
			if (found === 0) {
				cntlr.worksheets.push(worksheet);
				cntlr.set(worksheet); 
				cntlr.select(worksheet); 
			} else {
				// Update
			}
		};

		// Initialize list of worksheets
		WorksheetService.getWorksheets().then(function (data) { 
			cntlr.worksheets = data; 
			cntlr.cntlrPage.worksheets = data; 
		});
	};

	var link = function(scope, el, attrs, ctrls) {
		var cntlrList = ctrls[0];
		var cntlrPage = scope.$parent.cntlr;
		cntlrList.cntlrPage = cntlrPage;
		cntlrPage.cntlrList = cntlrList;
	};

	return {
		restrict: 'E',
		require: ['miWorksheetList'],
		templateUrl: 'mi-worksheet-list.html',
		scope: true,
		controller: WorksheetList,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('SOP Worksheet List Directive Initialized');
