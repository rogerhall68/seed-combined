(function(){
'use strict';

var StorageService = function($rootScope, CacheService, FreezerService) {
	console.log('StorageService');
	var srvc = this;

	srvc.storage = {};
	srvc.collapseSiblings = {};
	srvc.collapseIndex = [];
	srvc.buttons =[];

	srvc.containerIndex = {};
	srvc.positionIndex = {};

	// srvc.load = function(id){ 
	// 	srvc.storage = srvc.get(id);
	// 	console.log('srvc.storage');
	// 	console.log(srvc.storage);
	// 	srvc.buttons = srvc.storage.moveButtons;
	// 	srvc.positionIndex = srvc.storage.positionIndex;
	// 	srvc.collapseSiblings = srvc.storage.collapseSiblings;
	// 	srvc.collapseIndex = srvc.storage.collapseIndex;
	// };
	srvc.saveLastFreezer = function(freezer){ 
		console.log('saveLastFreezer');
		CacheService.put('freezer.lastVisited', freezer);							 // Cache lastVisited
	};
	srvc.loadLastFreezer = function(){ 
		console.log('loadLastFreezer');
		return CacheService.get('freezer.lastVisited') || { 'id': null };
	};
	srvc.saveStructure = function(storage){ 
		console.log('saveStructure');
		CacheService.put('freezer.' + storage.id, storage); 
		srvc.addContainerIndex(storage.containerIndex);
	};
	// srvc.lastContainer = function(freezer){ 
	// 	CacheService.put('freezer.lastVisited', freezer);							 // Cache lastVisited
	// };
	srvc.saveContainer = function(container){ 
		console.log('saveContainer');
		console.log('saveContainer', container.id, container);
		CacheService.put('container.' + container.id, container);         // Cache container data
		srvc.addPositionIndex(container.positionIndex);
	};
	srvc.loadContainer = function(containerId){ 
		console.log('saveContainer');
		return CacheService.get('container.' + containerId); 
	};


	// srvc.get = function(id){ 
	// 	if (CacheService.get('freezer.' + id)) {
	// 		return CacheService.get('freezer.' + id);
	// 	} else {
	// 		FreezerService.getFreezer(id).then(function (data) { 
	// 			return data;
	// 		});
	// 	}
	// };
	// srvc.put = function(storage){ 
	// 	CacheService.put('freezer.' + storage.id, storage); 
	// };


	srvc.saveStack = function(){ CacheService.put('freezer.moveStack', srvc.moveStack); };
	srvc.loadStack = function(){ return CacheService.get('freezer.moveStack') || {}; };
	srvc.moveStack = srvc.loadStack();

	srvc.moveStackContains = function(item){
		var stack = srvc.moveStack[item.category.name] || [];
		var check = stack.filter(function(p){ return p.posId === item.id; }).length > 0;
		console.log('moveStackContains', check);
		if (!check) {
			$rootScope.miPop('success', item.name + ' added to the queue');
		} else {
			$rootScope.miPop('warning', item.name + ' already added to queue');
		}
		return check; 
	};
	srvc.moveStackNotEmpty = function(item){
		var category = item.category.name || 'Storage Product';
		var stack = srvc.moveStack[category] || [];
		var check = stack.length >= 1;
		if (!check) {
			$rootScope.miPop('warning', 'The queue is empty');
		}
		return check; 
	};

	srvc.moveFrom = function(item){
		var stack = srvc.moveStack[item.category.name] || [];
		stack.push(item);
		console.log(stack);
		srvc.moveStack[item.category.name] = stack;
		srvc.saveStack(); 
	};
	srvc.moveReturn = function(item){
		var stack = srvc.moveStack[item.category.name] || [];
		var index = stack.map(function(p) { return p.posId; }).indexOf(item.posId);
		stack.splice(index, 1); 
		srvc.moveStack[item.category.name] = stack;
		$rootScope.miPop('success', item.name + ' returned');
		srvc.saveStack(); 
	};
	srvc.moveTo = function(toItem){
		var fromItem = srvc.moveStackShift(toItem);
		srvc.move(fromItem, toItem);
		$rootScope.miPop('success', 'Moved ' + fromItem.name + ' from position ' + fromItem.posId + ' to position ' + toItem.posId);
	};
	srvc.moveStackShift = function(item){
		var category = item.category.name || 'Storage Product';
		var shifted = srvc.moveStack[category].shift(); 
		srvc.saveStack(); 
		return shifted; 
	};

	srvc.move = function(from, to) {
		var fromContainer = null;
		var toContainer = null;

		if (from.parentId === to.parentId) { 
			fromContainer = srvc.loadContainer(from.parentId);
			toContainer = fromContainer;
		} else { 
			fromContainer = srvc.loadContainer(from.parentId);
			toContainer = srvc.loadContainer(to.parentId);
		}

		console.log('$$$ move from.posId', from.posId);
		console.log('$$$ move srvc.positionIndex[from.posId]', srvc.positionIndex[from.posId]);
		var fromIndex = srvc.positionIndex[from.posId].index;
		var fromObject = fromContainer.positions[fromIndex];
		var toIndex = srvc.positionIndex[to.posId].index;
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

		// Save containers in cache
		if (from.parentId === to.parentId) { 
			srvc.saveContainer(fromContainer);
		} else { 
			srvc.saveContainer(fromContainer);
			srvc.saveContainer(toContainer);
		}

		// Update database
		console.log('moving_item_id', fromObject.id);
		console.log('new_parent_item_id', toContainer.id);
		console.log('new_parent_pos_id', toObject.posId);
		FreezerService.move(fromObject.id, toContainer.id, toObject.posId);
	};

	srvc.addContainerIndex = function(index) {
		console.log('addContainerIndex', index);
		Object.keys(index).forEach(function(i){
			srvc.containerIndex[i] = index[i];
		});
		console.log('containerIndex', srvc.containerIndex);
	};

	srvc.findContainer = function(containerId) {
		var container = {};
		srvc.storage.components.forEach(function(component){
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
	};

	srvc.addPositionIndex = function(index) {
		console.log('addPositionIndex', index);
		Object.keys(index).forEach(function(i){
			srvc.positionIndex[i] = index[i];
		});
		console.log('positionIndex', srvc.positionIndex);
	};

};

angular
  .module('tmiApp')
  .service('StorageService', [
  	'$rootScope', 
  	'CacheService',
  	'FreezerService',
    StorageService
  ]);

})();

console.log('StorageService Initialized');
