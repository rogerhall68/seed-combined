(function(){
'use strict';

angular
.module('securityApplication')
.directive('newSecurityApplication', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-security-application.html'
	};
});

})();

console.log('SecurityApplication newSecurityApplication Directive Initialized');
