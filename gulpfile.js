'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sync = require('browser-sync'),
    pug =require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    del = require('del');

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
    gulp.watch('src/scss/**/*.scss', gulp.series('scss')).on('change', sync.reload)
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

// styles
gulp.task('scss', function Style() {
    return gulp.src([
        'src/scss/*.scss'
    ])
        .pipe(plumber())
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(gulp.dest('dist/assets/css'));
})

// cleaning
gulp.task('clear', function Cleaning() {
    return del('dist')
})

// commands
gulp.task('dev', gulp.series(
    'clear',
    'create-folder',
    'html',
    'scss',
    'serve'
))
