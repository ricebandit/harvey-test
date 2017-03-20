'use strict'

var gulp = require( 'gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');


// COMPILE JS LIBRARIES
gulp.task('vendors', function(){
	return gulp.src([
		'./js/vendors/jquery-3.2.0.js',
		'./js/vendors/date.js'
	])
	.pipe(sourcemaps.init() )
	.pipe( concat( 'vendors.js' ) )
	.pipe( uglify() )
	.pipe( sourcemaps.write('./') )
	.pipe( gulp.dest('public/js') )
})

// COMPILE APP
gulp.task('app', function(){
	return gulp.src('./src/js/app/**/*.js')
	.pipe(sourcemaps.init() )
	.pipe( concat( 'app.js' ) )
	.pipe( uglify() )
	.pipe( sourcemaps.write('./') )
	.pipe( gulp.dest('public/js') )
})

// COMPILE SASS
gulp.task('sass', function(){
	gulp.src('./src/scss/**/*.scss')
	.pipe( sourcemaps.init() )
	.pipe( sass().on('error', sass.logError) )
	.pipe( gulp.dest('./public/css') )
	.pipe( rename('./public/css/style.min.css') )
	.pipe( minifycss() )
	.pipe( sourcemaps.write() )
	.pipe( gulp.dest('./') )

});

gulp.task( 'default', function(){
	gulp.watch(['./src/scss/**/*.scss','./src/js/**/*.js'], ['sass', 'app']);
});