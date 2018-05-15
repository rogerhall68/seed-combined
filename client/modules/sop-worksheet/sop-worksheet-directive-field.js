(function(){
'use strict';

angular
.module('sopWorksheet')
.directive('miWorksheetField', ['$state', 'WorksheetService', 'CacheService', function($state, WorksheetService, CacheService) {

	return {
		restrict: 'E',
		templateUrl: 'mi-worksheet-field.html'
	};
}])
;

})();

console.log('SOP Worksheet Field Directive Initialized');
