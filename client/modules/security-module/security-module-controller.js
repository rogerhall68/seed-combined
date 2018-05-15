(function(){
'use strict';

var Modules = function(SecurityModuleService) {
	console.log('Modules');
	var cntlr = this;

	cntlr.objects = {
		modules: null,
		childs: null,
		dirs: null,
		labs: null
	};

	cntlr.chooser = {
		module: null,
		change: function(chosen) {
			console.log('cntlr.chooser.module', cntlr.chooser.module);
			cntlr.updater.module_name.disable = false;
			// cntlr.updater.dim1Dir = cntlr.objects.dirs.filter(function(c){return c.store_dim_dir_id == chosen.store_module_dim_1_dir_id})[0];
			// cntlr.updater.dim1Lab = cntlr.objects.labs.filter(function(c){return c.store_dim_label_id == chosen.store_module_dim_1_label_id})[0];
			// cntlr.updater.dim2Dir = cntlr.objects.dirs.filter(function(c){return c.store_dim_dir_id == chosen.store_module_dim_2_dir_id})[0];
			// cntlr.updater.dim2Lab = cntlr.objects.labs.filter(function(c){return c.store_dim_label_id == chosen.store_module_dim_2_label_id})[0];
			// SecurityModuleService.getValidChildren(cntlr.chooser.module.store_module_id).then(function (data) { 
			// 	cntlr.objects.childs = data;
			// });
		}
	};


	// cntlr.chooser = {
	// 	type: null,
	// 	change: function(type) {
	// 		cntlr.updater.original = type;
	// 		cntlr.updater.category = cntlr.objects.categories.filter(function(c){return c.store_type_cat_id == type.store_type_cat_id})[0];
	// 		cntlr.updater.store_type_name.disable = false;
	// 		cntlr.updater.store_type_cat_id.disable = false;
	// 	}
	// };

	cntlr.adder = {
		module: { "store_module_id": null, "store_type_id": null, "store_module_name": null, "store_module_desc": null, "store_module_brand": null, "store_module_model": null, "store_module_dim_1": null, "store_module_dim_1_label_id": null, "store_module_dim_1_dir_id": null, "store_module_dim_2": null, "store_module_dim_2_label_id": null, "store_module_dim_2_dir_id": null, "has_predefined_positions":  null },
		// store_type_name: {
		// 	changed: false,
		// 	change: function() {
		// 		cntlr.adder.store_type_name.changed = true;
		// 		cntlr.adder.submit.enabled();
		// 	}
		// },
		// store_type_cat_id: {
		// 	select: JSON.parse(JSON.stringify(cntlr.objects.category)),
		// 	changed: false,
		// 	change: function() {
		// 		cntlr.adder.type.store_type_cat_id = cntlr.adder.store_type_cat_id.select.store_type_cat_id;
		// 		cntlr.adder.store_type_cat_id.changed = true;
		// 		cntlr.adder.submit.enabled();
		// 	}
		// },
		new: function() {
			// cntlr.adder.submit.disable = true;
			// cntlr.adder.store_type_name.changed = false;
			// cntlr.adder.store_type_cat_id.changed = false;
			// cntlr.adder.type = JSON.parse(JSON.stringify(cntlr.objects.type));
			// cntlr.adder.store_type_cat_id.select = JSON.parse(JSON.stringify(cntlr.objects.category));
			cntlr.adder.on();
		},
		// submit: {
		// 	disable: true,
		// 	enabled: function() {
		// 		cntlr.adder.submit.disable = !(cntlr.adder.store_type_name.changed && cntlr.adder.store_type_cat_id.changed);
		// 	},
		// 	commit: function() {
		// 		console.log('cntlr.adder.type', cntlr.adder.type);
		// 		// TODO: insert new type
		// 		cntlr.adder.off();
		// 	}
		// },
		show: false,
		on: function() { cntlr.adder.show = true; },
		off: function() { console.log('off'); cntlr.adder.show = false; },
		toggle: function() { cntlr.adder.show = !cntlr.adder.show; }
	};

	cntlr.updater = {
		original: null,
		module_name: {
			disable: true
		}
		// dim1Dir: null,
		// dim1Lab: null,
		// dim2Dir: null,
		// dim2Lab: null,
		// store_type_name: {
		// 	disable: true,
		// 	trigger: null,
		// 	commit: function() {
		// 		console.log('commit()');
		// 		// TODO: update name via api
		// 	},
		// 	change: function(value) {
		// 		$timeout.cancel(cntlr.updater.store_type_name.trigger);
		// 		cntlr.updater.store_type_name.trigger = $timeout(cntlr.updater.store_type_name.commit, 1000);
		// 	}
		// },
		// store_type_cat_id: {
		// 	disable: true,
		// 	change: function(category) {
		// 		// TODO: update category via api
		// 		cntlr.chooser.type.store_type_cat_id = category.store_type_cat_id;
		// 	}
		// }
	};

	// Initialize data
	SecurityModuleService.getModules().then(function (data) { 
		cntlr.objects.modules = data;
	});

};

angular
.module('securityModule')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('module', {
		url: "/security/module",
		templateUrl: 'modules/security-module/security-module.html',
		controllerAs: 'cntlr',
		controller: 'Modules',
		security: {
			module: "security-module",
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
.controller('Modules', [
	'SecurityModuleService',
	Modules
]);

})();

console.log('SecurityModule Controller Initialized');
