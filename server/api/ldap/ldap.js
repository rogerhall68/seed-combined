// Workbench LDAP Module
module.exports = function(router, db, config) {
	// var impl = require('./' + config.db.db + '.js'); // implementation
	var ldap = require('ldapjs');
	var client = null;

	router.route('/ldap/user').post(authN);

	function authN(req, res) {
		var user   = req.body;
		var opts = {
		  filter: 'sAMAccountName=' + user.name,
		  scope: 'sub',
		  attributes: config.ldap.attributes
		};

		client = ldap.createClient({
			url: config.ldap.url
		});

		client.bind(config.ldap.bindDN, config.ldap.bindPW, function(error, result) {
			if (error) { 
				console.log('ldap error:', error); 
				res.json({ "error": "User not found" });
			}
			else {
				client.search(config.ldap.searchDN, opts, function(error, result) {
					result.on('searchEntry', function(entry) {
						client.bind(entry.object.dn, user.password, function(error, result) {
							if (error) { 
								console.log('ldap error:', error); 
								res.json({ "error": "Incorrect password" });
							}
							else { 
								res.json({
									"user": { "id": 1, "name": user.name },
									"lab": { "id": 1, "name": "Accession Lab" },
									"token": "1233455677787899",
									"priv": { }
								});
							}
							client.unbind(function(error) {
								if (error) { 
									console.log('ldap error:', error); 
									res.json({ "ldap error": "Unbind failure" });
								}
							});
					});
					});
					result.on('searchReference', function(referral) {
						console.log('referral: ' + referral.uris.join());
					});
					result.on('error', function(error) {
						console.log('ldap error:', error.code, error.name, error.message); 
						res.json({ "error": error.code + " " + error.name + " " + error.message });
					});
					result.on('end', function(result) {
						console.log('status: ' + result.status);
					});
				});				
			}
		});
	}

	function authZ(user) {

	}


};

