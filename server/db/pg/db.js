module.exports = function(config) {
	var pg = require('pg');
	var db = 'pg://' + config.db.user + ':' + config.db.pass + '@' + config.db.server + ':' + config.db.port + '/' + config.db.database;

	function exec(res, q, data) {
		pg.connect(db, function(err, client, done) {
		    client.query(q, data, function(err, result) {
		      if (result.rows < 1) { res.json('ok'); } else { res.json(result.rows); }
		      done();  // client idles for 30 seconds before closing
		    });
		});
	}

	this.exec = exec;
	return this;
};
