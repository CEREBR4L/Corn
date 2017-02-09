const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const gulpIf = require('gulp-if');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');

const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('default', ['browserSync'], (callback) => {

	runSequence(
	'watch',
	callback

	)

});

gulp.task('watch', () => {

	gulp.watch('app/**/*.*', ['build']);
	gulp.watch('app/**/*.html', ['bs-delay']);
	gulp.watch('app/js/**/*.js', ['bs-delay']);
	gulp.watch('app/scss/**/*.scss', ['bs-delay']);

});

gulp.task('build', (callback) => {

	runSequence(

		'clean:dist',
		'move',
		'sass',
		['useref', 'templates', 'images', 'fonts', 'json'],
		['remove-nonmin-js', 'remove-nonmin-css'],
		callback

	)

});

gulp.task('sass', () => {

	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))

});

gulp.task('browserSync', ['nodemon'], () => {

	browserSync.init(null, {
		proxy: "http://localhost:8080",
		files: ["dist/**/*.*"],
		port: 3000,
	});

});

gulp.task('move', () => {
	gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'))
})

gulp.task('useref', ['babel'], () => {

	return gulp.src('dist/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify({mangle: false})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))

});

gulp.task('babel', () => {

	gulp.src('app/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'))

});

gulp.task('remove-nonmin-js', () => {
	gulp.src('dist/js')
		del.sync(['dist/js/**', '!dist/js', '!dist/js/main.min.js']);
})

gulp.task('remove-nonmin-css', () => {
	gulp.src('dist/css')
		del.sync(['dist/css/**', '!dist/css', '!dist/css/styles.min.css']);
})

gulp.task('bs-delay',  () => {
  setTimeout( () => {
    browserSync.reload({ stream: false });
  }, 1500);
});

gulp.task('nodemon', (cb) => {

	let started = false;

	nodemon({

		script: 'server.js'

	}).on('start', () => {

		if (!started){
			cb();
			started = true; 
		}

	});

});

gulp.task('templates', () => {

	return gulp.src('app/templates/**/*.html')
	.pipe(gulp.dest('dist/templates'))

});

gulp.task('images', () => {

	return gulp.src('app/img/**/*.+(png|jpg|svg|gif)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/img'));

});

gulp.task('fonts', () => {

	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

});

gulp.task('json', () => {

	return gulp.src('app/json/**/*.json')
	.pipe(gulp.dest('dist/json'))

});

gulp.task('clean:dist', () => {

	return del.sync('dist');

});

gulp.task('cache:clear', (callback) => {

	return cache.clearAll(callback);

});

