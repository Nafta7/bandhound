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
var uncss = require ('gulp-uncss');

// Source directories
var dirScripts   = 'scripts/';
var dirStyles    = 'styles/';
var dirTemplates = 'templates/';

// Destionation directories
var dirDest = {
  root: 'www/',
  scripts: 'www/scripts/',
  styles: 'www/styles/',
  templates: 'www/pages/',
  vendor: 'www/vendor/'
};

var dirVendor = {
  root: 'vendor/',
  scripts: 'vendor/scripts/',
  styles: {
    open_iconic: 'vendor/components/open-iconic/font/css/open-iconic.css'
  }
};



/*-------------------------------
--------DEVELOPMENT TASKS--------
---------------------------------*/



// Lint scripts
gulp.task('lint', function() {
  return gulp.src(dirScripts + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile our Sass styles
gulp.task('sass', function() {
  return gulp.src(dirStyles + '**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest(dirDest.styles));
});

// Compile our jade templates
gulp.task('jade', function() {
  return gulp.src(dirTemplates + 'pages/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(dirDest.root));
});



/*-------------------------------
-----------BUILD TASKS-----------
---------------------------------*/



// Minify js
gulp.task('buildjs', function() {
  return gulp.src(dirDest.scripts + 'bundle.js')
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirDest.scripts));
});

//Concatenate & Minify CSS
gulp.task('buildcss', function(){
  var maincss = dirDest.styles + '**/*.css';
  var vendorcss = dirVendor.styles.open_iconic;
  return gulp.src([vendorcss, maincss])
    .pipe(concat('all.css'))
    .pipe(rename('all.min.css'))
    // .pipe(uncss({
    //   html: [
    //       'www/index.html'
    //   ]}))
    // .pipe(gulp.dest('./out'))
    .pipe(minifycss())
    .pipe(gulp.dest(dirDest.styles));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(dirStyles + '**/*.sass', ['sass']);
  gulp.watch(dirTemplates + '**/*.jade', ['jade']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'jade', 'watch']);
