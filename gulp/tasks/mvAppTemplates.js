var gulp = require("gulp");

gulp.task('mv:demotemplates', ()=>{
    return gulp.src(['!./src/demo/dist/**/*.*', 
                     './src/demo/**/*.html', 
                     './src/demo/**/*.css', ])
        .pipe(gulp.dest('./src/demo/dist'));    
});
