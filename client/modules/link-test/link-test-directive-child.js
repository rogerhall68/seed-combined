(function(){
'use strict';

angular
.module('linktest')
.directive('miLinkTestChild', ['$state', function($state) {
	var LinkTestChild = function($state) {
		console.log('LinkTestChild Controller Called');
		var cntlr  = this;
		cntlr.data = null;

		cntlr.setLinkTest = function(data) {
			cntlr.data.things = data;
		};
	};

	var link = function(scope, el, attrs, ctrls) {
		console.log('miLinkTestChild link', ctrls);
		var cntlrParent = ctrls[0];
		var cntlrChild = ctrls[1];

		cntlrParent.child.setLinkTest   = cntlrChild.setLinkTest;
	};

	return {
		restrict: 'E',
		require: ['^miLinkTestParent', 'miLinkTestChild'],
		templateUrl: 'mi-link-test-child.html',
		scope: {},
		controller: LinkTestChild,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Link Test Child Directive Initialized');
