var gulp = require('gulp');
var server = require('gulp-server-livereload');
 
gulp.task('webserver', function() {
  gulp.src('dist/demo')
    .pipe(server({
      livereload: true,
      open: true,
      fallback: 'index.html',
      port: 4200
    }));
});