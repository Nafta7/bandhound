module.exports = function(gulp, path, $){
  return function(){
    gulp.src(path.styles.src + '**/*.css')
    .pipe($.concat('all.css'))
    .pipe(gulp.dest(path.styles.dest))
    .pipe($.rename('all.min.css'))
    .pipe($.minifycss())
    .pipe(gulp.dest(path.styles.dest));
  };
}
