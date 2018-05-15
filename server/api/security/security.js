// Workbench Storage Module
module.exports = function(router, db, config) {
	var impl = require('./' + config.db.db + '.js'); // implementation

	router.route('/security/user').get(getUsers); // module: security-user
	router.route('/security/user/:user_name').get(getUser); // module: security-user

	router.route('/security/group').get(getGroups); // module: security-group
	router.route('/security/module').get(getModules); // module: security-module
	router.route('/security/role').get(getRoles); // module: security-module
	router.route('/security/user/type').get(getUserTyes); // module: security-module
	router.route('/security/dept').get(getDepartments); // module: security-module
	router.route('/security/lab').get(getLaboratorys); // module: security-module

	router.route('/security/priv').post(postPrivs); // module: security-module

	// router.route('/security/config/:config_id').get(getConfig);
	// router.route('/security/freezer/:root_id').get(getStorage);

	// function passThru(data) { return data; }

	function postPrivs(req, res) {
		// db.exec(res, impl.getUsers, null, null, passThru);
		// db.exec(res, impl.getUsers);
		console.log('postPrivs', req.body);
	}

	function getUsers(req, res) {
		// db.exec(res, impl.getUsers, null, null, passThru);
		db.exec(res, impl.getUsers);
	}

	function getUser(req, res) {
		db.exec(res, impl.getUser, impl.getUser.data(req));
	}

	function getGroups(req, res) {
		db.exec(res, impl.getGroups);
	}

	function getModules(req, res) {
		db.exec(res, impl.getModules, null, buildModules);
	}

	function findChildModules(modules, moduleId) { return modules.filter(function(module) { return (module.parent_module_id === moduleId); }); }
	function buildModules(data) {
		var roots = data.filter(d => d.parent_module_id === null);
		var modules = [];
		function addModule(node) {
			node.checked = { 'view': false, 'edit': false, 'admin': false }
			modules.push(node);
		}
		function addChildren(nodes, level) {
			nodes.forEach(function(node){
				node.uiLevel = level;
				addModule(node);
				var children = findChildModules(data, node.module_id);
				if (children.length > 0) {
					addChildren(children, level + 1);
				}
			});
		}
	
		roots.forEach(function(root){
			root.uiLevel = 0;
			addModule(root);
			var children = findChildModules(data, root.module_id);
			if (children.length > 0) {
				addChildren(children, 1);
			}
			// data.filter(d => d.parent_module_id === null);.forEach()
		});
		return modules;
	}


	function getRoles(req, res) {
		db.exec(res, impl.getRoles);
	}

	function getUserTyes(req, res) {
		db.exec(res, impl.getUserTyes);
	}

	function getDepartments(req, res) {
		db.exec(res, impl.getDepartments);
	}

	function getLaboratorys(req, res) {
		db.exec(res, impl.getLaboratorys);
	}

	// function getConfig(req, res) {
	// 	db.exec(res, impl.getConfig, impl.getConfig.data(req), impl.getConfig.params);
	// }
};
