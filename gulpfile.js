'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber');

// create folder
gulp.task('create-folder', function CreateFolder() {
    return gulp.src('*.*', { read: false })
        .pipe(gulp.dest('dist'))
})

// commands
gulp.task('dev', gulp.series(
    'create-folder'
))
