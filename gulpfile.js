//Require for Gulp and Server
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	historyApiFallback = require('connect-history-api-fallback');

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


//Stylus

var stylus = require('gulp-stylus');
	nib = require('nib');


//Prepros the files .styl to css and reload the page.
gulp.task('css', function(){
	gulp.src('./app/stylesheets/main.styl')
		.pipe(stylus({ use: nib() }))
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
});


//Reload the page if have changes in the HTML
gulp.task('html', function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload());
});


//Watch if have changes in HTML and CSS
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
});


//Default Task
gulp.task('default', ['server', 'watch']);
