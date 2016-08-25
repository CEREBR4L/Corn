var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var gulpIf = require('gulp-if');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');

var browserSync = require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', function (callback) {

	runSequence(

	['watch'],
	callback

	)

});

gulp.task('watch', ['browserSync', 'sass', 'babel'], function(){

	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('build', function(callback){

	runSequence(

		'clean:dist',
		'sass',
		['useref', 'templates', 'images', 'fonts'],
		callback

	)

});

gulp.task('sass', function(){

	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))

});

gulp.task('browserSync', ['nodemon'], function(){

	browserSync.init(null, {
		proxy: "http://localhost:8080",
		files: ["app/**/*.*"],
		port: 3000,
	});

});

gulp.task('useref', ['babel'], function(){

	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify({mangle: false})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))

});

gulp.task('babel', () => 

	gulp.src('app/**/*.js', {base:"./"})
		.pipe(babel({
			presets: ['es2015'],
			sourceMap: true,
            sourceRoot: 'app'
		}))
		.pipe(gulp.dest('.'))

);

gulp.task('nodemon', function(cb){

	var started = false;

	nodemon({

		script: 'server.js'

	}).on('start', function(){

		if (!started){
			cb();
			started = true; 
		} 

	});

});

gulp.task('templates', function(){

	return gulp.src('app/templates/**/*.html')
	.pipe(gulp.dest('dist/templates'))

});

gulp.task('images', function(){

	return gulp.src('app/img/**/*.+(png|jpg|svg|gif)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/img'));

});

gulp.task('fonts', function(){

	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

});

gulp.task('clean:dist', function(){

	return del.sync('dist');

});

/*gulp.task('clean:js', function(){

	return del.sync('app/js');

});*/

gulp.task('cache:clear', function(callback){

	return cache.clearAll(callback);

});

