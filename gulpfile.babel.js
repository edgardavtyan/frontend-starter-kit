import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import cssmin from 'gulp-minify-css';
import htmlmin from 'gulp-minify-html';
import imgmin from 'gulp-imagemin';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
import browsersync from 'browser-sync';

function handleError(err) {
	console.log(err);
	this.emit('end');
}

function watchFiles(files, tasks) {
	watch(files, batch((events, done) => gulp.start(tasks, done)));
}

gulp.task('sass', () => {
	return gulp.src('./sass/main.scss')
		.pipe(sass()).on('error', handleError)
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('jade', () => {
	return gulp.src('./jade/**/index.jade')
		.pipe(jade()).on('error', handleError)
		.pipe(htmlmin())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('js', () => {
	return gulp.src('./js/**/app.js')
		.pipe(babel()).on('error', handleError)
		.pipe(uglify())
		.pipe(gulp.dest('./_bin'))
		.pipe(browsersync.stream());
});

gulp.task('img', () => {
	return gulp.src('./img/**/*')
		.pipe(imgmin())
		.pipe(gulp.dest('./_bin/img'))
		.pipe(browsersync.stream())
		.on('error', handleError);
});

gulp.task('build', ['sass', 'jade', 'js', 'img']);

gulp.task('default', () => {
	browsersync.init({ server: './_bin' });
	watchFiles('./sass/**/*', 'sass');
	watchFiles('./jade/**/*', 'jade');
	watchFiles('./js/**/*', 'js');
	watchFiles('./img/**/*', 'img');
});
