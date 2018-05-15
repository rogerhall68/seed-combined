(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerNavigation', ['$state', 'FreezerService', 'CacheService', function($state, FreezerService, CacheService) {
	var FreezerNavigation = function($timeout, $rootScope, $state, FreezerService, CacheService, StorageService) {
		console.log('FreezerNavigation Controller Called');
		var cntlr = this;
		cntlr.oneAtATime = true;
		cntlr.freezer = null;
		cntlr.cntlrBrowser = null;

		// function findComponent(componentId) {
		// 	var component = {};
		// 	cntlr.freezer.components.forEach(function(cmp1){
		// 		if (cmp1.id == componentId) { component = cmp1; }
		// 		cmp1.components.forEach(function(cmp2){ // Check componenets
		// 			if (cmp2.id == componentId) { component = cmp2; } // Check components
		// 		});
		// 	});
		// 	return component;
		// }

		// function findContainer(containerId) {
		// 	var container = {};
		// 	cntlr.freezer.components.forEach(function(component){		
		// 		component.components.forEach(function(cmp){ // Check componenets			
		// 			cmp.containers.forEach(function(cnt){ // Check containers
		// 				if (cnt.id == containerId) { container = cnt; }
		// 			});
		// 		});		
		// 		component.containers.forEach(function(cnt){ // Check containers
		// 			// console.log('cnt', cnt);
		// 			if (cnt.id == containerId) { container = cnt; }
		// 		});
		// 	});
		// 	console.log('container', container);
		// 	return container;
		// }

		// cntlr.edit = function(id) { 
		// 	cntlr.editIndex[id] = !cntlr.editIndex[id];
		// 	stashFreezer();
		// };

		cntlr.collapse = function(id) { 
			console.log('mi-freezer-navigation', id, cntlr.freezer.collapse.index[id]);
			if (cntlr.freezer.collapse.index[id]) {
		    	cntlr.freezer.collapse.index[id] = false;
		  	} else {
		    	cntlr.freezer.collapse.index[id] = true;
				var numeric = id.substring(5);
				if (cntlr.oneAtATime && cntlr.freezer.collapse.siblings.hasOwnProperty(numeric)) {
					cntlr.freezer.collapse.siblings[numeric].forEach(function(i){ cntlr.freezer.collapse.index['truth' + i] = false; });
				}
			}
			console.log('mi-freezer-navigation', id, cntlr.freezer);
			stashFreezer();
		};

		function stashFreezer() {
			cntlr.freezer.moveButtons = cntlr.miMove;
			cntlr.freezer.positionIndex = cntlr.positionIndex;
			cntlr.freezer.editIndex = cntlr.editIndex;
			cntlr.freezer.selectIndex = cntlr.selectIndex;
			// cntlr.freezer.zoomMode = cntlr.zoomMode;

			CacheService.put('freezer.' + cntlr.freezer.id, cntlr.freezer);
		}

		// cntlr.thisThing = function(id) {
		// 	console.log('thisThing', id);
		// };

		// cntlr.addHere = function(id) {
		// 	// console.log('addHere', id);
		// 	var cmp = findComponent(id);
		// 	var child = {"components": [], "containers": [], "products": [], "desc": '', "empty": true, "id": null, "isRoot": false, "name": '', "posId": null, "positions": []};
		// 	if (cmp.components.length > 0) { 
		// 		var tmpl = cmp.components[cmp.components.length - 1]; 
		// 		var nameList = tmpl.name.split(" ");
		// 		child.name = nameList[0] + " " + (parseInt(nameList[1]) + 1);
		// 		child.category = tmpl.category;
		// 		child.type = tmpl.type;
		// 		child.dim1 = tmpl.dim1;
		// 		child.dim2 = tmpl.dim2;
		// 		child.hasPredefined = tmpl.hasPredefined;
		// 		child.parentId = tmpl.parentId;
		// 		child.predefined = tmpl.predefined;
		// 		child.rootId = tmpl.rootId;
		// 		cmp.components.push(child);
		// 	}
		// 	else if (cmp.containers.length > 0) { 
		// 		child = cmp.containers[0]; 
		// 	}
		// 	else { console.log('Can not add new child.') }
		// 	console.log('child', child);
		// };

		cntlr.selectContainer = function(containerId) {
			// console.log('selectContainer', containerId);
			var index = Object.keys(cntlr.selectIndex);
			index.forEach(function(i){
				cntlr.selectIndex[i] = false;
			});
			cntlr.selectIndex['truth' + containerId] = true;
			
			saveLastContainer(containerId);
			cntlr.cntlrBrowser.containerSelected(containerId);
		};

		cntlr.setFreezer = function(freezer) {
			// console.log('mi-freezer-navigation', 'setFreezer', freezer);
			cntlr.freezer = freezer;
			cntlr.miMove = cntlr.freezer.moveButtons;
			cntlr.positionIndex = cntlr.freezer.positionIndex;
			cntlr.editIndex = cntlr.freezer.editIndex;
			cntlr.selectIndex = cntlr.freezer.selectIndex;
		};

		cntlr.setContainer = function(containerId) {
			// Find freezer for given containerId and edit index-truths then:
			cntlr.freezer = freezer;
		};

		function saveLastContainer(containerId) {
			// console.log('mi-freezer-navigation', 'saveLastContainer', cntlr.freezer);
			var lastContainers = CacheService.get('freezer.lastContainers');
			lastContainers[cntlr.freezer.id] = containerId;
			CacheService.put('freezer.lastContainers', lastContainers);
		}

	};

	var link = function(scope, el, attrs, ctrls) {
		console.log('miFreezerNavigation link', ctrls);
		var cntlrBrowser = ctrls[0];
		var cntlrNavigation = ctrls[1];

		cntlrNavigation.cntlrBrowser         = cntlrBrowser;
		cntlrBrowser.navigation.setFreezer   = cntlrNavigation.setFreezer;
		cntlrBrowser.navigation.setContainer = cntlrNavigation.setContainer;
	};

	return {
		restrict: 'E',
		require: ['^miFreezerBrowser', 'miFreezerNavigation'],
		templateUrl: 'mi-freezer-navigation.html',
		scope: {},
		controller: FreezerNavigation,
		controllerAs: 'cntlr',
		bindToController: true,
		link: { pre: link }
	};
}])
;

})();

console.log('Freezer Navigation Directive Initialized');
