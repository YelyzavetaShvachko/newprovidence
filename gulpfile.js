
/*записываем все плагины в переменные */
var gulp = require("gulp");
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
//дальше создаем таски

gulp.task('scss', function () { //таск с названием scss
    return gulp.src('src/scss/**/*.scss')//я буду работать со всем, что передаю в скобочках, а именно, все
    // scss файлы  в папке scss и во всех вложенных в нее папках
        .pipe(sass().on('error', sass.logError))//это плагин который компилирует из scss/sаss в css
        .pipe(concatCss("main.css"))//собирает все,что скомпилировано предыдущим пайпом из ('src/scss/**/*.scss') в один файл main.css
        .pipe(autoprefixer({//добавляет префиксы для браузеров
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())//минификация css
        .pipe(gulp.dest('build/css'));//положить минифицированный файл в build/css
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                src: '-debug.js',//в названии обычной версии
                min: '-min.js'//в названии минифицированной версии
            }
        }))
        .pipe(gulp.dest('build/js'));

});

gulp.task('fonts', function () {// копирует шрифты из папки src в папку build
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('js-vendor', function () {
    return gulp.src([//все пути на подключенные внешние js файлы
        'bower_components/jquery/dist/jquery.min.js',

    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css-vendor', function () {
    return gulp.src([//тут должны быть все пути к внешним подключенным стилям
        'bower_components/normalize-css/normalize.css',
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('build/css'));
});


gulp.task('watch', function () {// следит и тут же меняет файлы
    gulp.watch('src/js/**/*', ['js']);// сначала за какими файлами следить, потом массивом передаем название таска, который нужно выполнить
    gulp.watch('src/scss/**/*', ['scss']);
    gulp.watch('src/img/**/*', ['img']);
});

gulp.task('default', ['scss', 'fonts', 'img', 'js', 'watch']);//дефолтная задача, пишешь в терминале gulp и автоматически выполняются задачи из массива

gulp.task('build', ['scss', 'fonts', 'img', 'js', 'css-vendor', 'js-vendor']); //перестраивает заново весь проект