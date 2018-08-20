"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var run = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("style", function() {
    gulp.src("source/less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
});

gulp.task("default", function () {
    gulp.src("source/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("images", function() {
    return gulp.src("source/img/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel:3}),
            imagemin.jpegtran({progressive:true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("source/img"))

});
gulp.task("webp", function (){
    return gulp.src("source/img/*.{png,jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("source/img"));
});
gulp.task("serve", function() {
    server.init({
        server: "build/"
    });
    gulp.watch("source/less/**/*.less", ["style"]).on("change", server.reload);
    gulp.watch("source/js/*.js", ["default"]).on("change", server.reload);
    gulp.watch("source/*.html", ["html"]).on("change", server.reload);

});
gulp.task("build", function(done) {
    run(
        "clean",
        "copy",
        "default",
        "style",
        "html",
        done);
});
gulp.task("copy", function(){
    return gulp.src([
        "source/fonts/*.{woff,woff2}",
        "source/img/**",
        "source/*.js",
        "source/css/normalize.css"
    ], {
        base: "source"
    })
        .pipe(gulp.dest("build"));
});
gulp.task("clean", function(){
    return del("build");
});
gulp.task("html", function(){
    return gulp.src("source/*.html")
        .pipe(posthtml())
        .pipe(gulp.dest("build"));
})