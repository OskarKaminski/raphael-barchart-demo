var gulp = require('gulp');

var PATHS = {
    src: 'src/**/*',
    dist: 'dist/'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('copy', function () {
    gulp.src([PATHS.src + '.html',
              PATHS.src + '.js'])
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src + '.ts')
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('play', ['ts2js', 'copy'], function () {
    gulp.watch(PATHS.src + '.ts', ['ts2js']);
    gulp.watch([PATHS.src + '.html',
                PATHS.src + '.js'], ['copy']);

    var webserver = require('gulp-webserver');
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 9000
        }));
});

gulp.task('default', ['play']);
