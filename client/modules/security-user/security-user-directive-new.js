(function(){
'use strict';

angular
.module('securityUser')
.directive('newSecurityUser', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-security-user.html'
	};
});

})();

console.log('SecurityUser newSecurityUser Directive Initialized');
