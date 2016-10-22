const gulp = require('gulp');
const eslint = require('gulp-eslint');
const UglifyJS = require('uglify-js');
const babel = require('gulp-babel');
const del = require('del');
const browserify = require('browserify');
const fs = require('fs');

function minify(src) {
  return UglifyJS.minify(src, {fromString: true}).code;
}

gulp.task('clean', function () {
  del('./build/**/*.*');
});

gulp.task('lib', ['clean'], function () {
  gulp.src('./src/**/*.*')
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});

gulp.task('build', ['lib'], function () {
  var b = browserify({
    entries: './src/pvalidator.js',
    standalone: 'PromiseValidator',
    debug: false
  });
  b.bundle(function (err, buf) {
    fs.writeFileSync('./build/pvalidator.min.js', minify(buf.toString()));
  });
});

gulp.task('eslint', function () {
  gulp.src('./src/**/*.*').pipe(eslint());
});

gulp.task('release', function () {
  gulp.src(['./package.json', './README.md', './LICENSE']).pipe(gulp.dest('./build'));
});

gulp.task('default', ['eslint', 'build', 'release']);
