const gulp = require("gulp");
const del = require("del");
const $ = require("gulp-load-plugins")();

/************************** framework ******************************/
gulp.task("framework-styles", () => {
    gulp.src('src/plugins/**/*.less')
        .pipe($.plumber())
        .pipe($.concat("dm.css"))
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.cleanCss())
        .pipe($.rename("dm.min.css"))
        .pipe(gulp.dest("dist"));
});
gulp.task("framework-script", () => {
    gulp.src([
            'src/core.js',
            'src/lib/**/*',
            'src/plugins/**/*.js'
        ])
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe($.concat("dm.js", {
            newLine: ';'
        }))
        .pipe($.rename("dm.min.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("framework", ["framework-script", "framework-styles"])

// 监听任务
gulp.task("watch", done => {
    gulp.watch(["src/**/*"], ["framework"]); // 框架监听
});
gulp.task("common", ["framework"]);
gulp.task("build", ["common"]);
gulp.task("dev", ["common", "watch"]);
gulp.task("default", ["dev"]);