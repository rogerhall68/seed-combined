(function() {
	var FS = require('fs');
	// TODO: var path = require('path');

	function appendFile(pathName, text) {
		// isValid(pathName);
		FS.appendFileSync(pathName, text);
		// exists(pathName);
	}

	function readFile(pathName) {
		// isValid(pathName);
		// exists(pathName);
		return FS.readFileSync(pathName);
	}

	function writeFile(pathName, text) {
		// isValid(pathName);
		FS.writeFileSync(pathName, text);
		// exists(pathName);
	}

	function isFile(pathName) {
		// isValid(pathName);
		// exists(pathName);
		return FS.statSync(pathName).isFile();
	}

	function isDir(pathName) {
		// isValid(pathName);
		// exists(pathName);
		return FS.statSync(pathName).isDirectory();
	}

	function stats(pathName) {
		// isValid(pathName);
		// exists(pathName);
		return FS.statSync(pathName);
	}

	// TODO: function isValid(pathName) {}
	// 	path.dirname();
	// 	https://nodejs.org/api/path.html
	// TODO: function exists(pathName) {}
	// 	fs.existsSync(pathName);
	// https://nodejs.org/api/fs.html#fs_fs_exists_path_callback

	module.exports = {
		appendFile: appendFile,
		writeFile: writeFile,
		readFile: readFile,
		isFile: isFile,
		isDir: isDir,
		stats: stats
	};
})();