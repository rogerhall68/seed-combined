(function() {
'use strict';

angular
.module('tmiApp')
.constant('SessionData', {
	"app": 'tmiApp',
	"setting": {
		"profile": {
			"hint": null
		}
	},
	"last": {
		"state": 'workbench',
		"freezer": null
	}
});

})();

console.log('SessionData Module Initialized');
