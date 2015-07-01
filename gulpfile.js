var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.browserSync = require('browser-sync');

var gulpAug = require('gulp-augments')(gulp);

var path = {
  styles    : { src: 'styles/',  dest: 'publish/styles/' },
  scripts   : { src: 'scripts/', dest: 'publish/scripts/' },
  templates : { src: 'views/',   dest: 'publish' },
  vendor: {
    scripts:    { src: 'vendor/scripts/',    dest: 'publish/scripts/' },
    components: { src: 'vendor/components/', dest: 'publish/styles/'}
  }
};

var toska = require('toska');
var tasks = toska.mirror('tasks', gulp, {path: path, $: plugins});

gulp.task('default', tasks.build);

gulp.task('serve', tasks.build, function(){
  plugins.browserSync.init({ server: "./" });
   gulp.watch(path.styles.src + '**/*.sass', ['compile:sass']);
   gulp.watch(path.templates.src + '**/*.jade', ['compile:jade']);
   gulp.watch(path.scripts.src + '**/*.js', ['compile:js']);
});
