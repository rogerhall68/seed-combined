(function(){
'use strict';

angular
.module('linktest')
.directive('miLinkTestParent', ['$state', function($state) {
	var LinkTestParent = function($state) {
		console.log('LinkTestParent Controller Called');
		var cntlr   = this;
		cntlr.data  = { things: ['one', 'two', 'three'] };
		cntlr.child = { 'setLinkTest': null };

		cntlr.linkTest = function(data) { 
			console.log('LinkTest Parent', 'linkTest', data);
			cntlr.child.setLinkTest(data.things);
		};

		// Init
		cntlr.linkTest(cntlr.data);
	};

	return {
		restrict: 'E',
		templateUrl: 'mi-link-test-parent.html',
		scope: { },
		controller: LinkTestParent,
		controllerAs: 'cntlr',
		bindToController: true
	};
}])
;

})();

console.log('Link Test Parent Directive Initialized');
