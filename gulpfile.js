'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sync = require('browser-sync'),
    pug =require('gulp-pug');

// create folder
gulp.task('create-folder', function CreateFolder() {
    return gulp.src('*.*', { read: false })
        .pipe(gulp.dest('dist'))
})

// local server
gulp.task('serve', function Serve() {
    sync.init({
        server: {
            baseDir: './dist'
        }
    })

    gulp.watch('src/html/**/*.pug', gulp.series('html')).on('change', sync.reload)
})

// template
gulp.task('html', function Template() {
    return gulp.src([
        'src/html/*.pug'
    ])
        .pipe(plumber())
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest('dist/'));
})

// commands
gulp.task('dev', gulp.series(
    'create-folder',
    'html',
    'serve'
))
