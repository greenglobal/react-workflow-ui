'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('clean', function(done) {
  return $.del([paths.dist + '/', paths.tmp + '/'], done);
});
