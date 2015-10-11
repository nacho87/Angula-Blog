'use strict';

//Require for Gulp and Server
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	historyApiFallback = require('connect-history-api-fallback'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	inject = require('gulp-inject'),
	wiredep = require('wiredep').stream,
	templateCache = require('gulp-angular-templateCache'),
	gulpif = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	uncss = require('gulp-uncss');

//Server for Development
gulp.task('server', function(){
	connect.server({
		root: './app',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt){
			return [ historyApiFallback()];
		}
	});
});

//Server for Production
gulp.task('server-dist', function(){
	connect.server({
		root: './dist',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt){
			return [ historyApiFallback()];
		}
	});
});


//jshint
gulp.task('jshint', function(){
	return gulp.src('./app/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

//Stylus
//Prepros the files .styl to css and reload the page.
gulp.task('css', function(){
	gulp.src('./app/stylesheets/main.styl')
		.pipe(stylus({ use: nib() }))
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
});

//Compress Css for Production
gulp.task('compress', function(){
	gulp.src('./app/index.html')
		.pipe(useref.assets())
		.pipe(gulpif('*.js', uglify({mangle: false})))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('./dist'));
});

//Remove unnecessary Css
gulp.task('uncss', function(){
	gulp.src('./dist/css/style.min.css')
		.pipe(uncss({
			html: [
				'./app/index.html',
				'./app/views/post-detail.tpl.html',
				'./app/views/post-list.tpl.html',
				'./app/views/post-create.tpl.html'
			]
		}))
		.pipe(gulp.dest('./dist/css'));
});


//Reload the page if have changes in the HTML
gulp.task('html', function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload());
});

//Dist Html for Production
gulp.task('copy', function(){
	gulp.src('./app/index.html')
		.pipe(useref())
		.pipe(gulp.dest('./dist'));
	gulp.src('./app/lib/font-awesome/fonts/**')
		.pipe(gulp.dest('./dist/fonts'));
});

//Inject css and js files
gulp.task('inject', function(){
	var sources = gulp.src(['./app/scripts/**/*.js', './app/stylesheets/**/*.css']);
	gulp.src('index.html', {cwd: './app'})
		.pipe(inject(sources, {
			read: false,
			ignorePath: '/app'
			}))
		.pipe(gulp.dest('./app'));
});


//Inject the bower libs
gulp.task('wiredep',function(){
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: './app/lib'
			}))
		.pipe(gulp.dest('./app'));
});

//Template Cache
gulp.task('templates', function(){
	gulp.src('./app/views/**/*.tpl.html')
		.pipe(templateCache({
			root: 'views/',
			module: 'blog.templates',
			standalone: true,
		}))
		.pipe(gulp.dest('./app/scripts'));
});


//Watch if have changes in HTML and CSS
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['html', 'templates']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
	gulp.watch(['./app/scripts/**/*.js', './gulpfile.js'], ['jshint', 'inject']);
	gulp.watch(['./bower.json'], ['wiredep']);
});


//Default Task
gulp.task('default', ['server','templates','inject','wiredep', 'watch']);


//Build Task
gulp.task('build', ['templates', 'compress', 'copy', 'uncss']);
