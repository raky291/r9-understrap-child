const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const merge = require('merge-stream');
const through = require('through2');
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
        config.scripts.map(script => {
            return gulp
                .src(script.src, { sourcemaps: true })
                .pipe(babel())
                .pipe($if(script.concat, () => concat(script.concat)))
                .pipe(gulp.dest(script.dest, { sourcemaps: true }));
        })
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
        config.scripts.map(script => {
            return gulp
                .src(script.src)
                .pipe(babel())
                .pipe($if(script.concat, () => concat(script.concat)))
                .pipe(uglify())
                .pipe(gulp.dest(script.dest));
        })
    );
}

// ----------------------------------------------------------------------------
// Watch
// ----------------------------------------------------------------------------

function watch() {
    gulp.watch(config.styles.watch, debugStyles);
    config.scripts.forEach(script => gulp.watch(script.src, debugScripts));
}

// ----------------------------------------------------------------------------
// Fonts
// ----------------------------------------------------------------------------

function fonts() {
    return gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function $if(condition, callback) {
    return condition ? callback() : through.obj();
}

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

exports.debug = debug;
exports.release = release;
exports.watch = watch;
exports.default = release;
