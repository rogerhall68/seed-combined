(function(){
'use strict';

function findItem(items, itemId) { return items.filter(function(element) { return element.store_item_id == itemId; }); }
function findAllComponents(items) { return items.filter(function(element) { return (element.store_type_cat_id === 2); }); }
function findAllContainers(items) { return items.filter(function(element) { return (element.store_type_cat_id === 3); }); }
function findAllProducts(items) { return items.filter(function(element) { return (element.store_type_cat_id === 4); }); }
function findAllNonProducts(items) { return items.filter(function(element) { return (element.store_type_cat_id != 4); }); }
function findAllPositions(items) { return items.filter(function(element) { return ((element.store_type_cat_id === 4) || (element.store_type_cat_id === null)); }); }
function findChildComponents(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && (element.store_type_cat_id === 2)); }); }
function findChildContainers(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && (element.store_type_cat_id === 3)); }); }
function findChildProducts(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && (element.store_type_cat_id === 4)); }); }
function findChildPositions(items, itemId) { return items.filter(function(element) { return ((element.store_parent_item_id === itemId) && ((element.store_type_cat_id === 4) || (element.store_type_cat_id === null))); }); }

function buildStructure(data, rootId) {
	console.log('buildStructure', data);
	var storage = buildItem(data, findItem(data, rootId)[0], 0);

	console.log('storage', storage);

	var allComponents = findAllComponents(data);
	var allContainers = findAllContainers(data);
	storage.componentIndex = {};
	storage.containerIndex = {};
	// storage.collapse = {};

	// collapseIndex controls which heirarchical worksheet elements are visible in the UI
	function parseCollapseList(item) {
		function recurse(items) { addCollapseList(items); items.forEach(function(i){ parseCollapseList(i); }); }
		if (item.components.length > 0) { recurse(item.components); }
		if (item.containers.length > 0) { recurse(item.containers); }
	}

	function addCollapseList(items) {
		items.forEach(function(i){
			storage.collapse.siblings[i.id] = items.filter(function(i2) { return i2.id != i.id; }).map(function(i3){ return i3.id; });
		});
	}

	parseCollapseList(storage);

	// map each component and container Id to the root device Id
	allComponents.forEach(function(i){ storage.componentIndex[i.store_item_id] = storage.id; });
	allContainers.forEach(function(i){ storage.containerIndex[i.store_item_id] = storage.id; });

	console.log('buildStructure', storage);

	return storage;
}

function buildWorksheet(data, rootId) {
	var storage = buildItem(data, findItem(data, rootId)[0], 0);
	function parseCollapseList(item) {
		function recurse(items) { addCollapseList(items); items.forEach(function(i){ parseCollapseList(i); }); }
		if (item.components.length > 0) { recurse(item.components); }
		if (item.containers.length > 0) { recurse(item.containers); }
	}

	function addCollapseList(items) {
		items.forEach(function(i){
			storage.collapse.siblings[i.id] = items.filter(function(i2) { return i2.id != i.id; }).map(function(i3){ return i3.id; });
		});
	}

	parseCollapseList(storage);

	return storage;
}

function buildContainer(data, rootId) {
	// console.log('buildContainer', data, rootId);
	// console.log('buildContainer', findItem(data, rootId)[0]);
	var item = findItem(data, rootId)[0];
	var build = initItem(item);
	if (build.hasPredefined === true) {
		build.predefined = {
			positions: item.self_store_config_dim_1 * item.self_store_config_dim_2,
			dim1: { size: item.self_store_config_dim_1, label: { id: item.self_store_dim_1_label_id, name: item.self_store_dim_1_label_name }, direction: { id: item.self_store_dim_1_dir_id, name: item.self_store_dim_1_dir_name } },
			dim2: { size: item.self_store_config_dim_2, label: { id: item.self_store_dim_2_label_id, name: item.self_store_dim_2_label_name }, direction: { id: item.self_store_dim_2_dir_id, name: item.self_store_dim_2_dir_name } }
		};
	}

	build.products   = findChildProducts(data, item.store_item_id).map(function(i){ return initItem(i); });
	build.positions  = findChildPositions(data, item.store_item_id).map(function(i){ return initItem(i); });

	var allProducts = findAllProducts(data);
	var allPositions = findAllPositions(data);
	build.moveButtons = initMoveButtons(allPositions, allProducts);
	build.positionIndex = initPositionIndex(allPositions);

	return build;
}

function buildItem(data, item, level) {
	var build = initItem(item);
	// console.log('buildItem', item, level, build);

	// build.isRoot = function() { return (build.parentId === build.rootId) }();

	build.components = findChildComponents(data, item.store_item_id).map(function(i){ return buildItem(data, i, level + 1); });
	build.containers = findChildContainers(data, item.store_item_id).map(function(i){ return buildItem(data, i, level + 1); });
	// build.products   = findChildProducts(data, item.store_item_id).map(function(i){ return buildItem(data, i, level + 1); });
	// build.positions  = findChildPositions(data, item.store_item_id).map(function(i){ return buildItem(data, i, level + 1); });
	// console.log(JSON.stringify(build.positions[0]));


	if (build.hasPredefined === true) {
		build.predefined = {
			positions: item.self_store_config_dim_1 * item.self_store_config_dim_2,
			dim1: { size: item.self_store_config_dim_1, label: { id: item.self_store_dim_1_label_id, name: item.self_store_dim_1_label_name }, direction: { id: item.self_store_dim_1_dir_id, name: item.self_store_dim_1_dir_name } },
			dim2: { size: item.self_store_config_dim_2, label: { id: item.self_store_dim_2_label_id, name: item.self_store_dim_2_label_name }, direction: { id: item.self_store_dim_2_dir_id, name: item.self_store_dim_2_dir_name } }
		};
	}

	// Category: Storage Devices only
	if (item.store_type_cat_id === 1) { 
		// var allProducts = findAllProducts(data);
		var allNonProducts = findAllNonProducts(data);
		var allContainers = findAllContainers(data);
		// var allPositions = findAllPositions(data);

		// build.productTotal = allProducts.map(function(i){ return buildItem(data, i, level + 1); }).length;
		// build.positionTotal = allContainers.map(function(i){ return i.self_store_config_dim_1 * i.self_store_config_dim_2 }).reduce((prev, curr) => prev + curr);

		build.collapse = { "index": [], "siblings": {} };
		build.collapse.index = initCollapseIndex(allNonProducts);
		build.editIndex = initEditIndex(allNonProducts);
		build.selectIndex = initSelectIndex(allNonProducts);
		
		// For MoveService: containerIndex maps each container Id to the root device Id
		// var containerIndex = {};
		// allContainers.forEach(function(i){ containerIndex[i.store_item_id] = item.store_item_id; });
		// build.containerIndex = containerIndex;
		// build.positionIndex = initPositionIndex(allPositions);
	}

	if (item.store_pos_id !== null) { 
		if (build.id === null) { build.empty = true; } else { build.empty = false; }
	}

	return build;
}


function initItem(item) {
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
		hasPredefined: item.has_predefined_positions
	};
}

function initPositionIndex(positions) {
	var parentIds = positions.map(function(p){ return p.store_parent_item_id; }).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	var index = {};
	parentIds.forEach(function(parentId){
		var childPositions = positions.filter(function(p){ return p.store_parent_item_id === parentId; });
		var childIndex = 0;
		childPositions.forEach(function(p) {
			index[p.store_pos_id] = { parentId:  p.store_parent_item_id, index: childIndex };
			childIndex += 1;
		});
	});
	return index;
}

function initMoveButtons(positions, products) {
	var buttons = {};
	positions.forEach(function(i){
		buttons['miMinus' + i.store_pos_id] = false;
		buttons['miPlus' + i.store_pos_id] = true;
		buttons['miUpload' + i.store_pos_id] = false;
	});
	products.forEach(function(i){
		buttons['miMinus' + i.store_pos_id] = true;
		buttons['miPlus' + i.store_pos_id] = false;
		buttons['miUpload' + i.store_pos_id] = false;
	});
	return buttons;
}

function initCollapseIndex(storage) {
	var index = {};
	storage.forEach(function(item){
		index['truth' + item.store_item_id] = true;
	});
	return index;
}

function initEditIndex(storage) {
	var index = {};
	storage.forEach(function(item){
		index['edit' + item.store_item_id] = false;
	});
	return index;
}

function initSelectIndex(storage) {
	var index = {};
	storage.forEach(function(item){
		index['truth' + item.store_item_id] = false;
	});
	return index;
}

var WorksheetBuildService = function() {
	var srvc = this;
	srvc.buildStructure = buildStructure;
	srvc.buildWorksheet = buildWorksheet;
	srvc.buildContainer = buildContainer;
};

angular
.module('sopWorksheet')
.service('WorksheetBuildService', [
	WorksheetBuildService
]);

})();

console.log('SOP Worksheet Build Service Initialized');
