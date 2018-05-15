(function(){
'use strict';

var CacheService = function(cacheName, CacheFactory) {
	var sys = this;
	console.log('CacheService');

	var caches = { 'memory': {}, 'sessionStorage': {}, 'localStorage': {} };
	var modes = Object.keys(caches);
	var defaultMode = modes[0]; // First cache listed is used for unconfigured keys
	var keyModes = {};

	// Initialize caches
	modes.forEach(function(mode){
		if (!CacheFactory.get(mode)) { 
			caches[mode] = CacheFactory(mode, { storageMode: mode, storagePrefix: cacheName + '.' });
		} else {
			caches[mode] = CacheFactory.get(mode);
		}
	});

	sys.get = function(key) {
		if (caches[keyModes[key]]) {
			return caches[keyModes[key]].get(key);
		} else {
			return null;
		}
	};

	sys.put = function(key, value) {
		// console.log('put', key, value);
		if (caches[keyModes[key]]) {
			caches[keyModes[key]].put(key, value);
		} else {
			keyModes[key] = defaultMode;  // First cache listed is used for unconfigured keys
			caches[defaultMode].put(key, value); 
		}
	};

	sys.init = function(targets) {
		// console.log('init()', targets);
		targets.forEach(function(target){
			if (!caches[target.mode].get(target.key)) {
				caches[target.mode].put(target.key, target.default);
			}
			keyModes[target.key] = target.mode;
		});
	};
};

angular
  .module('tmiApp')
  .service('CacheService', [
  	'cacheName',
  	'CacheFactory', 
    CacheService
  ]);

})();

console.log('CacheService Initialized');