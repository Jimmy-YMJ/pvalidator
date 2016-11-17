const gulp = require('gulp');
const eslint = require('gulp-eslint');
const UglifyJS = require('uglify-js');
const babel = require('gulp-babel');
const del = require('del');
const browserify = require('browserify');
const derequire = require('derequire');
const fs = require('fs');
const spawn = require('child_process').spawn;

function minify(src) {
  return UglifyJS.minify(src, {fromString: true}).code;
}

function bundleMin(file, standalone, outputFile, done) {
  var b = browserify({
    entries: file,
    standalone: standalone,
    debug: false
  });
  b.bundle(function (err, buf) {
    var code = derequire(buf.toString(), '_dereq_', 'require');
    fs.writeFileSync(outputFile, minify(code));
    done();
  });
}

function bundle(file, standalone, outputFile, done) {
  var b = browserify({
    entries: file,
    standalone: standalone,
    debug: true
  });
  b.bundle(function (err, buf) {
    var code = derequire(buf.toString(), '_dereq_', 'require');
    fs.writeFileSync(outputFile, code);
    done();
  });
}

gulp.task('clean', function () {
  return del('./build/**');
});

gulp.task('eslint', function () {
  return gulp.src('./src/**').pipe(eslint());
});

gulp.task('lib', ['clean', 'eslint'], function () {
  return gulp.src('./src/**')
    .pipe(babel())
    .pipe(gulp.dest('./build/modules'));
});

gulp.task('bundle-validator', ['lib'], function (cb) {
  bundle('./build/modules/pvalidator.js', 'PValidator', './build/pvalidator.js', cb);
});

gulp.task('bundle-validator-min', ['lib'], function (cb) {
  bundleMin('./build/modules/pvalidator.js', 'PValidator', './build/pvalidator.min.js', cb);
});

gulp.task('bundle-rules', ['lib'], function (cb) {
  bundle('./build/modules/rules.js', "prules", './build/rules.js', cb);
});

gulp.task('bundle-rules-min', ['lib'], function (cb) {
  bundleMin('./build/modules/rules.js', "prules", './build/rules.min.js', cb);
});

gulp.task('test', ['bundle-validator', 'bundle-validator-min', 'bundle-rules', 'bundle-rules-min'], function (cb) {
  const test = spawn('npm', ['run', 'test'], {stdio: 'inherit'});
  test.on('close', () => { cb(); });
  test.on('error', (err) => { cb(err) });
});

gulp.task('release', ['test'], function () {
  gulp.src([
    './build/modules/**',
    './package.json',
    './README.md',
    './LICENSE'])
    .pipe(gulp.dest('./build/package'));
});

gulp.task('publish', function (cb) {
  const publish = spawn('npm', ['publish'], {cwd: './build/package', stdio: 'inherit'});
  publish.on('close', () => { cb(); });
  publish.on('error', (err) => { cb(err) });
});

gulp.task('default', ['test']);
