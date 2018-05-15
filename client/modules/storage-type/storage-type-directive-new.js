(function(){
'use strict';

angular
.module('storageType')
.directive('newStorageType', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-storage-type.html'
	};
});

})();

console.log('StorageType newStorageType Directive Initialized');
