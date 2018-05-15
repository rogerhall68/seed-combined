(function(){
'use strict';

var List = function($state, ListService, VariableService, CacheService) {
	console.log('List Controller Called');
	var cntlr = this;
	cntlr.cntlrList     = null;  // All lists list
	cntlr.lists         = null;  // All lists list
	cntlr.nullList      = { "id": null, 
							"list_type_id": null, 
							"list_type": null, 
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
	cntlr.list      = clone(cntlr.nullList);  // Seletecd list

	cntlr.lastVisited  = CacheService.get('list.lastVisited') || { 'store_item_id': null };

	cntlr.status = 'New';
	cntlr.dude = 'abides';
	cntlr.listTypes = [
		{ "id": 1, "name": "simple" },
		{ "id": 2, "name": "supplies" }
	];
	cntlr.units = null;
	cntlr.dataTypes = null;
	// ListService.getListTypes().then(function (data) { cntlr.listTypes = data; });
	// ListService.getListUnits().then(function (data) { cntlr.units = data; });
	// ListService.getListDataTypes().then(function (data) { cntlr.dataTypes = data; });
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

	cntlr.new = function() { cntlr.cntlrList.set(null); cntlr.set(null); angular.element('#listName').focus(); };

	function nextId(list) {
		return list.map(function(i){ return parseInt(i.id); }).reduce(function(a,b){ return Math.max(a, b); }) + 1;
	}
	cntlr.create = function() {
		if (cntlr.list.name !== null && cntlr.list.name !== '' ) {
			cntlr.list.id = nextId(cntlr.cntlrList.lists);
			cntlr.cntlrList.update(cntlr.list);
		}
	};

	cntlr.set = function(list) {
		if (list === null) { 
			cntlr.status = 'New'; 
			cntlr.list = clone(cntlr.nullList);
		} else { 
			cntlr.status = 'Editing'; 
			cntlr.list = list;
		} 
	};
};

angular
.module('sopList')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('list', {
		url: "/sop/list",
		templateUrl: 'modules/sop-list/sop-list.html',
		controllerAs: 'cntlr',
		controller: 'List',
		security: {
			module: "sop-list",
			parent: "sop"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'list.lastVisited', mode: 'localStorage', default: { 'id': 53 } }
		]
	})
	;
}])
.controller('List', [
	'$state',
	'ListService',
	'VariableService',
	'CacheService',
	List
])
;

})();

console.log('SOP List Controller Initialized');

