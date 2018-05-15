module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			js: 'build/js',
			css: 'build/css'
		},
		jshint: {
			options: {
				esversion: 6,
		        globals: {
		        	require: true,
		        	process: true,
		        	"__dirname": true,
		        	console: true
		        }
		    },
			api: {
				options: {
				    node: true
				},
				files: {
					src: ['server/**/*.js']
				}
			},
			client: [
				'client/**/*.js',
				'!client/bower_components/**/*.js',
				'!client/js*/*.js'
			],
			sys: ['Gruntfile.js']
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
					clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
					noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
				},
				src: ['server/**/*test.js']
			}
		},		
		mkdir: {
			init: {
				options: {
					create: ['build/js', 'build/css']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mkdir');
	// grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('timestamp', function() {
		var options = this.options({
			file: '.timestamp'
		});
		var timestamp = +new Date();
		var contents = timestamp.toString();
		grunt.file.write(options.file, contents);
	});
	grunt.registerTask('default', ['mkdir', 'jshint', 'clean', 'timestamp', 'mochaTest']);
};