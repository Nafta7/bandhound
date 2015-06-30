module.exports = function(gulp, path, $){
  return function(){
    gulp.src(path.vendor.scripts.src + '**/*.js')
    .pipe($.concat('vendor.all.js'))
    .pipe(gulp.dest(path.vendor.scripts.dest))
    .pipe($.browserSync.stream());
  }
}
