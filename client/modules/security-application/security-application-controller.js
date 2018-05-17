(function(){
'use strict';

var Applications = function(SecurityApplicationService) {
	var cntlr = this;

	cntlr.applications = null;
	cntlr.application  = null;
	cntlr.modules      = null;
	cntlr.nullVariable = { "app_id": null, "app_active": null, "app_name": null,"canDelete": null };
	cntlr.status       = 'New';

	function clone(obj) {
	    if (null === obj || "object" != typeof obj) { return obj; }
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}	

	cntlr.inactivate = function() { cntlr.application.app_active = false; }
	cntlr.activate   = function() { cntlr.application.app_active = true; }

	cntlr.new = function() {
		console.log('new');
		cntlr.status = 'New'; 
		cntlr.application = clone(cntlr.nullVariable);
	};

	cntlr.select = function() {
		console.log('select');
		cntlr.status = 'Editing'; 
	};

	// Initialize data
	SecurityApplicationService.getApplications().then(function (data) { 
		cntlr.applications = data;
		SecurityApplicationService.getApplicationModules().then(function (data) { 
			cntlr.modules = data;
		});
	});
};

angular
.module('securityApplication')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('application', {
		url: "/security/application",
		templateUrl: 'modules/security-application/security-application.html',
		controllerAs: 'cntlr',
		controller: 'Applications',
		security: {
			module: "security-application",
			parent: "security"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('Applications', [
	'SecurityApplicationService',
	'SecurityModuleService',
	Applications
]);

})();

console.log('SecurityApplication Controller Initialized');
