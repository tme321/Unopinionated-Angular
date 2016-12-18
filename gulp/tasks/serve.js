var gulp = require('gulp');
var server = require('gulp-server-livereload');
 
gulp.task('webserver', function() {
  gulp.src('src/demo/dist')
    .pipe(server({
      livereload: true,
      open: true,
      fallback: 'index.html',
      port: 4200
    }));
});