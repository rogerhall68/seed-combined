(function(){
'use strict';

var ProjectRequest = function($state, ProjectRequestService, CacheService, SessionData) {
	console.log('ProjectRequest()');
	var cntlr = this;

	angular.element(document).ready(function () {
        console.log('document ready');
        console.log('SessionData', SessionData.app);
    });
};

angular
.module('project-request')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('project-request', {
		url: '/project/request',
		templateUrl: 'modules/project-request/project-request.html',
		controllerAs: 'cntlr',
		controller: ProjectRequest,
		security: {
			replaces: null,
			clones: null,
			module: "project-request",
			parent: "project-reserve",
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
.controller('ProjectRequest', [
	'$state',
	'ProjectRequestService',
	'CacheService',
	'SessionData',
	ProjectRequest
])
;

})();

console.log('Project Request Controller Initialized');