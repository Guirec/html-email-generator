/*!
* Gulpfile
*/

// Load plugins
const gulp   = require('gulp');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const pug    = require('gulp-pug');
const inline = require('gulp-inline-css');
const clean  = require('gulp-clean');

// Paths
var sourcePath   = 'src';
var paths = {
  emails: sourcePath + '/emails/**/*.pug',
  styles: sourcePath + '/themes/**/styles.css',
  temp: sourcePath + '/themes/**/*.min.css'
};

// Styles
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(minify())
    .on('error', swallowError)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(sourcePath + '/themes'));
});

// Templates
gulp.task('emails', ['styles'], function () {
  return gulp.src(paths.emails)
    .pipe(pug({
      pretty: true
    }))
    .on('error', swallowError)
    .pipe(inline({
      applyStyleTags: false,
      removeStyleTags: false
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', ['emails'], function () {
  return gulp.src(paths.temp, {read: false})
    .pipe(clean());
});

// Prevent errors from breaking gulp watch
function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

// Watch
gulp.task('watch', function () {
  gulp.watch(sourcePath + '/**/*.pug', ['emails']);
  gulp.watch(sourcePath + '/themes/**/inline.css', ['emails']);
  gulp.watch(sourcePath + '/themes/**/styles.css', ['emails']);
});

// Build
gulp.task('build', ['emails', 'clean']);

// Default
gulp.task('default', ['watch', 'build']);
