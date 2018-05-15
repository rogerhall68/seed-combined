(function(){
'use strict';

var LinkTest = function($state) {
	console.log('LinkTest Controller Called');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
    });
};

angular
.module('linktest')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('linktest', {
		url: "/linktest",
		templateUrl: 'modules/link-test/link-test.html',
		controllerAs: 'cntlr',
		controller: 'LinkTest'
	})
	;
}])
.controller('LinkTest', [
	'$state',
	LinkTest
])
;

})();

console.log('Link Test Controller Initialized');

