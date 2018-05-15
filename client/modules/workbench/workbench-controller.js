(function(){
'use strict';

var Workbench = function($state, WorkbenchService, CacheService, SessionData) {
	console.log('Workbench()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('workbench')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('workbench', {
		url: '/workbench',
		templateUrl: 'modules/workbench/workbench.html',
		controllerAs: 'cntlr',
		controller: Workbench,
		security: {
			replaces: null,
			clones: null,
			module: "workbench",
			parent: "workbench",
			priv: {
				admin: "This is what admin does for you",
				edit: "Edit does what",
				view: "View thing"
			}
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('Workbench', [
	'$state',
	'WorkbenchService',
	'CacheService',
	'SessionData',
	Workbench
])
;

})();

console.log('Workbench Controller Initialized');