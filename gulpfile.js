const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const plumber = require("gulp-plumber");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

function images(done) {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
  done();
}

function dev() {
  watch("src/scss/**/*.scss", css);
}

exports.css = css;
exports.images = images;
exports.dev = series(css, dev);
