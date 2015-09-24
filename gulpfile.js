var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-minify-html');
var imgmin = require('gulp-imagemin');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync').create();

function onError(err) {
	console.log(err);
	this.emit('end');
}

gulp.task('sass', function() {
	return gulp.src('./sass/main.scss')
		.pipe(sass()).on('error', onError)
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('jade', function() {
	return gulp.src('./jade/**/index.jade')
		.pipe(jade()).on('error', onError)
		.pipe(htmlmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('js', function() {
	return gulp.src('./js/**/app.js')
		.pipe(babel()).on('error', onError)
		.pipe(uglify())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('img', function() {
	return gulp.src('./img/**/*')
		.pipe(imgmin())
		.pipe(gulp.dest('./_bin/img'))
		.pipe(browsersync.stream())
		.on('error', onError);
});

gulp.task('build', ['sass', 'jade', 'js', 'img', 'other']);

gulp.task('default', function() {
	browsersync.init({ server: './_bin' });
	gulp.watch('./sass/**/*', ['sass']);
	gulp.watch('./jade/**/*', ['jade']);
	gulp.watch('./js/**/*', ['js']);
	gulp.watch('./img/**/*', ['img']);
});
