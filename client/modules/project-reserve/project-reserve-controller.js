(function(){
'use strict';

var ProjectReserve = function($state, ProjectReserveService, CacheService, SessionData) {
	console.log('ProjectReserve()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project-reserve')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project-reserve', {
		url: '/project/reserve',
		templateUrl: 'modules/project-reserve/project-reserve.html',
		controllerAs: 'cntlr',
		controller: ProjectReserve,
		security: {
			replaces: null,
			clones: null,
			module: "project-reserve",
			parent: "project",
			priv: {
				admin: "impersonate user view",
				edit: "create and edit own reservations",
				view: "n/a"
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
.controller('ProjectReserve', [
	'$state',
	'ProjectReserveService',
	'CacheService',
	'SessionData',
	ProjectReserve
])
;

})();

console.log('Project Reserve Controller Initialized');