'use strict';

var gulp = require('gulp'),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  ngAnnotate = require('gulp-ng-annotate'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil = require('gulp-util'),
  rev = require('gulp-rev');

var paths = gulp.paths;

var gulpCopy = require('gulp-copy');
var rev = require('gulp-rev');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('copy:images', [], function() {
  return gulp.src(paths.src + 'images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest(paths.dist + 'images'));
});

gulp.task('copy:scripts', function() {
  return gulp.src([paths.src + 'js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat({
      path: 'app.min.js',
      cwd: ''
    }))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'js/'))
    .on('error', gutil.log);
});

gulp.task('copy:js-electron', function() {
  return gulp.src([paths.src + '*.js'])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:styles', ['copy:styles:app', 'copy:styles:vendor']);
gulp.task('copy:styles:app', function() {
  return gulp.src([paths.src + 'css/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(concat({
      path: 'app.min.css',
      cwd: ''
    }))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'css/'))
    .on('error', gutil.log);
});

gulp.task('copy:styles:vendor', function() {
  return gulp.src(paths.vendorCss)
    .pipe(sourcemaps.init())
    .pipe(concat({
      path: 'vendor.min.css',
      cwd: ''
    }))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'css/'))
    .on('error', gutil.log);
});

gulp.task('copy:misc', function() {
  return gulp.src([
      '*.{ico,png,txt}',
      paths.src + 'index.html'
    ])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:release', ['copy:helper'], function() {

});

gulp.task('copy:helper', function() {
  return gulp.src([
      paths.src + 'helpers/**'
    ])
    .pipe(gulp.dest(paths.dist + 'helpers/'));
});

gulp.task('copy:images:vendor', function() {
  return gulp.src([
      './app/node_modules/vis/dist/img/**/*.{ico,png,txt}'
    ])
    .pipe(gulp.dest(paths.dist + 'css/img'));
});

gulp.task('copy:js-vendor', [], function() {
  return gulp.src(paths.vendorJs)
    // .pipe(using())
    .pipe(sourcemaps.init())
    .pipe(concat({
      path: 'vendor.min.js',
      cwd: ''
    }))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(rev())

    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'js/'))
    .on('error', gutil.log);
});

gulp.task('copy:dist', ['copy:images', 'copy:images:vendor', 'copy:scripts', 'copy:styles', 'copy:misc', 'copy:js-vendor', 'copy:release'], function() {

});
