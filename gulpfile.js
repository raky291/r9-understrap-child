const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const merge = require('merge-stream');
const config = require('./gulp.config');

// ----------------------------------------------------------------------------
// Clean
// ----------------------------------------------------------------------------

const clean = () => del(config.clean.dir);

// ----------------------------------------------------------------------------
// Debug
// ----------------------------------------------------------------------------

const debug = gulp.series(clean, gulp.parallel(debugStyles, debugScripts, fonts));

function debugStyles() {
    return gulp
        .src(config.styles.src, { sourcemaps: true })
        .pipe(sass(config.styles.sass))
        .pipe(postcss())
        .pipe(gulp.dest(config.styles.dest, { sourcemaps: true }));
}

function debugScripts() {
    return merge(
        gulp
            .src(config.scripts.main.src, { sourcemaps: true })
            .pipe(concat(config.scripts.main.concat))
            .pipe(gulp.dest(config.scripts.dest, { sourcemaps: true })),
        gulp
            .src(config.scripts.babel.src, { sourcemaps: true })
            .pipe(babel())
            .pipe(gulp.dest(config.scripts.dest, { sourcemaps: true }))
    );
}

// ----------------------------------------------------------------------------
// Release
// ----------------------------------------------------------------------------

const release = gulp.series(clean, gulp.parallel(releaseStyles, releaseScripts, fonts));

function releaseStyles() {
    return gulp
        .src(config.styles.src)
        .pipe(sass(config.styles.sass))
        .pipe(postcss())
        .pipe(gulp.dest(config.styles.dest));
}

function releaseScripts() {
    return merge(
        gulp
            .src(config.scripts.main.src)
            .pipe(concat(config.scripts.main.concat))
            .pipe(uglify())
            .pipe(gulp.dest(config.scripts.dest)),
        gulp
            .src(config.scripts.babel.src)
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(config.scripts.dest))
    );
}

// ----------------------------------------------------------------------------
// Watch
// ----------------------------------------------------------------------------

function watch() {
    gulp.watch(config.styles.watch, debugStyles);
    gulp.watch(config.scripts.watch, debugScripts);
}

// ----------------------------------------------------------------------------
// Fonts
// ----------------------------------------------------------------------------

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
