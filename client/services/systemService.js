(function(){
'use strict';

var SystemService = function($rootScope, $state, CacheService) {
	console.log('SystemService');
	// console.log('$state', $state.get());
	var sys = this;

	sys.thing = function(index) {
		console.log('thing', index);
		// Object.keys(index).forEach(function(i){
		// 	sys.positionIndex[i] = index[i];
		// });
		// console.log('positionIndex', sys.positionIndex);
	};

	sys.init = function() {
		console.log('sys.init');
		sys.initSecurity();
	};

	sys.initSecurity = function() {
		console.log($state.get());
		$state.get().forEach(function(s){
			if (s.data && s.data.security) {
				console.log('\n');
				console.log('found', s.url);
				console.log('module', s.data.security.module);
				console.log('parent', s.data.security.parent);
			} else {
				console.log('\n');
				console.log('not found', s.url);
			}	
		});
	};





};

angular
  .module('tmiApp')
  .service('SystemService', [
  	'$rootScope', 
  	'$state', 
  	'CacheService',
    SystemService
  ]);

})();

console.log('SystemService Initialized');
