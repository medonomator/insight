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
  rsync = require("gulp-rsync"),
  imagemin = require("gulp-imagemin");

gulp.task("imagemin", () =>
  gulp
    .src("static/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "views"
    },
    notify: false
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

gulp.task("watch", ["styles", "js", "browser-sync"], function () {
  gulp.watch("static/" + syntax + "/**/*." + syntax + "", ["styles"]);
  gulp.watch(["libs/**/*.js", "static/js/common.js"], ["js"]);
  gulp.watch("views/*.html", browserSync.reload);
  // gulp.watch("views/.html", browserSync.reload);
  gulp.watch("static/*.css", browserSync.reload);
});

gulp.task("default", ["watch"]);
