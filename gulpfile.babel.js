import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import cssmin from 'gulp-minify-css';
import htmlmin from 'gulp-minify-html';
import imgmin from 'gulp-imagemin';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import browsersync from 'browser-sync';

function onError(err) {
	console.log(err);
	this.emit('end');
}

gulp.task('sass', () => {
	return gulp.src('./sass/main.scss')
		.pipe(sass()).on('error', onError)
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('jade', () => {
	return gulp.src('./jade/**/index.jade')
		.pipe(jade()).on('error', onError)
		.pipe(htmlmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('js', () => {
	return gulp.src('./js/**/app.js')
		.pipe(babel()).on('error', onError)
		.pipe(uglify())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('img', () => {
	return gulp.src('./img/**/*')
		.pipe(imgmin())
		.pipe(gulp.dest('./_bin/img'))
		.pipe(browsersync.stream())
		.on('error', onError);
});

gulp.task('build', ['sass', 'jade', 'js', 'img']);

gulp.task('default', () => {
	browsersync.init({ server: './_bin' });
	gulp.watch('./sass/**/*', ['sass']);
	gulp.watch('./jade/**/*', ['jade']);
	gulp.watch('./js/**/*', ['js']);
	gulp.watch('./img/**/*', ['img']);
});
