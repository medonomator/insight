var syntax = "sass"; // Syntax: sass or scss;

var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  imagemin = require("gulp-imagemin");

var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');


gulp.task("imagemin", () =>
  gulp
    .src("static/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

gulp.task("copy-files", () =>
  gulp
    .src("static/**/*")
    .pipe(gulp.dest("dist/assets"))
);

gulp.task('handlebars', function () {
  var templateData = {
    path: 'assets/'
  },
    options = {
      // ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      // partials: {
      //   footer: '<footer>the end</footer>'
      // },
      batch: ['./views/partials'],
      helpers: {
        capitals: function (str) {
          return str.toUpperCase();
        }
      }
    }

  return gulp.src('views/index.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

// gulp.task('handlebars', function () {

//   var tepmplatedata = {
//     "index": {
//       "title": "Home page",
//       "nav_index": "active"
//     },
//     "about": {
//       "title": "About us",
//       "nav_about": "active"
//     },
//     path: 'assets/'
//   };

//   gulp.src('./views/pages/*.hbs')
//     .pipe(hbsmaster('./views/master.hbs', tepmplatedata, {}))
//     .pipe(rename(function (path) {
//       path.extname = '.html';
//     }))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "dist"
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task("styles", function () {
  return gulp
    .src("static/" + syntax + "/**/*." + syntax + "")
    .pipe(sass({ outputStyle: "expand" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest("static/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return (
    gulp
      .src([
        "static/js/common.js" // Always at the end
      ])
      .pipe(concat("scripts.min.js"))
      // .pipe(uglify()) // Mifify js (opt.)
      .pipe(gulp.dest("static/js"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("watch", ["styles", "js", "browser-sync", "handlebars", "copy-files"], function () {
  gulp.watch("static/" + syntax + "/**/*." + syntax + "", ["styles"]);
  gulp.watch(["libs/**/*.js", "static/js/common.js"], ["js"]);
  gulp.watch(["views/**/*.hbs"], ["handlebars"]);
  gulp.watch(["static/**/*"], ["copy-files"]);
  gulp.watch("dist/*.html", browserSync.reload);
  gulp.watch("static/**/*.css", browserSync.reload);
});

gulp.task("default", ["watch"]);
