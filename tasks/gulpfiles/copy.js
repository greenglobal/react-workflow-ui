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

gulp.task('copy:helper', function() {
  return gulp.src([
      paths.src + 'helpers/**'
    ])
    .pipe(gulp.dest(paths.dist + 'helpers/'));
});

gulp.task('copy:dist', ['copy:helper'], function() {

});
