(function(){
'use strict';

var SessionService = function($http, $q, $rootScope, CacheService, SessionData) {
	console.log('SessionService');
	var srvc = this;

	srvc.set = function(obj) {
	console.log('SessionService.set()', obj);
	console.log('SessionData', SessionData);
		Object.keys(obj).forEach(function(key){
			SessionData[key] = obj[key];
		});
		// Update cache
		CacheService.put('session', SessionData);
	};

	srvc.lo = function() {
		// Update cache
		// CacheService
		SessionData.user_token = null;
	};

	srvc.lastState = function() {
		return SessionData.last.state;
	}

	srvc.addSessionVar = function(varName) {
		// if () {}
	};

};

angular
  .module('tmiApp')
  .service('SessionService', [
  	'$http',
  	'$q',
  	'$rootScope', 
  	'CacheService',
  	'SessionData',
    SessionService
  ]);

})();

console.log('SessionService Initialized');
