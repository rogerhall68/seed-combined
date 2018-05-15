// Workbench Sys Module
module.exports = function(router, db, config) {
	var impl = require('./' + config.db.db + '.js'); // implementation

	router.route('/table').get(getTables);
	router.route('/table/:table_name').get(getTable);
	router.route('/table/:table_name').post(updateTable);
	router.route('/table/:table_name/attrib/:attrib_name').get(getAttrib);
	router.route('/table/:table_name/attrib/:attrib_name').post(updateAttrib);
	router.route('/s/:table_name').get(selectAsync);
	router.route('/s/:table_name').post(selectAsync);
	router.route('/l/:table_name').post(selectAsyncLU);
	router.route('/i/:table_name').post(insertAsync);
	router.route('/u/:table_name').post(updateAsync);

	router.route('/sys/leaves').get(getLeaves);

	function getLeaves(req, res) {
		db.exec(res, impl.getLeaves);
	}

	function getTables(req, res) {
		db.exec(res, impl.getTables);
	}

	function getTable(req, res) {
		db.exec(res, impl.getTable, impl.getTable.data(req));
	}

	function updateTable(req, res) {
		db.exec(res, impl.updateTable, impl.updateTable.data(req));
	}

	function getAttrib(req, res) {
		db.exec(res, impl.getAttrib, impl.getAttrib.data(req));
	}

	function updateAttrib(req, res) {
		db.exec(res, impl.updateAttrib, impl.updateAttrib.data(req));
	}

	function selectAsync(req, res) {
		db.exec(res, impl.selectAsync, impl.selectAsync.data(req));
	}

	function selectAsyncLU(req, res) {
		db.exec(res, impl.selectAsyncLU, impl.selectAsyncLU.data(req));
	}

	function insertAsync(req, res) {
		db.exec(res, impl.insertAsync, impl.insertAsync.data(req));
	}

	function updateAsync(req, res) {
		db.exec(res, impl.updateAsync, impl.updateAsync.data(req));
	}
};
