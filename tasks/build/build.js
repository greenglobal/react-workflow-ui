'use strict';

var gulp = require('gulp');
var pathUtil = require('path');
var Q = require('q');
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');
var jetpack = require('fs-jetpack');
var run = require('gulp-run');

var bundle = require('./bundle');
var generateSpecImportsFile = require('./generate_spec_imports');
var utils = require('../utils');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');
var jsTransformDir = projectDir.cwd('./transform');

var paths = {
  copyFromAppDir: [
    './node_modules/**',
    './helpers/**',
    './**/*.html',
    './**/*.+(jpg|png|svg)'
  ],
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('copy', ['copy:dist']);

var bundleApplication = function() {
  return Q.all([
    bundle(srcDir.path('background.js'), destDir.path('background.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js'))
  ]);
};

var bundleSpecs = function() {
  return generateSpecImportsFile().then(function(specEntryPointPath) {
    return bundle(specEntryPointPath, destDir.path('spec.js'));
  });
};

var bundleTask = function() {
  if (utils.getEnvName() === 'test') {
    return bundleSpecs();
  }
  return bundleApplication();
};
gulp.task('bundle', [], bundleTask);
gulp.task('bundle-watch', bundleTask);

gulp.task('environment', function() {
  var configFile = 'config/env_' + utils.getEnvName() + '.json';
  projectDir.copy(configFile, destDir.path('env.json'));
});

gulp.task('package-json', function() {
  var manifest = srcDir.read('package.json', 'json');

  // Add "dev" suffix to name, so Electron will write all data like cookies
  // and localStorage in separate places for production and development.
  if (utils.getEnvName() === 'development') {
    manifest.name += '-dev';
    manifest.productName += ' Dev';
  }

  destDir.write('package.json', manifest);
});

gulp.task('build', ['clean'], function() {
  return gulp.start(['bundle', 'copy', 'environment', 'package-json'], function() {
    return (
      run('webpack --config app/webpack.config.js').exec()
      &&
      run('NODE_ENV=production npm install --prefix build').exec()
    )
  });
});
