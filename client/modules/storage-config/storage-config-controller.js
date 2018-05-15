(function(){
'use strict';

var Configs = function(StorageConfigService) {
	console.log('Configs');
	var cntlr = this;

	cntlr.objects = {
		configs: null,
		allowed: null,
		childs: null,
		dirs: null,
		labs: null
	};

	cntlr.chooser = {
		config: null,
		copy: { disable: true },
		change: function(chosen) {
			console.log('cntlr.chooser.config', cntlr.chooser.config);
			console.log('cntlr.chooser.config.is_unused', cntlr.chooser.config.is_unused);

			cntlr.chooser.copy.disable = false;

			if (cntlr.chooser.config.is_unused == 1) { 
				cntlr.updater.store_config.disable = false; 
				cntlr.updater.delete.disable = false; 
			}
			else { cntlr.updater.store_config.disable = true; }
			
			cntlr.updater.dim1Dir = cntlr.objects.dirs.filter(function(c){ return c.store_dim_dir_id == chosen.store_config_dim_1_dir_id; })[0];
			cntlr.updater.dim1Lab = cntlr.objects.labs.filter(function(c){ return c.store_dim_label_id == chosen.store_config_dim_1_label_id; })[0];
			cntlr.updater.dim2Dir = cntlr.objects.dirs.filter(function(c){ return c.store_dim_dir_id == chosen.store_config_dim_2_dir_id; })[0];
			cntlr.updater.dim2Lab = cntlr.objects.labs.filter(function(c){ return c.store_dim_label_id == chosen.store_config_dim_2_label_id; })[0];
			
			StorageConfigService.getValidChildren(cntlr.chooser.config.store_config_id).then(function (data) { 
				cntlr.objects.childs = data;
			});

			console.log('cntlr.chooser.config', cntlr.chooser.config);
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
		template: { "store_config_id": null, "store_type_id": null, "store_config_name": null, "store_config_desc": null, "store_config_brand": null, "store_config_model": null, "store_config_dim_1": null, "store_config_dim_1_label_id": null, "store_config_dim_1_dir_id": null, "store_config_dim_2": null, "store_config_dim_2_label_id": null, "store_config_dim_2_dir_id": null, "has_predefined_positions":  null },
		config: { "store_config_id": null, "store_type_id": null, "store_config_name": null, "store_config_desc": null, "store_config_brand": null, "store_config_model": null, "store_config_dim_1": null, "store_config_dim_1_label_id": null, "store_config_dim_1_dir_id": null, "store_config_dim_2": null, "store_config_dim_2_label_id": null, "store_config_dim_2_dir_id": null, "has_predefined_positions":  null },
		store_config_name: {
			changed: false,
			change: function() {
				cntlr.adder.store_config_name.changed = true;
				cntlr.adder.submit.enabled();
			}
		},
		// store_type_name: {
		// 	changed: false,
		// 	change: function() {
		// 		cntlr.adder.store_type_name.changed = true;
		// 		cntlr.adder.submit.enabled();
		// 	}
		// },
		// store_type_cat_id: {
		// 	// select: JSON.parse(JSON.stringify(cntlr.objects.category)),
		// 	changed: false,
		// 	change: function() {
		// 		cntlr.adder.type.store_type_cat_id = cntlr.adder.store_type_cat_id.select.store_type_cat_id;
		// 		cntlr.adder.store_type_cat_id.changed = true;
		// 		cntlr.adder.submit.enabled();
		// 	}
		// },
		new: function() {
			for(var k in cntlr.adder.template) cntlr.adder.config[k]=cntlr.adder.template[k];
			// cntlr.adder.submit.disable = true;
			// cntlr.adder.store_type_name.changed = false;
			// cntlr.adder.store_type_cat_id.changed = false;
			// cntlr.adder.type = JSON.parse(JSON.stringify(cntlr.objects.type));
			// cntlr.adder.store_type_cat_id.select = JSON.parse(JSON.stringify(cntlr.objects.category));
			cntlr.adder.on();
		},
		copy: function() {
			for(var k in cntlr.chooser.config) cntlr.adder.config[k]=cntlr.chooser.config[k];
			// cntlr.adder.submit.disable = true;
			// cntlr.adder.store_type_name.changed = false;
			// cntlr.adder.store_type_cat_id.changed = false;
			// cntlr.adder.type = JSON.parse(JSON.stringify(cntlr.objects.type));
			// cntlr.adder.store_type_cat_id.select = JSON.parse(JSON.stringify(cntlr.objects.category));
			cntlr.adder.on();
		},
		submit: {
			disable: true,
			enabled: function() {
				// cntlr.adder.submit.disable = !(cntlr.adder.store_type_name.changed && cntlr.adder.store_type_cat_id.changed);
				cntlr.adder.submit.disable = !(cntlr.adder.store_config_name.changed);
			},
			commit: function() {
				console.log('cntlr.adder.config', cntlr.adder.config);
				if (cntlr.adder.config.has_predefined_positions === null) { cntlr.adder.config.has_predefined_positions = false; }
				console.log('cntlr.adder.config.has_predefined_positions', cntlr.adder.config.has_predefined_positions);

				// TODO: insert new type
				StorageConfigService.postConfig(cntlr.adder.config);
				cntlr.adder.off();
			}
		},
		show: false,
		on: function() { cntlr.adder.show = true; },
		off: function() { console.log('off'); cntlr.adder.show = false; },
		toggle: function() { cntlr.adder.show = !cntlr.adder.show; }
	};

	cntlr.updater = {
		store_config: {
			disable: true
		},
		original: null,
		dim1Dir: null,
		dim1Lab: null,
		dim2Dir: null,
		dim2Lab: null,
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
		delete: {
			disable: true,
			// disable: cntlr.chooser.config.is_unused,
			commit: function() {
				StorageConfigService.deleteConfig(cntlr.chooser.config);
			}
		}
	};

	// Initialize data
	StorageConfigService.getConfigs().then(function (data) { 
		cntlr.objects.configs = data;
		StorageConfigService.getDimDirs().then(function (data) { 
			cntlr.objects.dirs = data;
			StorageConfigService.getDimLabs().then(function (data) { 
				cntlr.objects.labs = data;
				// StorageConfigService.getDimLabs().then(function (data) { 
				// 	cntlr.objects.labs = data;
				// });
			});
		});
	});

};

angular
.module('storageConfig')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('config', {
		url: "/storage/config",
		templateUrl: 'modules/storage-config/storage-config.html',
		controllerAs: 'cntlr',
		controller: 'Configs',
		security: {
			module: "storage-config",
			parent: "storage"
		},
		hotkeys: {
			app: [],
			state: []
		},
		cache: []
	})
	;
}])
.controller('Configs', [
	'StorageConfigService',
	Configs
]);

})();

console.log('StorageConfig Controller Initialized');
