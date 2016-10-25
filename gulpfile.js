const gulp = require('gulp');
const eslint = require('gulp-eslint');
const UglifyJS = require('uglify-js');
const babel = require('gulp-babel');
const del = require('del');
const browserify = require('browserify');
const derequire = require('derequire');
const fs = require('fs');

function minify(src) {
  return UglifyJS.minify(src, {fromString: true}).code;
}

function bundleMin(file, standalone, outputFile) {
  var b = browserify({
    entries: file,
    standalone: standalone,
    debug: false
  });
  b.bundle(function (err, buf) {
    var code = derequire(buf.toString(), '_dereq_', 'require');
    fs.writeFileSync(outputFile, minify(code));
  });
}

function bundle(file, standalone, outputFile) {
  var b = browserify({
    entries: file,
    standalone: standalone,
    debug: true
  });
  b.bundle(function (err, buf) {
    var code = derequire(buf.toString(), '_dereq_', 'require');
    fs.writeFileSync(outputFile, code);
  });
}

gulp.task('clean', function () {
  return del('./build/**');
});

gulp.task('lib', ['clean'], function () {
  return gulp.src('./src/**')
    .pipe(babel())
    .pipe(gulp.dest('./build/modules'));
});

gulp.task('build', ['lib'], function () {
  bundle('./build/modules/pvalidator.js', 'PValidator', './build/pvalidator.js');
  bundle('./build/modules/rules.js', "prules", './build/rules.js');
  bundleMin('./build/modules/pvalidator.js', 'PValidator', './build/pvalidator.min.js');
  bundleMin('./build/modules/rules.js', "prules", './build/rules.min.js');
});

gulp.task('eslint', function () {
  return gulp.src('./src/**').pipe(eslint());
});

gulp.task('release', function () {
  gulp.src([
    './build/modules/**',
    './package.json',
    './README.md',
    './LICENSE'])
    .pipe(gulp.dest('./build/package'));
});

gulp.task('default', ['eslint', 'build']);
