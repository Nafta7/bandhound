module.exports = function(gulp, path, $){
  return function(){
    gulp.src(path.styles.src + '**/*.{sass,scss}')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.sourcemaps.write())
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest(path.styles.dest))
    .pipe($.browserSync.stream());
  };
}
