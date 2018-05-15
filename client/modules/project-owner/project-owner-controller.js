(function(){
'use strict';

var ProjectOwner = function($state, ProjectOwnerService, CacheService, SessionData) {
	console.log('ProjectOwner()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project-owner')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project-owner', {
		url: '/project/owner',
		templateUrl: 'modules/project-owner/project-owner.html',
		controllerAs: 'cntlr',
		controller: ProjectOwner,
		security: {
			replaces: null,
			clones: null,
			module: "project-owner",
			parent: "project-request",
			priv: {
				admin: "impersonate user view",
				edit: "create and edit own projects",
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
.controller('ProjectOwner', [
	'$state',
	'ProjectOwnerService',
	'CacheService',
	'SessionData',
	ProjectOwner
])
;

})();

console.log('Project Owner Controller Initialized');