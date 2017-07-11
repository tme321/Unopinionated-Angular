var gulp = require("gulp");
var rename = require('gulp-rename');

gulp.task("rename:md", ()=> {
    return gulp
        .src("./docs/**/*.html")
        .pipe(rename(function (path) {
            path.extname = ".md";
        }))
        .pipe(gulp.dest("./docs"));
});
