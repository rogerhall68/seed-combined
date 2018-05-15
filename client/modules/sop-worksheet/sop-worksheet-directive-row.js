(function(){
'use strict';

angular
.module('sopWorksheet')
.directive('miWorksheetRow', ['$state', 'WorksheetService', 'CacheService', function($state, WorksheetService, CacheService) {

	return {
		restrict: 'E',
		templateUrl: 'mi-worksheet-row.html'
	};
}])
;

})();

console.log('SOP Worksheet Row Directive Initialized');
