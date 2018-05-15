(function(){
'use strict';

var Variable = function($state, VariableService, CacheService) {
	console.log('Variable Controller Called');
	var cntlr = this;
	cntlr.cntlrList     = null;  // All variables list
	cntlr.variables     = null;  // All variables list
	cntlr.nullVariable  = { "id": null, 
							"variable_type_id": null, 
							"variable_type": null, 
							"name": null, 
							"caption": null, 
							"data_type_id": null, 
							"data_type": null, 
							"unit_id": null, 
							"unit": null, 
							"default": null, 
							"constant": false, 
							"inactive": false, 
							"canDelete": true };
	cntlr.variable      = clone(cntlr.nullVariable);  // Seletecd variable

	cntlr.lastVisited  = CacheService.get('variable.lastVisited') || { 'store_item_id': null };

	cntlr.status = 'New';
	cntlr.dude = 'abides';
	cntlr.variableTypes = null;
	cntlr.units = null;
	cntlr.dataTypes = null;
	VariableService.getVariableTypes().then(function (data) { cntlr.variableTypes = data; });
	VariableService.getVariableUnits().then(function (data) { cntlr.units = data; });
	VariableService.getVariableDataTypes().then(function (data) { cntlr.dataTypes = data; });

	function clone(obj) {
	    if (null === obj || "object" != typeof obj) { return obj; }
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}	

	cntlr.new = function() { cntlr.cntlrList.set(null); cntlr.set(null); angular.element('#variableName').focus(); };

	function nextId(list) {
		return list.map(function(i){ return parseInt(i.id); }).reduce(function(a,b){ return Math.max(a, b); }) + 1;
	}
	cntlr.create = function() {
		if (cntlr.variable.name !== null && cntlr.variable.name !== '' ) {
			cntlr.variable.id = nextId(cntlr.cntlrList.variables);
			cntlr.cntlrList.update(cntlr.variable);
		}
	};

	cntlr.set = function(variable) {
		if (variable === null) { 
			cntlr.status = 'New'; 
			cntlr.variable = clone(cntlr.nullVariable);
		} else { 
			cntlr.status = 'Editing'; 
			cntlr.variable = variable;
		} 
	};
};

angular
.module('sopVariable')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('variable', {
		url: "/sop/variable",
		templateUrl: 'modules/sop-variable/sop-variable.html',
		controllerAs: 'cntlr',
		controller: 'Variable',
		security: {
			module: "sop-variable",
			parent: "sop"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'variable.lastVisited', mode: 'localStorage', default: { 'id': 53 } }, 
			{ key: 'variable.test3', mode: 'memory', default: { 'thing': 'stuff' } }
		]
	})
	;
}])
.controller('Variable', [
	'$state',
	'VariableService',
	'CacheService',
	Variable
])
;

})();

console.log('SOP Variable Controller Initialized');

