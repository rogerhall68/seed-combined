(function(){
'use strict';

angular
.module('tmiApp')
.controller('App', ['$window', '$rootScope', '$location', '$state', 'hotkeys', 'toaster', 'CacheService', 'SessionData', 'SessionService', function($window, $rootScope, $location, $state, hotkeys, toaster, CacheService, SessionData, SessionService) {
    $rootScope.miPop = function(type, text, title){
        toaster.pop(type, title, text);
    };

    $rootScope.visibleNav = true;
    $rootScope.tmi_session = SessionData;

    $rootScope.windowWidth = $window.innerWidth;
	angular.element($window).bind('resize', function () {
	    console.log("Window width: " + $window.innerWidth);
	    $rootScope.windowWidth = $window.innerWidth;
	});

	angular.element($window).bind('mousemove', function (event) {
	    // console.log("Mouse move: ");
	    // console.log(event);
	    $rootScope.mousePosition = { x: event.pageX, y: event.pageY };
	    // console.log($rootScope.mousePosition);
	    // $rootScope.windowWidth = $window.innerWidth;
	});

	hotkeys.bindTo($rootScope)
	.add({
	    combo: 'y',
	    description: 'System',
	    callback: function() { $location.path('/sys'); }
	})
	;

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
		console.log(event, toState, toParams, fromState, fromParams, options);
		//
		// authNZ
		//
		if (toState.url !== "/lo") {
			// Reloads sessionData from sessionStorage when refreshing tab
			if (SessionData.user_token === null || SessionData.user_token === undefined) {
				var sessionData = CacheService.get('session'); 
				console.log('sessionData', sessionData);
				// if (sessionData !== {} && sessionData.user_token !== undefined) {
				// if (sessionData !== {}) {
				if (sessionData.hasOwnProperty('user_token') && sessionData.user_token !== null && sessionData.user_token !== undefined) {
					SessionService.set(sessionData);
				} else {
					console.log('state.go.login');
					event.preventDefault();
					$state.go('login');
				}
			} 
			// Test token for module
			// TODO
		}

	});

	$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){ 
	    console.log(event, unfoundState, fromState, fromParams);
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
	    // console.log(event, toState, toParams, fromState, fromParams);

	    // Remove state level fromState hotkeys
		if (fromState.data && fromState.data.hotkeys && fromState.data.hotkeys.state) {
		    fromState.data.hotkeys.state.forEach(function(hk){
				hotkeys.del(hk.combo);
		    });
		}
	    // Add state level toState hotkeys
		if (toState.data && toState.data.hotkeys && toState.data.hotkeys.state) {
		    toState.data.hotkeys.state.forEach(function(hk){
				hotkeys.bindTo($rootScope)
				.add({
				    combo: hk.combo,
				    description: hk.description,
				    callback: function() { $location.path(hk.path); }
				});
		    });
		}

		// NOPE:
	    // $state.go($state.current, {}, {reload: true});
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
	    console.log('error', error);
	    // var msg = error.config.method + " " + error.config.url + "\n" + error.code + " " + error.status + " " + error.statusText;
	    var msg = null;
		if (angular.isObject(error) && angular.isString(error.code)) {
			msg = error.code;
	        // switch (error.code) {
	        //     case 'NOT_AUTHENTICATED':
	        //         // go to the login page
	        //         $state.go('login');
	        //         break;
	        //     default:
	        //         // set the error object on the error state and go there
	        //         $state.get('error').error = error;
	        //         $state.go('error');
	        // }
	    } else {
			msg = error.status + " " + error.statusText;
	        // unexpected error
	        // $state.go('error');
	    }
	    console.log(msg);
	});

}])
;


})();

console.log('tmiApp Controller Initialized');