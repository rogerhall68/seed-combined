(function(){
'use strict';

var SOP = function($state, SOPService, ProcedureService, CacheService) {
	console.log('SOP Controller Called');
	var cntlr = this;
	cntlr.cntlrList = null;  // All sops list
	cntlr.sops     	= null;  // All sops list
	cntlr.nullSOP  	= { "id": null, 
						"sop_type_id": null, 
						"sop_type": null, 
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
	cntlr.sop      = clone(cntlr.nullSOP);  // Seletecd sop

	// cntlr.lastVisited  = CacheService.get('sop.lastVisited') || { 'store_item_id': null };

	cntlr.status = 'New';
	cntlr.procedures = null;
	ProcedureService.getProcedures().then(function (data) { cntlr.procedures = data; });

	// cntlr.dude = 'abides';
	// cntlr.sopTypes = null;
	// cntlr.units = null;
	// cntlr.dataTypes = null;
	// SOPService.getSOPTypes().then(function (data) { cntlr.sopTypes = data; });
	// SOPService.getSOPUnits().then(function (data) { cntlr.units = data; });
	// SOPService.getSOPDataTypes().then(function (data) { cntlr.dataTypes = data; });

	function clone(obj) {
	    if (null === obj || "object" !== typeof obj) { return obj; }
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}	

	cntlr.new = function() { cntlr.cntlrList.set(null); cntlr.set(null); angular.element('#sopName').focus(); };

	function nextId(list) {
		return list.map(function(i){ return parseInt(i.id); }).reduce(function(a,b){ return Math.max(a, b); }) + 1;
	}
	cntlr.create = function() {
		if (cntlr.sop.name !== null && cntlr.sop.name !== '' ) {
			cntlr.sop.id = nextId(cntlr.cntlrList.sops);
			cntlr.cntlrList.update(cntlr.sop);
		}
	};

	cntlr.set = function(sop) {
		if (sop === null) { 
			cntlr.status = 'New'; 
			cntlr.sop = clone(cntlr.nullSOP);
		} else { 
			cntlr.status = 'Editing'; 
			cntlr.sop = sop;
		} 
	};
};

angular
.module('sop')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('sop', {
		url: "/sop",
		templateUrl: 'modules/sop/sop.html',
		controllerAs: 'cntlr',
		controller: 'SOP',
		security: {
			module: "sop",
			parent: "sop"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'sop.lastVisited', mode: 'localStorage', default: { 'id': 53 } }, 
			{ key: 'sop.test3', mode: 'memory', default: { 'thing': 'stuff' } }
		]
	})
	;
}])
.controller('SOP', [
	'$state',
	'SOPService',
	'ProcedureService',
	'CacheService',
	SOP
])
;

})();

console.log('SOP Controller Initialized');

