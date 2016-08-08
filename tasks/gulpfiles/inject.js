'use strict';

var gulp = require('gulp'),
  inject = require('gulp-inject');

var paths = gulp.paths;

gulp.task('inject', function() {

  return gulp.src(paths.dist + 'index.html')
    // css
    .pipe(inject(gulp.src(paths.dist + 'css/app-*.css', {
      read: false
    }), {
      addRootSlash: false,
      relative: true,
      starttag: '<!-- inject:app:{{ext}} -->',
    }))
    .pipe(inject(gulp.src(paths.dist + 'css/vendor-*.css', {
      read: false
    }), {
      addRootSlash: false,
      relative: true,
      starttag: '<!-- inject:vendor:{{ext}} -->',
    }))
    // js
    .pipe(inject(gulp.src('./js/vendor-*.js', {
      read: false,
      cwd: paths.dist
    }), {
      addRootSlash: false,
      relative: true,
      starttag: '<!-- inject:vendor:{{ext}} -->',
    }))
    .pipe(inject(gulp.src('./js/app-*.js', {
      read: false,
      cwd: paths.dist
    }), {
      addRootSlash: false,
      relative: true,
      starttag: '<!-- inject:app:{{ext}} -->',
    }))

  .pipe(gulp.dest(paths.dist));
});
