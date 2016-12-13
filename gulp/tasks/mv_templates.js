var gulp = require("gulp");

gulp.task('mv:templates', ()=>{
    return gulp.src(['./src/lib/**/*.html', './src/lib/**/*.css'])
        .pipe(gulp.dest('./dist'));    
});