(function(){
'use strict';

function findComponent(componentId) {
	var component = {};
	cntlr.freezer.components.forEach(function(cmp1){
		if (cmp1.id == componentId) { component = cmp1; }
		cmp1.components.forEach(function(cmp2){ // Check componenets
			if (cmp2.id == componentId) { component = cmp2; } // Check components
		});
	});
	return component;
}

function findContainer(containerId) {
	var container = {};
	cntlr.freezer.components.forEach(function(component){		
		component.components.forEach(function(cmp){ // Check componenets			
			cmp.containers.forEach(function(cnt){ // Check containers
				if (cnt.id == containerId) { container = cnt; }
			});
		});
		component.containers.forEach(function(cnt){ // Check containers
			console.log('cnt', cnt);
			if (cnt.id == containerId) { container = cnt; }
		});
	});
	console.log('container', container);
	return container;
}

function addHere(id) {
	// console.log('addHere', id);
	var cmp = findComponent(id);
	var child = {"components": [], "containers": [], "products": [], "desc": '', "empty": true, "id": null, "isRoot": false, "name": '', "posId": null, "positions": []};
	if (cmp.components.length > 0) { 
		var tmpl = cmp.components[0]; 
		child.category = tmpl.category;
		child.type = tmpl.type;
		child.dim1 = tmpl.dim1;
		child.dim2 = tmpl.dim2;
		child.hasPredefined = tmpl.hasPredefined;
		child.parentId = tmpl.parentId;
		child.predefined = tmpl.predefined;
		child.rootId = tmpl.rootId;
		cmp.components.push(child);
	}
	else if (cmp.containers.length > 0) { 
		child = cmp.containers[0]; 
	}
	else { console.log('Can not add new child.'); }
	console.log('child', child);
}

return {
	findComponent: findComponent,
	findContainer: findContainer,
	addHere: addHere
};

})();

console.log('Freezer Model Initialized');

