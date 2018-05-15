(function(){
'use strict';

// var Worksheet = function($state, WorksheetService, SystemService) {
var Worksheet = function($state, WorksheetService, CacheService) {
	console.log('Worksheet Controller Called');
	var cntlr = this;
	cntlr.cntlrList     = null;  // All variables list
	
	cntlr.worksheets   = null;
	cntlr.worksheet    = null;
	cntlr.variableTypes  = null;
	cntlr.variableType   = null;
	cntlr.variableVars   = null;
	cntlr.view         = null;
	cntlr.units        = null;

	cntlr.nullWorksheet  = { "id": null, 
							"worksheet_type_id": null, 
							"worksheet_type": null, 
							"name": null, 
							"caption": null, 
							"variable_type": null, 
							"unit_id": null, 
							"unit": null, 
							"default": null, 
							"constant": false, 
							"inactive": false, 
							"canDelete": true };
	cntlr.worksheet      = clone(cntlr.nullWorksheet);  // Seletecd worksheet

	cntlr.lastVisited  = CacheService.get('worksheet.lastVisited') || { 'store_item_id': null };

	cntlr.status = 'New';

	// Initialize list of worksheets
	WorksheetService.getUnit().then(function (data) { 
		console.log('unit', data);
		cntlr.units = data;
		WorksheetService.getVariableVars().then(function (data) { 
			console.log('variableVars', data);
			cntlr.variableVars = data;
			WorksheetService.getVariableTypes().then(function (data) { 
				console.log('variableTypes', data);
				cntlr.variableTypes = data;
				WorksheetService.getWorksheets().then(function (data) { 
					console.log('worksheets', data);
					cntlr.worksheets = data; 
				});
			});
		});
	});

	function clone(obj) {
	    if (null === obj || "object" != typeof obj) { return obj; }
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}	

	cntlr.new = function() { cntlr.cntlrList.set(null); cntlr.set(null); angular.element('#worksheetName').focus(); };

	function nextId(list) {
		return list.map(function(i){ return parseInt(i.id); }).reduce(function(a,b){ return Math.max(a, b); }) + 1;
	}
	cntlr.create = function() {
		if (cntlr.worksheet.name !== null && cntlr.worksheet.name !== '' ) {
			cntlr.worksheet.id = nextId(cntlr.cntlrList.worksheets);
			cntlr.cntlrList.update(cntlr.worksheet);
		}
	};

	cntlr.set = function(worksheet) {
		if (worksheet === null) { 
			cntlr.status = 'New'; 
			cntlr.worksheet = clone(cntlr.nullWorksheet);
		} else { 
			cntlr.status = 'Editing'; 
			cntlr.worksheet = worksheet;
		} 
	};
		
		// // Set last worksheet
		// if (cntlr.lastVisited.store_item_id > 0) { 
		// 	cntlr.worksheet = cntlr.worksheets.filter(function(element, index, array){ return element.store_item_id === this }, cntlr.lastVisited.store_item_id)[0];
		// } 

	// function buildView() {
	// 	var view = "<form>";
	// 	cntlr.worksheet.rows.forEach(function(row){
	// 		view += "<div>";
	// 		row.forEach(function(field){
	// 			console.log("field", field);
	// 			if (field.constant) {
	// 				view += field.default + " ";
	// 			} else {
	// 				view += field.caption + " ";
	// 			}
	// 			if (field.variable_type_id != null) {
	// 				console.log("adding input", field.variable_type_id);
	// 				// view += "<input type=\"text\"> ";
	// 				view += "<span style=\"border: 1px solid #FFFFFF; width: 40px; height: 20px;\"></span> ";
	// 			}
	// 			if (field.unit_id != null) {
	// 				console.log("adding units", field.unit_id);
	// 				view += field.unit_id + " ";
	// 			}
	// 		});
	// 		view += "</div>";
	// 	});
	// 	view += "</form>";
	// 	cntlr.view = view;
	// }

	cntlr.setWorksheet = function(id) {
		// cntlr.variableType = cntlr.variableTypes.filter(function(ct){
		// 	return ct.id === id;
		// })[0];
	};

	// cntlr.selectWorksheet = function(id) {
	// 	// console.log("selectWorksheet", id, cntlr.worksheet.variable_type_id);
	// 	cntlr.setVariableType(cntlr.worksheet.variable_type_id);
	// 	buildView();
	// 	// cntlr.worksheet.variable_type_id = id;
	// };

	cntlr.setVariableType = function(id) {
		// console.log("selectVariableType", id, cntlr.worksheet.variable_type_id, cntlr.variableTypes, cntlr.variableTypes.filter(function(ct){return ct.id == id})[0] );
		cntlr.variableType = cntlr.variableTypes.filter(function(ct){
			return ct.id == id;
		})[0];
	};

	cntlr.selectVariableType = function(id) {
		// console.log("selectVariableType", id, cntlr.worksheet.variable_type_id);
		cntlr.worksheet.variable_type_id = id;
	};

};

angular
.module('sopWorksheet')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('worksheet', {
		url: "/sop/worksheet",
		templateUrl: 'modules/sop-worksheet/sop-worksheet.html',
		controllerAs: 'cntlr',
		controller: 'Worksheet',
		security: {
			module: "sop-worksheet",
			parent: "sop"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'worksheet.variable.types', mode: 'localStorage', default: { 'id': null } }, 
			{ key: 'worksheet.variable.vars', mode: 'localStorage', default: { 'id': null } }, 
			{ key: 'worksheet.variable.units', mode: 'localStorage', default: { 'id': null } }, 
			{ key: 'worksheet.lastVisited', mode: 'localStorage', default: { 'id': 53 } }, 
			{ key: 'worksheet.test3', mode: 'memory', default: { 'thing': 'stuff' } }
		]
	})
	;
}])
.controller('Worksheet', [
	'$state',
	'WorksheetService',
	// 'SystemService',
	'CacheService',
	Worksheet
])
;

})();

console.log('SOP Worksheet Controller Initialized');

