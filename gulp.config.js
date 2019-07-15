module.exports = {
    styles: {
        src: 'assets/src/scss/*.scss',
        watch: 'assets/src/scss/**/*.scss',
        sass: { includePaths: ['node_modules'] },
        dest: 'assets/dist/css'
    },
    scripts: {
        src: ['assets/src/js/**/*.js', '!assets/src/js/vendors/**/*.js'],
        dest: 'assets/dist/js'
    },
    clean: {
        dir: 'assets/dist/**'
    },
    vendors: {
        src: [
            'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            'node_modules/webfontloader/webfontloader.js',
            'assets/src/js/vendors/**/*.js'
        ],
        concat: 'child-theme.vendors.js',
        dest: 'assets/dist/js'
    },
    fonts: {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}',
        dest: 'assets/dist/fonts'
    }
};
