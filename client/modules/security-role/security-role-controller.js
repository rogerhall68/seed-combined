(function(){
'use strict';

var Roles = function(SecurityRoleService, SecurityModuleService) {
	console.log('Role Controller Called');
	var cntlr = this;
	cntlr.roles   = null;
	cntlr.role    = null;
	cntlr.modules = null;
	cntlr.changes = [];
	cntlr.status  = 'New';

	function checkLeft(priv, module) {
		console.log('checkLeft', priv, module);
		if (priv === 'admin') { module.checked['edit'] = true; }
		module.checked['view'] = true;
		cntlr.changes.push(module);
	}

	function unCheckRight(priv, module) {
		console.log('unCheckRight', priv, module);
		if (priv === 'view') { module.checked['edit'] = false; }
		module.checked['admin'] = false;
		cntlr.changes.push(module);
	}

	function checkDown(priv, module) {
		var descendants = findDescendants(module.module_id);
		descendants.forEach(function(mod){
			mod.checked[priv] = true;
			if (priv === 'view') { cntlr.changes.push(mod); }
			checkDown(priv, mod);
		})
	}

	function unCheckUp(priv, module) {
		var parent = cntlr.modules.filter(mod => module.parent_module_id === mod.module_id)[0];
		if (parent !== undefined) {
			parent.checked[priv] = false;
			if (priv === 'admin') { cntlr.changes.push(parent); }
			unCheckUp(priv, parent);
		}
	}

	function findDescendants(moduleId) {
		return cntlr.modules.filter(mod => mod.parent_module_id === moduleId);
	}

	function findParent(module) {
		return cntlr.modules.filter(mod => module.parent_module_id === mod.module_id)[0];
	}

	 cntlr.checked = function(priv, moduleId) { 
		cntlr.changes = [];
	 	if (cntlr.role !== null) {  // Must select a role to enable checkboxes
		 	var module = cntlr.modules.filter(m => m.module_id === moduleId)[0]; 

		 	if (!module.checkbox) { // Clicked on the label, not the checkbox
		 		if (module.checked[priv]) { module.checked[priv] = false; } else { module.checked[priv] = true; }	
		 	}

		 	// if checking, check all privs to the left and descendant
		 	if (priv !== 'view' && module.checked[priv]) { checkLeft(priv, module); }
		 	if (module.checked[priv]) { 
		 		if (priv === 'admin') { checkDown('admin', module); checkDown('edit', module); checkDown('view', module); }
		 		if (priv === 'edit') { checkDown('edit', module); checkDown('view', module); }
		 		if (priv === 'view') { checkDown('view', module); }
		 	}

		 	// if unchecking, uncheck all privs to the right and anscestor
		 	if (priv !== 'admin' && !module.checked[priv]) { unCheckRight(priv, module); }
		 	if (!module.checked[priv]) { 
		 		if (priv === 'admin') { unCheckUp('admin', module); }
		 		if (priv === 'edit') { unCheckUp('admin', module); unCheckUp('edit', module); }
		 		if (priv === 'view') { unCheckUp('admin', module); unCheckUp('edit', module); unCheckUp('view', module); }
		 	}

		 	// console.log('cntlr.changes', cntlr.changes);
		 	SecurityRoleService.postPrivs(cntlr.changes);
	 	}
	 };

	// Initialize data
	SecurityRoleService.getRoles().then(function (data) { 
		cntlr.roles = data; 
		SecurityModuleService.getModules().then(function (data) { cntlr.modules = data; });
	});	
};

angular
.module('securityRole')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('role', {
		url: "/security/role",
		templateUrl: 'modules/security-role/security-role.html',
		controllerAs: 'cntlr',
		controller: 'Roles',
		security: {
			module: "security-role",
			parent: "security"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('Roles', [
	'SecurityRoleService',
	'SecurityModuleService',
	Roles
]);

})();

console.log('SecurityRole Controller Initialized');
