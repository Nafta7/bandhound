var browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util');

module.exports = function(gulp, path, $){
  return function(){
    var b = browserify({
      entries: './' + path.scripts.src + 'app.js',
      debug: true
    });
    return b.bundle()
    .pipe(source(path.scripts.dest + 'bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest("./"))
    .pipe($.browserSync.stream());
  };
}
