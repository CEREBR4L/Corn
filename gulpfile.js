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

gulp.task('default', ['browserSync'], function (callback) {

	runSequence(
	'watch',
	callback

	)

});

gulp.task('watch', function(){

	gulp.watch('app/**/*.*', ['build']);
	gulp.watch('app/**/*.html', ['bs-delay']);
	gulp.watch('app/js/**/*.js', ['bs-delay']);
	gulp.watch('app/scss/**/*.scss', ['bs-delay']);

});

gulp.task('build', function(callback){

	runSequence(

		'clean:dist',
		'move',
		'sass',
		['useref', 'templates', 'images', 'fonts', 'json'],
		['remove-nonmin-js', 'remove-nonmin-css'],
		callback

	)

});

gulp.task('sass', function(){

	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))

});

gulp.task('browserSync', ['nodemon'], function(){

	browserSync.init(null, {
		proxy: "http://localhost:8080",
		files: ["dist/**/*.*"],
		port: 3000,
	});

});

gulp.task('move', function(){
	gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'))
})

gulp.task('useref', ['babel'], function(){

	return gulp.src('dist/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify({mangle: false})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))

});

gulp.task('babel', () => 

	gulp.src('app/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'))

);

gulp.task('remove-nonmin-js', function(){
	gulp.src('dist/js')
		del.sync(['dist/js/**', '!dist/js', '!dist/js/main.min.js']);
})

gulp.task('remove-nonmin-css', function(){
	gulp.src('dist/css')
		del.sync(['dist/css/**', '!dist/css', '!dist/css/styles.min.css']);
})

gulp.task('bs-delay', function () {
  setTimeout(function () {
    browserSync.reload({ stream: false });
  }, 1000);
});

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

gulp.task('json', function(){

	return gulp.src('app/json/**/*.json')
	.pipe(gulp.dest('dist/json'))

});

gulp.task('clean:dist', function(){

	return del.sync('dist');

});

gulp.task('cache:clear', function(callback){

	return cache.clearAll(callback);

});

