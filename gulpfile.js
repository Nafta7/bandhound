var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.uglify = require('gulp-uglify');
plugins.browserSync = require('browser-sync');
plugins.minifycss = require('gulp-minify-css');

var gulpAug = require('gulp-augments')(gulp);

var path = {
  styles      : { src: 'styles/',            dest: 'www/styles/' },
  scripts     : { src: 'scripts/',           dest: 'www/scripts/' },
  templates   : { src: 'views/',             dest: './' },
  vendor: {
    scripts   : { src: 'vendor/scripts/',    dest: 'www/scripts/' },
    components: { src: 'vendor/components/', dest: 'www/styles/'}
  }
};

var toska = require('toska');
var modules = toska('tasks', {gulp: gulp, path: path, $: plugins});

var build = createTasks(modules.build);
var deploy = createTasks(modules.deploy);

gulp.task('build', build);
gulp.task('deploy', build.concat(deploy));

gulp.task('serve', build, function(){
  plugins.browserSync.init({ server: "./" });
   gulp.watch(path.styles.src + '**/*.sass', ['compile:sass']);
   gulp.watch(path.templates.src + '**/*.jade', ['compile:jade']);
   gulp.watch(path.scripts.src + '**/*.js', ['compile:js']);
});

function createTasks(obj){
  return modulus(obj, function(name, func){
    gulp.task(name, func);
  });
}

function modulus(modules, callback){
  return Object.keys(modules).map(function(name){
    callback(name, modules[name]);
    return name;
  });
}
