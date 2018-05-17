(function() {
'use strict';

angular
.module('tmiApp')
// TODO These default values can't be here in src. That is data in too 
// many places, move to config and build the angular constant RAH 180515
.constant('SessionData', {
	"app": 'tmiApp',
	"setting": {
		"profile": {
			"hint": null
		}
	},
	"last": {
		"state": 'tables' 
	}
});

})();

console.log('SessionData Module Initialized');
