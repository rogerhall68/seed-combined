// DB Module 
// Loads the database implementation set in config.JSON
module.exports = function(config) {
	console.log('./db/db.js ' + config.db.db);
	return require('./' + config.db.db + '/db.js')(config);
};

