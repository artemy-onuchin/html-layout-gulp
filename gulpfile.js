'use strict';

let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sync = require('browser-sync'),
    pug =require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    del = require('del'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

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
    gulp.watch('src/public/**/*.*', gulp.series('public-files')).on('change', sync.reload)
    gulp.watch('src/js/**/*.js', gulp.series('js')).on('change', sync.reload)
    gulp.watch('src/images/**/*.*', gulp.series('images')).on('change', sync.reload)
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

// fonts
gulp.task('fonts', function Fonts() {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

// public files
gulp.task('public-files', function Files() {
    return gulp.src('src/public/**/*.*')
    .pipe(gulp.dest('dist/'));
});

// scripts
gulp.task('js', function Scripts() {
    return gulp.src([
        'src/js/console.js',
        'src/js/test.js'
    ])
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
})

// images
gulp.task('images', function Images() {
    return gulp.src([
        'src/images/**/*.*'
    ])
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(gulp.dest('dist/images'))
})

// commands
gulp.task('dev', gulp.series(
    'clear',
    'create-folder',
    'html',
    'scss',
    'js',
    'fonts',
    'public-files',
    'images',
    'serve'
))
