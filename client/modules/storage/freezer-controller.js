(function(){
'use strict';

// function findChildren(items, parent_id) { return items.filter(filterChildren, parent_id); }
// function filterChildren(element, index, array) { return element.storage_parent_item_id === this; }
var Freezer = function($state, FreezerService, CacheService) {
	console.log('Freezer Controller Called');
	var cntlr = this;

	cntlr.adminOn = false;
	cntlr.admin = function(){
		console.log('admin');
		cntlr.adminOn = !cntlr.adminOn;
	};

	angular.element(document).ready(function () {
        console.log('document ready');
    });
};

angular
.module('freezer')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('freezer', {
		url: "/freezer",
		templateUrl: 'modules/storage/freezer.html',
		controllerAs: 'cntlr',
		controller: 'Freezer',
		security: {
			module: "storage-browser",
			parent: "storage"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: [
			{ key: 'freezer.lastVisited', mode: 'localStorage', default: { 'id': 53 } }, 
			{ key: 'freezer.lastContainers', mode: 'localStorage', default: {} }
		]
	})
	;
}])
.controller('Freezer', [
	'$state',
	'FreezerService',
	'CacheService',
	Freezer
])
;

})();

console.log('Freezer Controller Initialized');
