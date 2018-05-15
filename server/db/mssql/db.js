module.exports = function(config) {
	var mssql = require('mssql');
	var connectString = 'mssql://' + config.db.user + ':' + config.db.pass + '@' + config.db.server + '/' + config.db.database;

	function isProc(q) { if (q.substring(0,5) === "[dbo]") { return true; } else { return false; } }
	function sqlType(type, size) { 
		if (type == "varchar") { return mssql.VarChar(size); }
	}

	function exec(res, impl, data, build) {
		var q = impl.q;
		var params = impl.params;
		var output = impl.output;
		if (build === null || build === undefined) { build = function(data) { return data; }; }

		if (isProc(q)) {
			mssql.connect(connectString).then(function() {
				var request = new mssql.Request();
				for (var x in params) {
					request.input(params[x], data[x]);
				}
				for (x in output) {
					var type = sqlType(output[x].type, output[x].size);
					request.output(output[x].name, type);
				}
				console.log('q: ' + q);
				request.execute(q).then(function(recordsets) {
					var result = {};
					for (var x in output) {
						// console.log('v: ' + JSON.stringify(request.parameters[output[x].name]));
						result[output[x].name] = request.parameters[output[x].name].value;
					}
					// console.log('output: ' + JSON.stringify(result));
				    res.json(build(result));
				})
				.catch(function(err) {
					// ... execute error checks 
					console.log('execute error');
					console.log(err);
				})
				;
				
			}).catch(function(err) {
				// ... connect error checks 
				console.log('connect error');
				console.log(err);
			});
		} else {
			mssql.connect(connectString).then(function() {
				var request = new mssql.Request();
				for (var x in params) {
					console.log('q: ' + params[x] + ' ' + data[x]);
					request.input(params[x], data[x]);
				}
				console.log('q: ' + q);
				request.query(q).then(function(recordsets) {
					// console.dir(recordsets);
					// var result = build(JSON.stringify(recordsets));
					var result = build(recordsets);
				    res.json(result);
				    // res.json(recordsets);
				}).catch(function(err) {
					// ... query error checks 
					console.log('query error');
					console.log(err);
				});
			}).catch(function(err) {
			    // ... connect error checks
					console.log('connect error');
					console.log(err);
			});
		}
	}

	this.exec = exec;
	return this;
};
