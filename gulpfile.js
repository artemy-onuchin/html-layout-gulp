'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sync = require('browser-sync');

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
})

// commands
gulp.task('dev', gulp.series(
    'create-folder',
    'serve'
))
