module.exports = {
    clean: {
        dir: 'assets/dist/**'
    },
    styles: {
        src: 'assets/src/scss/*.scss',
        watch: 'assets/src/scss/**/*.scss',
        sass: {
            includePaths: ['node_modules']
        },
        dest: 'assets/dist/css'
    },
    scripts: [
        {
            src: [
                'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                'node_modules/webfontloader/webfontloader.js',
                'assets/src/js/main/*.js'
            ],
            concat: 'child-theme.js',
            dest: 'assets/dist/js'
        },
        {
            src: 'assets/src/js/pages/*.js',
            dest: 'assets/dist/js'
        }
    ],
    fonts: {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}',
        dest: 'assets/dist/fonts'
    }
};
