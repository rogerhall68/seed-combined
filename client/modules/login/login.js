 (function(){
'use strict';

var LoginCtrl = function($state, $rootScope, SecurityService, SessionService) {
	var cntlr = this;
	cntlr.disable = false;
	cntlr.enter = function(event){
		if (event.which === 13) { cntlr.login(); }
	};
	cntlr.login = function(){
		var data = {
			name: cntlr.name,
			password: cntlr.password
		};
		SecurityService.login(data, function(result) {
			SecurityService.loadSession(cntlr.name, function(sessionData) {
				SessionService.set(sessionData);
				console.log('SessionService.lastState()', SessionService.lastState());
				$state.go(SessionService.lastState());
			});			
		});
	};
	SessionService.lo();
	console.log("LoginCtrl INIT");
};

angular
.module('login', [])

.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('login', {
		url: '/lo',
		templateUrl: 'modules/login/login.html',
		controllerAs: 'cntlr',
		controller: 'LoginCtrl',
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'session', mode: 'sessionStorage', default: {} }
		]
	});
}])

.controller('LoginCtrl', [
	'$state',
	'$rootScope',
	'SecurityService',
	'SessionService',
	LoginCtrl
]);

})();

console.log('Login Module Initialized');