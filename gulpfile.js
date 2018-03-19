let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	source = require('vinyl-source-stream'),
	merge = require('merge-stream'),
	jade = require('gulp-jade'),
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),
	minify = require('gulp-minify'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	htmlmin = require('gulp-htmlmin'),
	sourcemaps = require('gulp-sourcemaps'); //package not working right now, problem with bootstrap check for sourcemaps release

let SOURCE_PATH = {
	sass: 'src/scss/*.scss',
	html: 'src/*.html',
	js: 'src/js/**',
	jade: 'src/*.jade',
	img: 'src/img/**'
};

let APP_PATH = {
	root: 'app',
	css: 'app/css',
	js: 'app/js',
	mainFile: './app/js/main.js',
	fonts: 'app/css/fonts',
	img: 'app/img',
	html: 'app/*.html'
};

let DIST_APP = {
	root: 'dist',
	css: 'dist/css',
	js: 'dist/js'
}

/*example of fonts task
gulp.task('moveFonts', () => {
	gulp.src('./addr fonts/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest(APP_PATH.fonts));
}); */

gulp.task('sass', () => {
	return gulp.src(SOURCE_PATH.sass)
		//.pipe(sourcemaps.init())
		.pipe(sass({//what you want to do with that source
				outputStyle: 'compact',
				includePaths:  'node_modules/bootstrap/scss'
			}).on('error', sass.logError)
		)
		//.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['> 0%'],
            cascade: false
		}))
		.pipe(concat('app.css'))
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
 	return browserify(APP_PATH.mainFile)
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

gulp.task('jade', () => {
	gulp.src(SOURCE_PATH.jade)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(APP_PATH.root));
});

gulp.task('images', () => {
	return gulp.src(SOURCE_PATH.img)
		.pipe(newer(APP_PATH.img)) //checks for new images
		.pipe(imagemin())
		.pipe(gulp.dest(APP_PATH.img));
});

gulp.task('watch', [
		'serve', 
		'sass', 
		'copy', 
		'jade',
		'clean-html', 
		'browserify',
		'clean-scripts',
		'images'
	], 
	() => { 
		gulp.watch([SOURCE_PATH.sass], ['sass']); //watchs changes on sass files
		gulp.watch([SOURCE_PATH.html], ['copy']);
		gulp.watch([SOURCE_PATH.jade], ['jade']);
		gulp.watch([SOURCE_PATH.js], ['browserify']);
		gulp.watch([SOURCE_PATH.img], ['images']);
	}
);

gulp.task('default', ['watch']); //if no task was specified the default run the tasks arrayscripts


/* dist tasks */
gulp.task('compress', () => {
	return gulp.src(APP_PATH.mainFile)
		.pipe(minify({noSource: true}))
		.pipe(gulp.dest(DIST_APP.js));
});

gulp.task('compress-css', ['compress'], () => {
	return gulp.src(APP_PATH.css + '/app.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(DIST_APP.css));
});

gulp.task('compress-html', ['compress-css'], () => {
	return gulp.src(APP_PATH.html)
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest(DIST_APP.root));
});

gulp.task('dist', ['compress-html']);

