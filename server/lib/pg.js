(function() {
	var pg         = require('pg');
	var db         = require('../db.js');

	function exec(res, q, data) {
		pg.connect(db, function(err, client, done) {
		    client.query(q, data, function(err, result) {
		      if (result.rows < 1) { res.json('ok'); } else { res.json(result.rows); }
		      done();  // client idles for 30 seconds before closing
		    });
		});
	}

	module.exports = {
		exec: exec
	};
})();