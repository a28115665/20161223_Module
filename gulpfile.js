var gulp = require('gulp')
    //to use in conjunction with chrome plugin:
    livereload = require('gulp-livereload'),
    //for css:
    sass = require('gulp-sass'),
    //for javascript:
    concat = require('gulp-concat');

var paths = {
    dev: {
        css: 'assets/styles/css',
        html: 'views/**/*.html',
        scss: 'assets/styles/scss/*.scss',
        js: 'assets/scripts/**/*.js',
        node_modules: 'node_modules'
    },
    build: {
        main: 'public',
        css: 'public/stylesheets',
        js: 'public/javascripts',
        img: 'public/images',
        fonts: 'public/fonts//bootstrap'
    }
};

// compile SASS/scss files to app.css file.
gulp.task('styles', function() {
    return gulp.src([
            './assets/styles/scss/main.scss'
        ])
        .pipe(sass({
            includePaths: [
                paths.dev.node_modules + '/bootstrap-sass/assets/stylesheets'
            ]
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(paths.build.css));
});

// compile *.js files to app.js file.
gulp.task('scripts', function() {
    return gulp.src([
            paths.dev.node_modules + '/bootstrap-sass/assets/javascripts/**/*.js',
            './assets/scripts/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.build.js));
});

// copy fonts to the public destination.
gulp.task('fonts', function() {
    return gulp.src(paths.dev.node_modules + '/bootstrap-sass/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest(paths.build.fonts))
});

// copy html files to the public destination.
gulp.task('html', function() {
    return gulp.src(paths.dev.html)
        .pipe(gulp.dest(paths.build.main))
});

// while gulp default compile
gulp.task('default', ['styles', 'scripts', 'fonts', 'html']);

//watch for changes and compile css and run jshint on those changes
//also use livereload to automatically reload page
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.dev.scss, ['styles']).on('change', livereload.changed);
    gulp.watch(paths.dev.js, ['scripts']).on('change', livereload.changed);
    gulp.watch(paths.dev.html, ['html']).on('change', livereload.changed);
});
