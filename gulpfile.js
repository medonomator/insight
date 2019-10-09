var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleancss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  imagemin = require('gulp-imagemin'),
  handlebars = require('gulp-compile-handlebars'),
  rename = require('gulp-rename');

// MOCK DATA
const data = require('./config/data/aphorisms');

gulp.task('imagemin', () =>
  gulp
    .src('static/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets')),
);

gulp.task('handlebars', function() {
  var templateData = {
      path: 'assets/',
      res: JSON.parse(data),
    },
    options = {
      // ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      // partials: {
      //   footer: '<footer>the end</footer>'
      // },
      batch: ['./views/partials'],
      helpers: {
        capitals: function(str) {
          return str.toUpperCase();
        },
      },
    };

  return gulp
    .src('views/aphorisms.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: './dist',
  });
});

gulp.task('styles', function() {
  return gulp
    .src('static/' + syntax + '/**/*.' + syntax + '')
    .pipe(sass({ outputStyle: 'expand' }).on('error', notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('static/css'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return (
    gulp
      .src(['static/libs/jquery/jquery.min.js', 'static/libs/masonry.min.js', 'static/js/common.js'])
      .pipe(concat('common.js'))
      // .pipe(uglify()) // Mifify js (opt.)
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task('watch', function() {
  gulp.watch('static/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
  gulp.watch(['libs/**/*.js', 'static/js/common.js'], gulp.parallel('js'));
  gulp.watch(['views/**/*.hbs'], gulp.parallel('handlebars'));
  gulp.watch('dist/**/*.html', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'styles', 'js', 'browser-sync', 'handlebars', 'imagemin'));
