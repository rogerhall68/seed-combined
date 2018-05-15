(function(){
'use strict';

angular
.module('storageConfig')
.directive('newStorageConfig', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-storage-config.html'
	};
});

})();

console.log('StorageConfig newStorageConfig Directive Initialized');
