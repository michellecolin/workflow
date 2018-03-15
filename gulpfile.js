let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let autoprefixer = require('gulp-autoprefixer');
let clean = require('gulp-clean');
let concat = require('gulp-concat');

let SOURCE_PATH = {
	sass: 'src/scss/*.scss',
	html: 'src/*.html',
	js: 'src/js/*.js'
};

let APP_PATH = {
	root: 'app',
	css: 'app/css',
	js: 'app/js'
};

gulp.task('sass', () => {
	return gulp.src(SOURCE_PATH.sass)
		.pipe(autoprefixer({
			browsers: ['> 0%'],
            cascade: false
		}))
		.pipe(sass({//what you want to do with that source
				outputStyle: 'compact'
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest(APP_PATH.css));
});

gulp.task('copy', ['clean-html'], () => {
	gulp.src(SOURCE_PATH.html)
		.pipe(gulp.dest(APP_PATH.root)); //defines files destinations
});

gulp.task('scripts', ['clean-scripts'], () => {
	gulp.src(SOURCE_PATH.js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(APP_PATH.js)); //defines files destinations
});

gulp.task('clean-html', () => {
	return gulp.src(APP_PATH.root + '/*.html', {read: false, force: true})
		.pipe(clean());
});

gulp.task('clean-scripts', () => {
	return gulp.src(APP_PATH.js + '/*.js', {read: false, force: true})
		.pipe(clean());
})

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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'scripts', 'clean-scripts'], () => { 
	gulp.watch([SOURCE_PATH.sass], ['sass']); //watchs changes on sass files
	gulp.watch([SOURCE_PATH.html], ['copy']);
	gulp.watch([SOURCE_PATH.js], ['scripts']);
})

gulp.task('default', ['watch']); //if no task was specified the default run the tasks arrayscripts