(function(){
'use strict';

var Procedure = function($state, ProcedureService, CacheService) {
	console.log('Procedure Controller Called');
	var cntlr = this;

};

angular
.module('sopProcedure')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('procedure', {
		url: "/sop/procedure",
		templateUrl: 'modules/sop-procedure/sop-procedure.html',
		controllerAs: 'cntlr',
		controller: 'Procedure',
		security: {
			module: "sop-procedure",
			parent: "sop"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'procedure.lastVisited', mode: 'localStorage', default: { 'id': 53 } }, 
			{ key: 'procedure.test3', mode: 'memory', default: { 'thing': 'stuff' } }
		]
	})
	;
}])
.controller('Procedure', [
	'$state',
	'ProcedureService',
	'CacheService',
	Procedure
])
;

})();

console.log('SOP Procedure Controller Initialized');

