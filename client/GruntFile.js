module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'http-server': {
			dev: {
				port: 3000,
				root: './build',
				host: '0.0.0.0',
				ext: 'html'
			}
		},
		clean: ['build/'],
		'uglify': {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				sourceMap: false
			},
			build: {
				expand: true,
				cwd: 'app',
				src: '**/*.js',
				ext: '.min.js',
				dest: 'build'
			}
		},
		concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['app/**/*.js'],
		      dest: 'build/app.js',
		    },
		  },
		copy: {
			content: {
				files: [
					{src: ['**/*.html'], dest: 'build/', cwd: 'app', expand: true}
				]
			},
			vendor: {	
				files: [
					{ cwd: 'vendor/bootstrap/dist/', src: 'css/*.*', dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/bootstrap/dist/js/', src: 'bootstrap.js', dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/jquery/dist', src: 'jquery.js', dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/angular', src: 'angular.js', dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/angular-route', src: 'angular-route.js', dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/angular-ui-grid', src: ['ui-grid.*'], dest: 'build/vendor/', expand: true },
					{ cwd: 'vendor/angular-bootstrap', src: 'ui-bootstrap.js', dest: 'build/vendor/', expand: true},
					{ cwd: 'vendor/angular-bootstrap', src: 'ui-bootstrap-tpls.js', dest: 'build/vendor/', expand: true},
					{ cwd: 'vendor/angular-confirm-modal', src: 'angular-confirm.js', dest: 'build/vendor/', expand: true}
				]
			}
		},
		watch: {
			scripts: {
				files: ['app/**/*.js'],
				tasks: ['concat']
			},
			html: {
				files: ['app/**/*.html'],
				tasks: ['copy:content']
			}
		},
		concurrent: {
			all: {
				tasks: ['http-server', 'watch', 'copy:vendor'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['clean', 'concat', 'copy', 'concurrent:all']);
};