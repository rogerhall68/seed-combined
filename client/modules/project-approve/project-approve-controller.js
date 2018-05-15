(function(){
'use strict';

var ProjectApprove = function($state, ProjectApproveService, CacheService, SessionData) {
	console.log('ProjectApprove()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project-approve')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project-approve', {
		url: '/project/approve',
		templateUrl: 'modules/project-approve/project-approve.html',
		controllerAs: 'cntlr',
		controller: ProjectApprove,
		security: {
			replaces: null,
			clones: null,
			module: "project-approve",
			parent: "project",
			priv: {
				admin: "n/a",
				edit: "create and edit approvals",
				view: "read approvals"
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
.controller('ProjectApprove', [
	'$state',
	'ProjectApproveService',
	'CacheService',
	'SessionData',
	ProjectApprove
])
;

})();

console.log('Project Approve Controller Initialized');