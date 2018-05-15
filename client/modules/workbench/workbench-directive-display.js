(function(){
'use strict';

angular
.module('workbench')
.directive('miWorkbenchDisplay', ['WorkbenchService', 'CacheService', 'StorageService', function(WorkbenchService, CacheService, StorageService) {
	var WorkbenchDisplay = function(WorkbenchService, CacheService, StorageService) {
		console.log('WorkbenchDisplay()');
		var cntlr = this;

		function stashFreezer() {
			cntlr.freezer.moveButtons = cntlr.miMove;
			CacheService.put('freezer.' + cntlr.freezer.id, cntlr.freezer);
		}

		function thisFreezer(data) {
			cntlr.freezer = data;
			console.log('thisFreezer', 'freezer', cntlr.freezer);
			cntlr.miMove = cntlr.freezer.moveButtons;
			console.log('thisFreezer', 'positionIndex', cntlr.freezer.positionIndex);
			StorageService.addPositionIndex(cntlr.freezer.positionIndex);
		}

		function loadFreezer(id) {
			WorkbenchService.getWorkbench(id).then(function (data) { 
				thisFreezer(data);
				console.log('WorkbenchService.getWorkbench(id)', 'data', data);
				CacheService.put('freezer.' + id, data);
			});
		}

		loadFreezer(100362);
	};

	return {
		restrict: 'E',
		templateUrl: 'mi-workbench-display.html',
		scope: {},
		controller: WorkbenchDisplay,
		controllerAs: 'cntlr',
		bindToController: true
	};
}])
;

})();

console.log('Workbench Display Directive Initialized');
