'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});


var fs = require("fs");
var browserify = require("browserify");

gulp.task('es6-transformed', [], function() {
  return browserify(paths.es6Files)
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream(paths.jsTransformDir + "transformed.js"));
});
