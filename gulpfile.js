let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	source = require('vinyl-source-stream');

let SOURCE_PATH = {
	sass: 'src/scss/*.scss',
	html: 'src/*.html',
	js: 'src/js/**'
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
	return gulp.src(SOURCE_PATH.js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(APP_PATH.js)); //defines files destinations
});

gulp.task('browserify', ['scripts'], () => {
 	return browserify('./app/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest(APP_PATH.js));

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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 
	//'scripts', 
	'browserify',
	'clean-scripts'], () => { 
	gulp.watch([SOURCE_PATH.sass], ['sass']); //watchs changes on sass files
	gulp.watch([SOURCE_PATH.html], ['copy']);
	gulp.watch([SOURCE_PATH.js], ['browserify']);
	//gulp.watch([SOURCE_PATH.js], ['browserify']);
})

gulp.task('default', ['watch']); //if no task was specified the default run the tasks arrayscripts