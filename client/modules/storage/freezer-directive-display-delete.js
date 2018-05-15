(function(){
'use strict';

angular
.module('freezer')
.directive('miFreezerDisplay', ['$timeout', '$rootScope', '$state', 'FreezerService', 'CacheService', 'MoveService', 'StorageService', function($timeout, $rootScope, $state, FreezerService, CacheService, MoveService, StorageService) {
	var FreezerDisplay = function($timeout, $rootScope, $state, FreezerService, CacheService, MoveService, StorageService) {
		console.log('FreezerDisplay()');
		var cntlr = this;
		// cntlr.oneAtATime = true;
		// cntlr.collapseSiblings = {};

		// cntlr.zoomMode = true;
		// cntlr.zoomChange = function() { stashFreezer(); };
		// cntlr.true = true;

		// cntlr.dialogStyle = {
		// 	'border-radius': '4px',
		// 	'color': '#000',
		// 	'font-size': '12px',
		// 	'width': '140px',
		// 	'height': '140px',
		// 	'left': '0',
		// 	'top': '0',
		// 	'padding': '4px',
		// 	'z-index': 10000, 
		// 	'position': 'fixed',
		// 	'background-color': '#eee', 
		// 	'box-shadow': '4px 4px 10px #000'
		// };
		// cntlr.modalShown = false;
		// cntlr.toggleModal = function() { cntlr.modalShown = !cntlr.modalShown; };
		// cntlr.modalOff = function() { cntlr.modalShown = false; };
		// cntlr.modalOn = function() { cntlr.modalShown = true; };
		// cntlr.mouseenter = function(product) {
		// 	cntlr.product = product;
		// 	cntlr.dialogStyle.left = $rootScope.mousePosition.x + 10;
		// 	cntlr.dialogStyle.top = $rootScope.mousePosition.y + 10;
		// 	cntlr.modalOn();
		// };
		// cntlr.mouseleave = function() {
		// 	cntlr.modalOff();
		// };
		// cntlr.mouseX = null;
		// cntlr.mouseY = null;
		// cntlr.mousemove = function(event) {
		// 	cntlr.mouseX = event.clientX;
		// 	cntlr.mouseY = event.clientY;
		// };

		cntlr.lastVisited = CacheService.get('freezer.lastVisited') || { 'id': null };
		console.log('display', cntlr.lastVisited);
		// cntlr.lastVisited = CacheService.sysCache.get('/freezer/lastVisited') || { 'id': 1 }; // TODO: delete
		console.log('1 cntlr.lastVisited', cntlr.lastVisited);                                   // TODO: delete
		// if (cntlr.lastVisited.length === 0) { cntlr.lastVisited = { 'id': 1 }; };
		// console.log('2 cntlr.lastVisited', cntlr.lastVisited)
		// console.log('3 cntlr.lastVisited.id', cntlr.lastVisited.id);

		function stashFreezer() {
			cntlr.freezer.moveButtons = cntlr.miMove;
			cntlr.freezer.positionIndex = cntlr.positionIndex;
			cntlr.freezer.collapseIndex = cntlr.collapseIndex;
			cntlr.freezer.collapseSiblings = cntlr.collapseSiblings;
			cntlr.freezer.zoomMode = cntlr.zoomMode;

			CacheService.put('freezer.' + cntlr.freezer.id, cntlr.freezer);
		}

		function thisFreezer(data) {
			cntlr.freezer = data;
			// console.log(cntlr.freezer);
			cntlr.miMove = cntlr.freezer.moveButtons;
			cntlr.positionIndex = cntlr.freezer.positionIndex;
			cntlr.collapseIndex = cntlr.freezer.collapseIndex;
			cntlr.zoomMode = cntlr.freezer.zoomMode;
			parseCollapseList(cntlr.freezer);
			cntlr.collapseSiblings = cntlr.freezer.collapseSiblings;

			console.log('cntlr.freezer.containerIndex');
			console.log(cntlr.freezer.containerIndex);
			MoveService.addContainerIndex(cntlr.freezer.containerIndex);
			console.log('cntlr.freezer.positionIndex');
			console.log(cntlr.freezer.positionIndex);
			MoveService.addPositionIndex(cntlr.freezer.positionIndex);
		}

		function loadFreezer(id) {
			FreezerService.getFreezer(id).then(function (data) { 
				thisFreezer(data);
				CacheService.put('freezer.' + id, data);
			});
		}
		// Init freezer
		if (cntlr.lastVisited.hasOwnProperty('id')) {
			console.log('what?');
			loadFreezer(cntlr.lastVisited.id);
		}

		cntlr.setFreezer = function(freezer) { 
			// console.log('setFreezer()');
			loadFreezer(freezer.store_item_id);
		};

		function setMiMinus(posId) { cntlr.miMove['miMinus' + posId] = true; cntlr.miMove['miPlus' + posId] = false; cntlr.miMove['miUpload' + posId] = false;  }
		function setMiPlus(posId) { cntlr.miMove['miMinus' + posId] = false; cntlr.miMove['miPlus' + posId] = true; cntlr.miMove['miUpload' + posId] = false;  }
		function setMiUpload(posId) { cntlr.miMove['miMinus' + posId] = false; cntlr.miMove['miPlus' + posId] = false; cntlr.miMove['miUpload' + posId] = true;  }

		cntlr.moveFrom = function(item) {
			if (!MoveService.contains(item)) { 
				MoveService.add(item);
				$timeout(setMiUpload(item.posId), 100, true);
				$rootScope.miPop('success', item.name + ' added to the queue');
			} else {
				$rootScope.miPop('warning', item.name + ' already added to queue');
			}

			// cntlr.toggleModal();
			cntlr.modalOff();
		};
		cntlr.moveReturn = function(item) {
			MoveService.delete(item);
			$rootScope.miPop('success', item.name + ' returned');
			$timeout(setMiMinus(item.posId), 100, true);
		};
		cntlr.moveTo = function(item) {
			if (MoveService.length(item) >= 1) {
				var from = MoveService.shift(item);
				// move(from.posId, item.posId);
				MoveService.move(from, item);
				$timeout(setMiMinus(item.posId), 100, true);
				$timeout(setMiPlus(from.posId), 100, true);
				$rootScope.miPop('success', 'Moved ' + from.itemName + ' from position ' + from.posId + ' to position ' + item.posId);
			} else {
				$rootScope.miPop('warning', 'The queue is empty');
			}
		};

		function move(from, to) {
			var fromContainer = findContainer(cntlr.positionIndex[from].parentId);
			var toContainer = function(){ 
				if (from === to) { 
					return fromContainer; 
				} else { 
					return findContainer(cntlr.positionIndex[to].parentId);
				}
			}();
			var fromIndex = cntlr.positionIndex[from].index;
			var fromObject = fromContainer.positions[fromIndex];
			var toIndex = cntlr.positionIndex[to].index;
			var toObject = toContainer.positions[toIndex];

			// Copy fromObject to edit position
			var fromCache = {};
			angular.copy(fromObject, fromCache);

			// Chage pos
			fromCache.posId = toObject.posId;
			fromCache.dim1.pos = toObject.dim1.pos;
			fromCache.dim2.pos = toObject.dim2.pos;

			// Copy toObject to edit position
			var toCache = {};
			angular.copy(toObject, toCache);

			// Chage pos
			toCache.posId = fromObject.posId;
			toCache.dim1.pos = fromObject.dim1.pos;
			toCache.dim2.pos = fromObject.dim2.pos;

			// Change the container records
			fromContainer.positions[fromIndex] = toCache;
			toContainer.positions[toIndex] = fromCache;

			stashFreezer();
		}
		function findContainer(containerId) {
			console.log('findContainer()');

			var container = {};
			cntlr.freezer.components.forEach(function(component){
				// Check componenets
				component.components.forEach(function(cmp){
					// Check containers
					cmp.containers.forEach(function(cnt){
						if (cnt.id === containerId) { container = cnt; }
					});
				});
				// Check containers
				component.containers.forEach(function(cnt){
					if (cnt.id === containerId) { container = cnt; }
				});
			});
			return container;
		}

		cntlr.collapse = function(id) { 
			// console.log('collapse(' + id + ')');
			// console.log(cntlr.collapseIndex[id]);
			if (cntlr.collapseIndex[id]) {
		    	cntlr.collapseIndex[id] = false;
		  	} else {
		    	cntlr.collapseIndex[id] = true;
				var numeric = id.substring(5);
				if (cntlr.oneAtATime && cntlr.collapseSiblings.hasOwnProperty(numeric)) {
					cntlr.collapseSiblings[numeric].forEach(function(i){ cntlr.collapseIndex['truth' + i] = false; });
				}
			}
			stashFreezer();
		};

		function addCollapseList(items) {
			// console.log(items);
			items.forEach(function(i){
				// console.log(i);
				cntlr.collapseSiblings[i.id] = items.filter(function(i2) { return i2.id != i.id; }).map(function(i3){ return i3.id; });
			});
		}

		function parseCollapseList(item) {
			function recurse(items) { addCollapseList(items); items.forEach(function(i){ parseCollapseList(i); }); }
			if (item.components.length > 0) { recurse(item.components); }
			if (item.containers.length > 0) { recurse(item.containers); }
			// if (item.products.length > 0) { recurse(item.products); }
		}

		cntlr.freezerSelected = function(freezer) {
			console.log('mi-freezer-display', 'freezerSelected', freezer);
		};

		// // Init
		// for (var i = 0; i < 100; i++) {
		// 	cntlr.collapseIndex['truth' + i] = true;
		// };
	};

	var link = function(scope, el, attrs, ctrls) {
		console.log('miFreezerDisplay link', ctrls);
		var cntlrBrowser = ctrls[0];
		var cntlrDisplay = ctrls[1];

		// function display(container) {
		// 	cntlrDisplay.container = container;
		// }

		// cntlrBrowser.display.navigation = display;
		// cntlrDisplay.selected = cntlrBrowser.selected.navigation;
		cntlrBrowser.container.freezerSelected = cntlrDisplay.freezerSelected;

	};

	return {
		restrict: 'E',
		require: ['^miFreezerBrowser', 'miFreezerDisplay'],
		// templateUrl: 'mi-freezer-display.html'
		templateUrl: 'mi-freezer-display.html',
		// scope: {}
		scope: {},
		controller: FreezerDisplay,
		controllerAs: 'cntlr',
		// bindToController: true
		bindToController: true,
		link: link
	};
}])
;

})();

console.log('Freezer Display Directive Initialized');
