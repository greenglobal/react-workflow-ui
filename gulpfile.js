'use strict';

var gulp = require('gulp'),
  inject = require('gulp-inject')
;

var paths = {
  src: './app/',
  dist: './build/',
  tmp: './.tmp/',
  jsTransformDir: './transformed/',
  appJs: [
    './app/js/**/*.js'
  ],
  appCss: ['./src/css/*.css'],
  vendorCss: [
    './app/node_modules/vis/dist/vis.css',
    './app/vendors/css/jquery-ui.css'
  ],
  vendorJs: [
    './app/node_modules/vis/dist/vis.js',
    './app/node_modules/vis/dist/vis-network.min.js',
    './app/node_modules/jquery/dist/jquery.js',
    './app/vendors/js/jquery-ui.js',
    './app/node_modules/handlebars/dist/handlebars.js',
    './app/node_modules/sightglass/index.js',
    './app/node_modules/rivets/dist/rivets.js'
  ],
  es6Files: [

  ]
};

gulp.paths = paths;

require('require-dir')('./tasks/gulpfiles');

require('./tasks/build/build');
require('./tasks/release/release');
require('./tasks/start');
