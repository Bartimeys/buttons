var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync').create();

var path = {
    build: {
        css: 'build/'
    },
    src: {
        css: 'src/button.scss'
    },
    watch: {
        css: 'src/*.scss'
    }
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('css', function() {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch([path.watch.css], ['css']);
});

gulp.task('build', [
    'css',
    'watch'
]);

gulp.task('default', ['browser-sync', 'watch', 'build']);
