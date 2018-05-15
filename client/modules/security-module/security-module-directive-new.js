(function(){
'use strict';

angular
.module('securityModule')
.directive('newSecurityModule', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-security-module.html'
	};
});

})();

console.log('SecurityModule newSecurityModule Directive Initialized');
