var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sourcemaps      = require('gulp-sourcemaps');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var jade            = require('gulp-jade');
var pump            = require('pump');
var rigger          = require('gulp-rigger');
var cache           = require('gulp-cache');
var rename          = require('gulp-rename');
var del             = require('del');
var imagemin 		    = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', ['templates', 'sass', 'js'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/sass/**/*.sass", ['sass']);
    gulp.watch("app/scripts/**/*.js", ['js']);
    gulp.watch("app/jade/**/*.jade", ['templates']);
});

// Work with Jade files
gulp.task('templates', function() {
  return gulp.src(['app/jade/**/*.jade', '!app/jade/**/_*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream());
  });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/**/*.sass")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
           browsers: ['last 12 versions','ie>11'],
        }))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
}); 

// Work with JS
gulp.task('js', function (cb) {
  pump([
        gulp.src('app/scripts/**/*.js'),
        rigger(),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        rename({
          suffix: ".min"
        }),
        gulp.dest('app/js')
    ],
    cb  
  );
  browserSync.reload();
});

// Default Task
gulp.task('default', ['serve']);



// Build task
gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('imagemin', function() {
  return gulp.src('app/img/**/*')
  // .pipe(cache(imagemin())) // Cache Images
  .pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin'], function() {

  var buildFiles = gulp.src([
    'app/*.html',
    'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/main.min.js',
    ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

});
