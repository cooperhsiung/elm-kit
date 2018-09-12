const del = require("del");
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync");
const exec = require("child_process").exec;

gulp.task("server", function(done) {
  browserSync.init(
    {
      server: {
        baseDir: "public",
        index: "index.html"
      },
      ui: false,
      notify: false
    },
    done
  );
});

gulp.task("clean", function(done) {
  del(["public/bundle.js", "dist/elm.js"]).then(() => done());
});

const MAKE_CMD = "elm make ./src/Main.elm --optimize --output=./dist/elm.js";
gulp.task("make", function(done) {
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
    done(err);
  });
});

gulp.task("js", function() {
  return gulp
    .src(["dist/elm.js"])
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public"));
});

gulp.task("watch", function() {
  gulp
    .watch("src/*.elm", gulp.series("make", "js"))
    .on("change", browserSync.reload);
});

gulp.task("build", gulp.series("clean", "make", "js"));

gulp.task("default", gulp.series("server", "clean", "make", "js", "watch"));
