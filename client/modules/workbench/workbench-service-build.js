(function(){
'use strict';

function findItem(items, itemId) { return items.filter(function(element) { return element.store_item_id === itemId; }); }
function findChildProducts(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && (element.store_type_cat_id === 4)); }); }
function findChildPositions(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && ((element.store_type_cat_id === 4) || (element.store_type_cat_id === null))); }); }
function findAllProducts(items) { return items.filter(function(element) { return (element.store_type_cat_id === 4); }); }
function findAllPositions(items) { return items.filter(function(element) { return ((element.store_type_cat_id === 4) || (element.store_type_cat_id === null)); }); }

function buildWorkbench(data, rootId) {
	// console.log('buildWorkbench', data, rootId);
	// console.log('findItem(data, rootId)', findItem(data, rootId));
	// console.log('findItem(data, rootId)[0]', findItem(data, rootId)[0]);

	return buildItem(data, findItem(data, rootId)[0], 0);
	// return data;
}

function buildItem(data, item, level) {
	console.log('___ buildItem() ___');
	// console.log('** build data', data);
	// console.log('** build item', item);
	var build = initItem(item);
	// console.log('** build build', build);

	build.products   = findChildProducts(data, item.store_item_id).map(function(i){ return initItem(i); });
	build.positions  = findChildPositions(data, item.store_item_id).map(function(i){ return initItem(i); });
	// var allPositions = findAllPositions(data);
	console.log('** build positions', build.positions);

	build.isRoot = function() { return (build.parentId === build.rootId); }();
	
	// Category: Workbench only
	if (item.store_type_cat_id === 5) { 
		build.productTotal = findAllProducts(data).length;
		// build.moveButtons = initMoveButtons([{ store_pos_id: 'New' }], findAllProducts(data));
		build.products.push({"id":null,"parentId":item.store_item_id,"name":null,"type":{"id":null,"name":null},"category":{"id":null,"name":null},"desc":null,"posId":null,"dim1":{"pos":null,"label":{"id":1,"name":"Row"},"direction":{"id":3,"name":"Top to Bottom"}},"dim2":{"pos":null,"label":{"id":2,"name":"Column"},"direction":{"id":1,"name":"Left to Right"}},"hasPredefined":null,"components":[],"containers":[],"products":[],"positions":[],"empty":true});
		build.positions.push({"id":null,"parentId":item.store_item_id,"name":null,"type":{"id":null,"name":null},"category":{"id":null,"name":null},"desc":null,"posId":null,"dim1":{"pos":null,"label":{"id":1,"name":"Row"},"direction":{"id":3,"name":"Top to Bottom"}},"dim2":{"pos":null,"label":{"id":2,"name":"Column"},"direction":{"id":1,"name":"Left to Right"}},"hasPredefined":null,"components":[],"containers":[],"products":[],"positions":[],"empty":true});
	}

	build.positionIndex = initPositionIndex(build.positions);

	return build;
}

function initItem(item) {
	console.log('___ initItem() ___');
	console.log('** init', item);
	var bools = [false, true];
	return { 
		id: item.store_item_id,
		parentId: item.store_parent_item_id, 
		rootId: item.store_root_item_id, 
		name: item.store_item_name,
		type: { id: item.store_type_id, name: item.store_type_name },
		category: { id: item.store_type_cat_id, name: item.store_type_cat_name },
		desc: item.store_config_desc,
		posId: item.store_pos_id,
		dim1: { pos: item.store_pos_dim_1, label: { id: item.store_dim_1_label_id, name: item.store_dim_1_label_name }, direction: { id: item.store_dim_1_dir_id, name: item.store_dim_1_dir_name } },
		dim2: { pos: item.store_pos_dim_2, label: { id: item.store_dim_2_label_id, name: item.store_dim_2_label_name }, direction: { id: item.store_dim_2_dir_id, name: item.store_dim_2_dir_name } },
		hasPredefined: item.has_predefined_positions,
		inQueue: false
	};
}

function initPositionIndex(positions) {
	console.log('initPositionIndex', positions);
	console.log('positions.map', positions.map(function(p){ return p.parentId; }));
	console.log('positions.filter', positions.map(function(p){ return p.parentId; }).filter(function(item, i, ar){ return ar.indexOf(item) === i; }));
	var parentIds = positions.map(function(p){ return p.parentId; }).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	console.log('parentIds', parentIds);
	var index = {};
	parentIds.forEach(function(parentId){
		var childPositions = positions.filter(function(p){ return p.parentId === parentId; });
		console.log('childPositions', childPositions);
		var childIndex = 0;
		childPositions.forEach(function(p) {
			// console.log('childPositions', { parentId:  p.parentId, index: childIndex });
			index[p.posId] = { parentId:  p.parentId, index: childIndex };
			// console.log('p.posId', p.posId);
			// console.log('index[p.posId]', index[p.posId]);
			childIndex += 1;
		});
	});
	console.log('index', index);
	return index;
}

// function initMoveButtons(positions, products) {
// 	var buttons = {};
// 	products.forEach(function(i){
// 		buttons['miMinus' + i.store_pos_id] = true;
// 		buttons['miPlus' + i.store_pos_id] = false;
// 		buttons['miUpload' + i.store_pos_id] = false;
// 	});
// 	positions.forEach(function(i){
// 		buttons['miMinus' + i.store_pos_id] = false;
// 		buttons['miPlus' + i.store_pos_id] = true;
// 		buttons['miUpload' + i.store_pos_id] = false;
// 	});
// 	return buttons;
// }

var WorkbenchBuildService = function() {
	var srvc = this;
	srvc.buildWorkbench = buildWorkbench;
};

angular
.module('freezer')
.service('WorkbenchBuildService', [
	WorkbenchBuildService
]);

})();

console.log('Workbench Build Service Initialized');
