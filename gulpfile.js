let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

let SOURCE_PATH = {
	sass: 'src/scss/*.scss'
};

let APP_PATH = {
	root: 'app',
	css: 'app/css',
	js: 'app/js'
};

gulp.task('sass', () => {
	return gulp.src(SOURCE_PATH.sass)
		.pipe( //what you want to do with that source
			sass({
				outputStyle: 'expanded'
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest(APP_PATH.css));
});

gulp.task('serve', ['sass'], () => {
	browserSync.init([
		APP_PATH.css + '/*.css', 
		APP_PATH.root + '/*.html',
		APP_PATH.js + '/*.js'
	], {
		server: {
			baseDir: APP_PATH.root
		}
	});
});

gulp.task('watch', ['serve', 'sass'], () => { 
	gulp.watch([SOURCE_PATH.sass], ['sass']); //watchs changes on sass files
})

gulp.task('default', ['watch']); //if no task was specified the default run the tasks array