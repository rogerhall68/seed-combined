var FS = require('./fs.js');

// Write, Read, and Append
FS.writeFile('abc.txt', 'abc');
console.log("File Written");

var text = FS.readFile('./abc.txt');
console.log("TXT: " + text);

FS.appendFile('abc.txt', 'xyz');
console.log("File Appended");

text = FS.readFile('./abc.txt');
console.log("TXT: " + text);

// File Attributes
console.log("isFile: " + FS.isFile('./abc.txt'));
console.log("isDir: " + FS.isDir('./abc.txt'));
console.log("isDir: " + FS.isDir('..'));
console.log("Stats: " + FS.stats('./abc.txt'));
console.log("isFile: " + FS.stats('./abc.txt').isFile());

// Functional Programming Example
var logger = function(text) {
	FS.writeFile('logger.txt', text);
};

logger('dude');
text = FS.readFile('./logger.txt');
console.log("TXT: " + text);

logger('abide');
text = FS.readFile('./logger.txt');
console.log("TXT: " + text);



