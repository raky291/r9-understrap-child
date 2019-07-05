const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

const config = {
    styles: {
        src: 'assets/src/scss/*.scss',
        watch: 'assets/src/scss/**/*.scss',
        sass: { includePaths: ['node_modules'] },
        postcss: [autoprefixer({ cascade: false }), cssnano()],
        dest: 'assets/dist/css'
    },
    fonts: {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}',
        dest: 'assets/dist/fonts'
    }
};

// ----------------------------------------------------------------------------
// Debug
// ----------------------------------------------------------------------------

const debug = gulp.parallel(debugStyles);

function debugStyles() {
    return gulp
        .src(config.styles.src, { sourcemaps: true })
        .pipe(sass(config.styles.sass))
        .pipe(postcss(config.styles.postcss))
        .pipe(gulp.dest(config.styles.dest, { sourcemaps: true }));
}

// ----------------------------------------------------------------------------
// Release
// ----------------------------------------------------------------------------

const release = gulp.parallel(releaseStyles);

function releaseStyles() {
    return gulp
        .src(config.styles.src)
        .pipe(sass(config.styles.sass))
        .pipe(postcss(config.styles.postcss))
        .pipe(gulp.dest(config.styles.dest));
}

// ----------------------------------------------------------------------------
// Watch
// ----------------------------------------------------------------------------

function watch() {
    gulp.watch(config.styles.watch, debugStyles);
}

// ----------------------------------------------------------------------------
// Copy Fonts
// ----------------------------------------------------------------------------

function copyFonts() {
    return gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
}

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

exports.debug = debug;
exports.release = release;
exports.watch = watch;
exports.copyFonts = copyFonts;
