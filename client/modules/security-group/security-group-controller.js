(function(){
'use strict';

var Groups = function(SecurityGroupService) {
	console.log('Groups');
	var cntlr = this;

	cntlr.objects = {
		groups: null,
		childs: null,
		dirs: null,
		labs: null,
		users: [ { "id": 1, "name": "Roger Hall" }, { "id": 2, "name": "Michael Rutherford" }, { "id": 3, "name": "Clyde Bailey" }, { "id": 4, "name": "Phillip Farmer" } ],
		roles: [ { "id": 1, "name": "Administrator" }, { "id": 2, "name": "Normal User" }, { "id": 3, "name": "View Only" } ]
	};

	cntlr.chooser = {
		group: null,
		change: function(chosen) {
			console.log('cntlr.chooser.group', cntlr.chooser.group);
			cntlr.updater.group_name.disable = false;
			cntlr.updater.group_users.disable = false;
			cntlr.updater.group_roles.disable = false;
		}
	};

	cntlr.adder = {
		group: { "store_group_id": null, "store_type_id": null, "store_group_name": null, "store_group_desc": null, "store_group_brand": null, "store_group_model": null, "store_group_dim_1": null, "store_group_dim_1_label_id": null, "store_group_dim_1_dir_id": null, "store_group_dim_2": null, "store_group_dim_2_label_id": null, "store_group_dim_2_dir_id": null, "has_predefined_positions":  null },
		new: function() {
			cntlr.adder.on();
		},
		show: false,
		on: function() { cntlr.adder.show = true; },
		off: function() { console.log('off'); cntlr.adder.show = false; },
		toggle: function() { cntlr.adder.show = !cntlr.adder.show; }
	};

	cntlr.updater = {
		original: null,
		group_name: {
			disable: true
		},
		group_users: {
			disable: false
		},
		group_roles: {
			disable: false
		},
	};

	// Initialize data
	SecurityGroupService.getGroups().then(function (data) { 
		cntlr.objects.groups = data;
	});
};

angular
.module('securityGroup')
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('group', {
		url: "/security/group",
		templateUrl: 'modules/security-group/security-group.html',
		controllerAs: 'cntlr',
		controller: 'Groups',
		security: {
			module: "security-group",
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
.controller('Groups', [
	'SecurityGroupService',
	Groups
]);

})();

console.log('SecurityGroup Controller Initialized');
