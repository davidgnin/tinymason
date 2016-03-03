'use strict';
var
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('jshint', function gulpfile_jshint() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function gulpfile_jscs() {
  return gulp.src('./src/**/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('check', ['jshint', 'jscs']);

gulp.task('build', ['check'], function gulpfile_build() {
  gulp.src('./src/tinymason.js')
    .pipe(gulp.dest('./dist/'));
  gulp.src('./src/tinymason.js')
    .pipe(uglify())
    .pipe(rename('tinymason-min.js'))
    .pipe(gulp.dest('./dist/'));
});
