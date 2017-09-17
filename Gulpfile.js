const path = require('path'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    pump = require('pump')

gulp.task('images', (errorHandler) => {

    pump([
        gulp.src(path.join(__dirname, 'lib/assets/images/*')),
        imagemin({ optimizationLevel: 5 }),
        gulp.dest(path.resolve('public/assets/images')),
    ], errorHandler)

});

gulp.task('favicon', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, 'lib/favicon.ico')),
        gulp.dest(path.resolve('public'))
    ], errorHandler)
})

gulp.task('sass', (errorHandler) => {

    pump([
        gulp.src(path.join(__dirname, 'lib/assets/sass/*.scss')),
        sourcemaps.init(),
        sass({ outputStyle: 'compressed' }).on('error', sass.logError),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        concat('index.css'),
        sourcemaps.write(),
        gulp.dest(path.resolve(__dirname, 'public/assets/css')),
    ], errorHandler)

})


gulp.task('scripts', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, 'lib/js/*.js')),
        babel({
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 2 versions", "ie >= 7"],
                            "node": "current"
                        }
                    }
                ]
            ]
        }),
        uglify(),
        gulp.dest(path.resolve(__dirname, 'public/js'))
    ], errorHandler)

})

gulp.task('optimize-models', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, 'lib/models/*.js')),
        babel({
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 2 versions", "ie >= 7"],
                            "node": "current"
                        }
                    }
                ]
            ]
        }),
        uglify(),
        gulp.dest(path.resolve(__dirname, 'models/'))
    ], errorHandler)
})

gulp.task('watch', () => {

    gulp.watch(path.join(__dirname, 'lib/assets/sass/*.scss'), ['sass']);
    gulp.watch(path.join(__dirname, 'lib/js/*.js'), ['scripts']);
    gulp.watch(path.join(__dirname, 'lib/models/*.js'), ['optimize-models']);

})

gulp.task('default', ['sass', 'scripts', 'images', 'optimize-models', 'favicon', 'watch'])