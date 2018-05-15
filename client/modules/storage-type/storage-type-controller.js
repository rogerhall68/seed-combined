(function(){
'use strict';

var Types = function($rootScope, $timeout, StorageTypeService) {
	console.log('Types');
	var cntlr = this;

	cntlr.objects = {
		type: { "store_type_id": null, "store_type_name": null, "store_type_cat_id": null },
		types: null,
		category: { "store_type_cat_id": null, "store_type_cat_name": null },
		categories: null
	};

	cntlr.chooser = {
		type: null,
		change: function(type) {
			// cntlr.updater.original = type;
			cntlr.updater.category = cntlr.objects.categories.filter(function(c){ return c.store_type_cat_id == type.store_type_cat_id; })[0];
			cntlr.updater.store_type.disable = false;
		}
	};

	cntlr.adder = {
		type: JSON.parse(JSON.stringify(cntlr.objects.type)),
		store_type_name: {
			changed: false,
			change: function(type) {
				console.log('change(type)', type);
				cntlr.adder.store_type_name.changed = true;
				cntlr.adder.submit.enabled();
			}
		},
		store_type_cat_id: {
			select: JSON.parse(JSON.stringify(cntlr.objects.category)),
			changed: false,
			change: function() {
				cntlr.adder.type.store_type_cat_id = cntlr.adder.store_type_cat_id.select.store_type_cat_id;
				cntlr.adder.store_type_cat_id.changed = true;
				cntlr.adder.submit.enabled();
			}
		},
		new: function() {
			cntlr.adder.submit.disable = true;
			cntlr.adder.store_type_name.changed = false;
			cntlr.adder.store_type_cat_id.changed = false;
			cntlr.adder.type = JSON.parse(JSON.stringify(cntlr.objects.type));
			cntlr.adder.store_type_cat_id.select = JSON.parse(JSON.stringify(cntlr.objects.category));
			cntlr.adder.on();
		},
		submit: {
			disable: true,
			enabled: function() {
				cntlr.adder.submit.disable = !(cntlr.adder.store_type_name.changed && cntlr.adder.store_type_cat_id.changed);
			},
			commit: function() {
				console.log('cntlr.adder.type', cntlr.adder.type);
				// TODO: insert new type
				StorageTypeService.putType(cntlr.adder.type);
				cntlr.objects.types.push(cntlr.adder.type); // Adding to local list
				cntlr.adder.off();
			}
		},
		show: false,
		on: function() { cntlr.adder.show = true; },
		off: function() { cntlr.adder.show = false; },
		toggle: function() { cntlr.adder.show = !cntlr.adder.show; }
	};

	cntlr.updater = {
		store_type: {
			disable: true
		},
		original: null,
		category: null,
		store_type_name: {
			trigger: null,
			change: function(value) {
				console.log('change(type)', value);
				$timeout.cancel(cntlr.updater.store_type_name.trigger);
				cntlr.updater.store_type_name.trigger = $timeout(cntlr.updater.store_type_name.commit, 1000);
			},
			commit: function() {
				console.log('commit()');
				// TODO: update name via api
			}
		},
		store_type_cat_id: {
			change: function(category) {
				// TODO: update category via api
				cntlr.chooser.type.store_type_cat_id = category.store_type_cat_id;
			}
		},
		delete: {
			disable: true,
			commit: function() {
				console.log('cntlr.chooser.type', cntlr.chooser.type);
				StorageTypeService.deleteType(cntlr.chooser.type);
				// TODO: remove type
				// cntlr.objects.types.push(cntlr.adder.type); // Adding to local list
			}
		}
	};

	// Initialize data
	StorageTypeService.getTypes().then(function (data) { 
		cntlr.objects.types = data;
		StorageTypeService.getCategories().then(function (data) { cntlr.objects.categories = data; });
	});
};

angular
.module('storageType')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('type', {
		url: "/storage/type",
		templateUrl: 'modules/storage-type/storage-type.html',
		controllerAs: 'cntlr',
		controller: 'Types',
		security: {
			module: "storage-type",
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
.controller('Types', [
	'$rootScope',
	'$timeout',
	'StorageTypeService',
	Types
]);

})();

console.log('StorageType Controller Initialized');
