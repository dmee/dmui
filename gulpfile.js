const gulp = require("gulp");
const del = require("del");
const $ = require("gulp-load-plugins")();

/************************** framework ******************************/
gulp.task("framework-styles", () => {
    var stylesSource = [
        './third_plugins/weui/dist/style/weui.min.css',
        './third_plugins/animate.css/animate.min.css',
        'src/styles/dm.less'
    ];
    gulp.src(stylesSource)
        .pipe($.plumber())
        .pipe($.concat("dm.css"))
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.cleanCss())
        .pipe($.rename("dm.min.css"))
        .pipe(gulp.dest("dist"));
});
gulp.task("framework-scripts-dev", () => {
    scriptsSource = [
        './third_plugins/jquery/dist/jquery.js',
        './src/plugins/swiper.jquery.js',
        './src/plugins/jquery.extend.js',
        './src/plugins/hammer.js',
        'src/core.js',
        'src/lib/**/*',
        'src/scripts/**/*.js'
    ];
    gulp.src(scriptsSource)
        .pipe($.plumber())
        .pipe($.concat("dm.js", {
            newLine: ';'
        }))
        .pipe($.rename("dm.min.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("framework-scripts", () => {
    scriptsSource = [
        './third_plugins/jquery/dist/jquery.js',
        './src/plugins/swiper.jquery.js',
        './src/plugins/jquery.extend.js',
        './src/plugins/hammer.js',
        'src/core.js',
        'src/lib/**/*',
        'src/scripts/**/*.js'
    ];
    gulp.src(scriptsSource)
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

gulp.task("framework", ["framework-scripts", "framework-styles"])

// 监听任务
gulp.task("watch", done => {
    gulp.watch(["src/styles/**/*"], ["framework-styles"]); // 框架监听
    gulp.watch(["src/scripts/**/*"], ["framework-scripts"]); // 框架监听
});
gulp.task("common", ["framework"]);
gulp.task("build", ["common"]);
gulp.task("dev", ["framework-scripts-dev", "framework-styles", "watch"]);
gulp.task("default", ["dev"]);