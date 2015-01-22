// Include gulp
//npm install --save-dev gulp-jshint gulp-sass gulp-concat gulp-uglify
//gulp-rename gulp-minify-css gulp-jade gulp-sourcemaps

var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');

var dirScripts   = 'scripts/';
var dirStyles    = 'styles/';
var dirTemplates = 'templates/';

var dirDest = {
  root: 'www/',
  scripts: 'www/scripts/',
  styles: 'www/styles/',
  templates: 'www/pages/'
};

var dirVendor = {
  root: 'vendor/',
  scripts: 'vendor/scripts/',
  styles: 'vendor/styles/'
};

// Lint Task
gulp.task('lint', function() {
  return gulp.src(dirScripts + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src(dirStyles + '**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest(dirDest.styles));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(dirScripts + '**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dirDest.scripts))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirDest.scripts));
});

gulp.task('vendor_scripts', function(){
  return gulp.src(dirVendor.root + '**/*.js')
    .pipe(concat('vendor.all.js'))
    .pipe(gulp.dest(dirDest.scripts))
    .pipe(rename('vendor.all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirDest.scripts));
});

gulp.task('vendor_styles', function(){
  return gulp.src(dirVendor.root + '**/*.css')
    .pipe(concat('vendor.all.css'))
    .pipe(gulp.dest(dirDest.styles))
    .pipe(rename('vendor.all.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(dirDest.styles));
});

//Concatenate & Minify CSS
gulp.task('styles', function(){
  return gulp.src(dirDest.styles + '**/*.css')
    .pipe(concat('all.css'))
    .pipe(rename('all.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(dirDest.styles));
});

gulp.task('templates', function() {
  return gulp.src(dirTemplates + 'pages/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(dirDest.root));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(dirScripts + '**/*.js', ['lint', 'scripts']);
  gulp.watch(dirStyles + '**/*.sass', ['sass', 'styles']);
  gulp.watch(dirTemplates + '**/*.jade', ['templates']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts',
          'vendor_styles', 'styles', 'templates', 'watch']);
