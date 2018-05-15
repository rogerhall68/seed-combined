(function(){
'use strict';

angular
.module('storageBuilder')
.directive('newStorageBuilder', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-storage-builder.html'
	};
});

})();

console.log('StorageBuilder newStorageBuilder Directive Initialized');
