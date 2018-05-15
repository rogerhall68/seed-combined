(function(){
'use strict';

var ViewEdit = function($state, CacheService) {
	console.log('ViewEdit()');
	var cntlr = this;

	cntlr.which = false;
	cntlr.value = "default text";

	cntlr.element = {
		"which": false,
		"value": "default text"
	};

	angular.element(document).ready(function () {
        console.log('document ready');
    });
};

angular
.module('viewEdit')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('viewEdit', {
		url: "/viewEdit",
		templateUrl: 'modules/view-edit/view-edit.html',
		controllerAs: 'cntlr',
		controller: 'ViewEdit',
		newProperty: 'Dude Abides'
	})
	;
}])
.controller('ViewEdit', [
	'$state',
	'CacheService',
	ViewEdit
])
;

})();

console.log('ViewEdit Controller Initialized');

