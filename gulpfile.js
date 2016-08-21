'use strict';
let gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create();

// JS 
gulp.task('js', function () {
	return gulp.src('./app/js/entry.js')
		.pipe(browserify())
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./app/js/bundle/'));
});

// create a task that ensures the `js` task is complete before reloading browsers
gulp.task('js-watch', ['js'], function (done) {
	browserSync.reload();
	done();
});

// Browsersync
gulp.task('browser-sync', ['js'], function() {
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
	gulp.watch('./app/js/*.js', ['js-watch']);
});

// default
gulp.task('default', ['js', 'browser-sync']);
