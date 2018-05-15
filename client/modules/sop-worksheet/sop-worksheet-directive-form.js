(function(){
'use strict';

angular
.module('sopWorksheet')
.directive('miWorksheetForm', ['$state', 'WorksheetService', 'CacheService', function($state, WorksheetService, CacheService) {
	// var WorksheetForm = function($state, WorksheetService, CacheService) {
	// 	console.log('WorksheetForm Controller Called');
	// 	var cntlr = this;
	// 	cntlr.cntlrBrowser = null;
	// 	// cntlr.worksheet = null;
	// 	// cntlr.mantra = null;
	// };

	// var link = function(scope, el, attrs, ctrls) {
	// 	console.log('miWorksheetForm link', ctrls);
	// 	var cntlrBrowser = ctrls[0];
	// 	var cntlrForm = ctrls[1];
	// 	cntlrForm.cntlrBrowser = cntlrBrowser;
	// 	// cntlrForm.worksheet = cntlrBrowser.worksheet;
	// 	// cntlrForm.mantra = cntlrBrowser.mantra;
	// 	// cntlrBrowser.worksheet = cntlrForm.worksheet;
	// };

	return {
		restrict: 'E',
		// require: ['^miWorksheetBrowser', 'miWorksheetForm'],
		// templateUrl: 'mi-worksheet-form.html',
		templateUrl: 'mi-worksheet-form.html'
		// scope: { },
		// controller: WorksheetForm,
		// controllerAs: 'cntlr',
		// bindToController: true
		// bindToController: true,
		// link: link
	};
}])
;

})();

console.log('SOP Worksheet Form Directive Initialized');
