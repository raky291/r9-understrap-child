const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');

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
    scripts: {
        src: 'assets/src/js/**/*.js',
        watch: 'assets/src/js/**/*.js',
        babel: { presets: ['@babel/preset-env'] },
        dest: 'assets/dist/js'
    },
    clean: {
        dir: 'assets/dist/**'
    },
    vendors: {
        src: ['node_modules/bootstrap/dist/js/bootstrap.bundle.js'],
        concat: 'child-theme.vendors.js',
        dest: 'assets/dist/js'
    },
    fonts: {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}',
        dest: 'assets/dist/fonts'
    }
};

// ----------------------------------------------------------------------------
// Debug
// ----------------------------------------------------------------------------

const debug = gulp.parallel(debugStyles, debugScripts);

function debugStyles() {
    return gulp
        .src(config.styles.src, { sourcemaps: true })
        .pipe(sass(config.styles.sass))
        .pipe(postcss(config.styles.postcss))
        .pipe(gulp.dest(config.styles.dest, { sourcemaps: true }));
}

function debugScripts() {
    return gulp
        .src(config.scripts.src, { sourcemaps: true })
        .pipe(babel(config.scripts.babel))
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
        .pipe(postcss(config.styles.postcss))
        .pipe(gulp.dest(config.styles.dest));
}

function releaseScripts() {
    return gulp
        .src(config.scripts.src)
        .pipe(babel(config.scripts.babel))
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
