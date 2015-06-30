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

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');

var livereload = require('gulp-livereload');

// Source directories
var dirScripts   = 'scripts/';
var dirStyles    = 'styles/';
var dirTemplates = 'views/';

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

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = dirDest.root;
var LIVERELOAD_PORT = 35729;

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


// add custom browserify options here
var customOpts = {
  entries: ['./' + dirScripts + 'app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(dirScripts + 'bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(dirDest.root));
}



function startExpress(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(dirDest.root));
  app.listen(4000);
}

var tinylr;
function startLivereload(){
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
}

function notifyLiveReload(event) {
  var fileName = require('path').relative(dirDest.root, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}


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
  var maincss = dirDest.styles + 'pages/**/*.css';
  // var vendorcss = dirVendor.styles.open_iconic;
  return gulp.src([maincss])
    .pipe(concat('all.css'))
    .pipe(rename('all.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(dirDest.styles));
});


// Default Task
gulp.task('default', ['jade', 'sass', 'buildjs', 'buildcss']);

// Watch Files For Changes
gulp.task('watch', function(){
  startExpress();
  startLivereload();

  gulp.watch(dirStyles + '**/*.sass', ['sass']);
  gulp.watch(dirTemplates + '**/*.jade', ['jade']);
  gulp.watch(dirScripts + '**/*.js', ['js'] );

  gulp.watch(dirDest.styles + '**/*.css', notifyLiveReload);
  gulp.watch(dirDest.scripts + '**/*.js', notifyLiveReload);
  gulp.watch(dirDest.templates + '**/*.html', notifyLiveReload);
});
