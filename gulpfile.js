var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var del = require("del");
var exec = require("child_process").exec;

gulp.task("clean", function(cb) {
  del(["public/bundle.js", "dist/elm.js"]).then(() => cb());
});

const MAKE_CMD = "elm make ./src/Main.elm --optimize --output=./dist/elm.js";
gulp.task("make", function(cb) {
  exec(MAKE_CMD, function(err, stdout, stderr) {
    if (stdout) {
      console.log(
        `[${new Date().toLocaleTimeString()}] Success! Compiled ${
          JSON.stringify(stdout).match(/\d/)[0]
        } module.`
      );
    }
    if (stderr) {
      console.error(
        `[${new Date().toLocaleTimeString()}] Error! Compiled ${JSON.stringify(
          stderr
        )} module.`
      );
    }
    cb(err);
  });
});

gulp.task("js", function() {
  return gulp
    .src(["dist/elm.js"])
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public"));
});

gulp.task('watch', function() {
   gulp.watch('src/*.elm',gulp.series( "make", "js"))
});

gulp.task("default", gulp.series("clean", "make", "js","watch"));
