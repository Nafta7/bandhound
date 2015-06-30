module.exports = function(gulp, path, $){
  return function(){
    gulp.src(path.scripts.src + '**/*.js')
    .pipe($.concat('all.js'))
    .pipe(gulp.dest(path.scripts.dest))
    .pipe($.rename('all.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.scripts.dest));
  };
}
