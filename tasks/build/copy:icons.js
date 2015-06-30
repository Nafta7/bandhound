module.exports = function(gulp, path){
  return function(){
    gulp.src(path.vendor.components.src + 'open-iconic/**/*')
    .pipe(gulp.dest(path.vendor.components.dest + '/open-iconic'));
  };
}
