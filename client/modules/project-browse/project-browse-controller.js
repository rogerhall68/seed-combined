(function(){
'use strict';

var ProjectBrowse = function($state, ProjectBrowseService, CacheService, SessionData) {
	console.log('ProjectBrowse()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project-browse')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project-browse', {
		url: '/project/browse',
		templateUrl: 'modules/project-browse/project-browse.html',
		controllerAs: 'cntlr',
		controller: ProjectBrowse,
		security: {
			replaces: null,
			clones: null,
			module: "project-browse",
			parent: "project",
			priv: {
				admin: "n/a",
				edit: "n/a",
				view: "can read projects, requests, and reservations"
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
.controller('ProjectBrowse', [
	'$state',
	'ProjectBrowseService',
	'CacheService',
	'SessionData',
	ProjectBrowse
])
;

})();

console.log('Project Browse Controller Initialized');