(function(){
'use strict';

angular
.module('sopVariable')
.directive('miVariableList', ['$state', 'VariableService', 'CacheService', function($state, VariableService, CacheService) {
	var VariableList = function($state, VariableService, CacheService) {
		console.log('VariableList Controller Called');
		var cntlr = this;
		cntlr.cntlrPage = null;  // Linked
		cntlr.variables = null;  // All variables list

		cntlr.set = function(variable) { cntlr.variable = variable; };
		cntlr.select = function(variable) { cntlr.cntlrPage.set(variable); };
		cntlr.update = function(variable) { 
			var found = cntlr.variables.filter(function(v){ if (v.id === variable.id) { return v; }	}).length;
			if (found === 0) {
				cntlr.variables.push(variable);
				cntlr.set(variable); 
				cntlr.select(variable); 
			} else {
				// Update
			}
		};

		// Initialize list of variables
		VariableService.getVariables().then(function (data) { 
			cntlr.variables = data; 
			cntlr.cntlrPage.variables = data; 
		});
	};

	var link = function(scope, el, attrs, ctrls) {
		var cntlrList = ctrls[0];
		var cntlrPage = scope.$parent.cntlr;
		cntlrList.cntlrPage = cntlrPage;
		cntlrPage.cntlrList = cntlrList;
	};

	return {
		restrict: 'E',
		require: ['miVariableList'],
		templateUrl: 'mi-variable-list.html',
		scope: true,
		controller: VariableList,
		controllerAs: 'cntlr',
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('SOP Variable List Directive Initialized');
