(function(){
'use strict';

angular
.module('securityGroup')
.directive('newSecurityGroup', function() {
	return {
		restrict: 'E',
		templateUrl: 'mi-new-security-group.html'
	};
});

})();

console.log('SecurityGroup newSecurityGroup Directive Initialized');
