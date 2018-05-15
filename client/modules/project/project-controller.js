(function(){
'use strict';

var Project = function($state, ProjectService, CacheService, SessionData) {
	console.log('Project()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project', {
		url: '/project',
		templateUrl: 'modules/project/project.html',
		controllerAs: 'cntlr',
		controller: Project,
		security: {
			replaces: null,
			clones: null,
			module: "project",
			parent: "project",
			priv: {
				admin: "n/a",
				edit: "n/a",
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
.controller('Project', [
	'$state',
	'ProjectService',
	'CacheService',
	'SessionData',
	Project
])
;

})();

console.log('Project Controller Initialized');