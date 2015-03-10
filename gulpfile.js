/*!
* gulpfile
*/

// Load plugins
var gulp         = require('gulp');
var stylus       = require('gulp-stylus');
var rename       = require('gulp-rename');
var jade         = require('gulp-jade');
var inline       = require('gulp-inline-css');

// Paths
var sourcePath   = 'src';
var paths = {
    emails: sourcePath + '/emails/**/*.jade',
    styles: sourcePath + '/themes/**/*.styl'
};

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(stylus({
            compress: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(sourcePath + '/themes'));
});

// Templates
gulp.task('emails', ['styles'], function() {
    return gulp.src(paths.emails)
        .pipe(jade({
            pretty: true
        }))
        .pipe(inline({
            applyStyleTags: false,
            removeStyleTags: false
        }))
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(sourcePath + '/**/*.jade', ['emails']);
    gulp.watch(sourcePath + '/themes/**/*.styl', ['emails']);
});

gulp.task('default', ['watch', 'emails']);
