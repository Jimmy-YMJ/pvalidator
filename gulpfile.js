const gulp = require('gulp');
const eslint = require('gulp-eslint');

const build = './build';
const src = './src/**/*.*';

gulp.task('build', function (cb) {
  gulp.src(src).pipe(gulp.dest(build));
});

gulp.task('eslint', function (cb) {
  gulp.src(src).pipe(eslint());
});

gulp.task('release', function (cb) {
  gulp.src("./package.json").pipe(gulp.dest(build));
});

gulp.task('default', ['eslint', 'build', 'release']);
