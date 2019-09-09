module.exports = {
    clean: {
        dir: 'wwwroot/dist/**'
    },
    styles: {
        src: 'assets/scss/*.scss',
        watch: 'assets/scss/**/*.scss',
        sass: {
            includePaths: ['node_modules']
        },
        dest: 'wwwroot/dist/css'
    },
    scripts: [
        {
            src: [
                'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                'node_modules/webfontloader/webfontloader.js',
                'assets/js/main/*.js'
            ],
            concat: 'child-theme.js',
            dest: 'wwwroot/dist/js'
        },
        {
            src: 'assets/js/pages/*.js',
            dest: 'wwwroot/dist/js'
        }
    ],
    fonts: {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}',
        dest: 'wwwroot/dist/fonts'
    }
};
