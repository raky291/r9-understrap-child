const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');
const config = require('./gulp.config');

// ----------------------------------------------------------------------------
// Debug
// ----------------------------------------------------------------------------

const debug = gulp.parallel(debugStyles, debugScripts);

function debugStyles() {
    return gulp
        .src(config.styles.src, { sourcemaps: true })
        .pipe(sass(config.styles.sass))
        .pipe(postcss())
        .pipe(gulp.dest(config.styles.dest, { sourcemaps: true }));
}

function debugScripts() {
    return gulp
        .src(config.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(gulp.dest(config.scripts.dest, { sourcemaps: true }));
}

// ----------------------------------------------------------------------------
// Release
// ----------------------------------------------------------------------------

const release = gulp.series(clean, gulp.parallel(releaseStyles, releaseScripts, vendors, fonts));

function releaseStyles() {
    return gulp
        .src(config.styles.src)
        .pipe(sass(config.styles.sass))
        .pipe(postcss())
        .pipe(gulp.dest(config.styles.dest));
}

function releaseScripts() {
    return gulp
        .src(config.scripts.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.dest));
}

// ----------------------------------------------------------------------------
// Watch
// ----------------------------------------------------------------------------

function watch() {
    gulp.watch(config.styles.watch, debugStyles);
    gulp.watch(config.scripts.watch, debugScripts);
}

// ----------------------------------------------------------------------------
// Clean, Vendors and Fonts
// ----------------------------------------------------------------------------

function clean() {
    return del(config.clean.dir);
}

function vendors() {
    return gulp
        .src(config.vendors.src)
        .pipe(concat(config.vendors.concat))
        .pipe(uglify())
        .pipe(gulp.dest(config.vendors.dest));
}

function fonts() {
    return gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
}

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

exports.debug = debug;
exports.release = release;
exports.watch = watch;
exports.default = release;
