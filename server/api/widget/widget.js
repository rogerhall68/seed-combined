// Workbench widget Module
module.exports = function(router, db) {
	var data = require('./data.js');

	router.route('/widget')
		.get(widgetGet);

	function widgetGet(req, res) {
	    res.json(data);
	}
};
