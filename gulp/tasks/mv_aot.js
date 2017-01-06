var gulp = require("gulp");

gulp.task('mv:aot', ()=>{
    return gulp.src(['./src/lib/aot/**/*'])
        .pipe(gulp.dest('./dist'));    
});