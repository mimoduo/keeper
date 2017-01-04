/* ================
// Required Plugins
// ============= */

var site = './dist';
var gulp = require('gulp'),
    packageJSON = require('./package.json'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');


/* ================
// Compile Pug
// ============= */

gulp.task('pug', function() {

  return gulp.src('src/index.pug')
    .pipe(pug({
      locals: {
        siteTitle: packageJSON.name,
        siteDescription: packageJSON.description,
      },
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());

});


/* ================
// Compile Sass
// ============= */

gulp.task('sass', function() {

  return gulp.src('src/styles.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(rename(function(path) {
      path.basename = packageJSON.name;
    }))
    .pipe(gulp.dest(site))
    .pipe(browserSync.stream());

});


/* ================
// Process JS
// ============= */

gulp.task('js', function() {

  return gulp.src('src/script.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename(function(path) {
      path.basename = packageJSON.name;
    }))
    .pipe(gulp.dest(site))
    .pipe(browserSync.stream());

});


/* ================
// Sync Changes
// ============= */

gulp.task('browser-sync', function() {

  browserSync.init({
    logPrefix: packageJSON.name,
    ui: false,
    server: './',
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        padding: '4px',
        fontSize: '12px',
        borderBottomLeftRadius: '0'
      }
    }
  });

});


/* ================
// Watch Task
// ============= */

gulp.task('watch', function() {

  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('src/styles.scss', ['sass']);
  gulp.watch('src/*.js', ['js']);

});


/* ================
// Default Gulp Task
// ============= */

gulp.task('default', [
  'pug',
  'sass',
  'js',
  'watch',
  'browser-sync'
]);
