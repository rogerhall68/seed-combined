(function(){
'use strict';

angular
.module('viewEdit')
.directive('miViewEdit', ['$state', 'CacheService', function($state, CacheService) {

	return {
		restrict: 'E',
		templateUrl: 'mi-view-edit.html',
	};
}])
;

})();

console.log('ViewEdit Directive Initialized');
