var gulp = require("gulp");

gulp.task('mv:core-js', ()=>{
    return gulp.src([
        './node_modules/core-js/**/*.js',
        './node_modules/core-js/**/*.ts',
        './node_modules/core-js/**/*.map'
    ])
    .pipe(gulp.dest('./src/demo/dist/vendor/core-js'));    
});

gulp.task('mv:systemjs', ()=>{
    return gulp.src([
        './node_modules/systemjs/**/*.js',
        './node_modules/systemjs/**/*.ts',
        './node_modules/systemjs/**/*.map'
    ])
    .pipe(gulp.dest('./src/demo/dist/vendor/systemjs'));    
});

gulp.task('mv:zonejs', ()=>{
    return gulp.src([
        './node_modules/zone.js/**/*.js',
        './node_modules/zone.js/**/*.ts',
        './node_modules/zone.js/**/*.map'
    ])
    .pipe(gulp.dest('./src/demo/dist/vendor/zone.js'));    
});

gulp.task('mv:@angular', ()=>{
    return gulp.src([
        './node_modules/@angular/**/*.js',
        './node_modules/@angular/**/*.ts',
        './node_modules/@angular/**/*.map'
    ])
    .pipe(gulp.dest('./src/demo/dist/vendor/@angular'));    
});

gulp.task('mv:uat', ()=>{
    return gulp.src(['./dist/**/*.*','!./dist/**/*.ngfactory.ts'])
        .pipe(gulp.dest('./src/demo/dist/vendor/unopinionated-angular-toolbox'));    
});

gulp.task('mv:rxjs', ()=>{
    return gulp.src(['./node_modules/rxjs/**/*.*'])
        .pipe(gulp.dest('./src/demo/dist/vendor/rxjs'));    
});

gulp.task('mv:traceur', ()=>{
    return gulp.src(['./node_modules/traceur/**/*.*'])
        .pipe(gulp.dest('./src/demo/dist/vendor/traceur'));    
});


gulp.task('mvDemoLibs', [
    'mv:core-js',
    'mv:systemjs',
    'mv:zonejs',
    'mv:@angular',
    'mv:uat',
    'mv:rxjs',
    'mv:traceur'
]);

//systemjs/dist/system.src.js
//zone.js/dist/zone.js