const gulp = require('gulp');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const elm = require('gulp-elm');
const inject = require('gulp-inject');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const del = require('del');

const paths = {
  dest: 'dist',
  index: 'dist/*.html',
  elm: 'src/*.elm',
  sass: 'scss/**/*.scss',
  static: 'src/*.html',
  nodeModules: 'node_modules'
};

gulp.task('clean', () => del(['dist']));

gulp.task('elm-init', elm.init);

gulp.task('elm', ['elm-init'], () => gulp.src(paths.elm)
  .pipe(plumber())
  .pipe(elm())
  .pipe(gulp.dest(paths.dest))
  .pipe(connect.reload())
);

gulp.task('static', ['elm'], () => gulp.src(paths.static)
  .pipe(plumber())
  .pipe(gulp.dest(paths.dest)));

gulp.task('build', ['static', 'sass'], () => {
  const target = gulp.src(paths.index);
  const sources = gulp.src(['dist/*.js', 'dist/*.css'], { read: false });

  return target.pipe(inject(sources, { relative: true }))
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
});

gulp.task('serve', ['build'], () => {
  connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass({
      includePaths: [paths.nodeModules]
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.elm, ['elm']);
  gulp.watch(paths.static, ['build']);
});

gulp.task('default', ['serve', 'watch']);

gulp.task('build:prod', ['clean', 'build']);