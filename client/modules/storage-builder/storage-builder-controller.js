(function(){
'use strict';

var Builders = function(StorageBuilderService) {
	console.log('Builders');
	var cntlr = this;

	cntlr.objects = {
		builders: null,
		childs: null,
		dirs: null,
		labs: null
	};

	cntlr.chooser = {
		builder: null,
		change: function(chosen) {
			console.log('cntlr.chooser.builder', cntlr.chooser.builder);
			cntlr.updater.component1.show = true;
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
		builder: { "store_builder_id": null, "store_type_id": null, "store_builder_name": null, "store_builder_desc": null, "store_builder_brand": null, "store_builder_model": null, "store_builder_dim_1": null, "store_builder_dim_1_label_id": null, "store_builder_dim_1_dir_id": null, "store_builder_dim_2": null, "store_builder_dim_2_label_id": null, "store_builder_dim_2_dir_id": null, "has_predefined_positions":  null },
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
		component1: {
			show: false
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
	StorageBuilderService.getFreezers().then(function (data) { 
		cntlr.objects.builders = data;
	});

};

angular
.module('storageBuilder')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('builder', {
		url: "/storage/builder",
		templateUrl: 'modules/storage-builder/storage-builder.html',
		controllerAs: 'cntlr',
		controller: 'Builders',
		security: {
			module: "storage-builder",
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
.controller('Builders', [
	'StorageBuilderService',
	Builders
]);

})();

console.log('StorageBuilder Controller Initialized');
