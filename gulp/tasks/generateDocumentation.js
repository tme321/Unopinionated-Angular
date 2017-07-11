var gulp = require("gulp");
var typedoc = require("gulp-typedoc");

gulp.task("gen-doc", function() {
    return gulp
        .src(["**/*.ts"])
        .pipe(typedoc({
            
            //out: "../../doc",
            json: "../../doc/api/api.json",
            module: "commonjs",
            experimentalDecorators: "true",
            emitDecoratorMetadata: "true",
            excludePrivate: "true",
            excludeExternals: "true",
            includeDeclarations: "true",
            exclude: "**/+(*.spec.ts|*.scss|*.html|*.config.ts)",
            name: "Unopinionated Angular Toolbox",
            preserveConstEnums: "true",
            stripInternal: "true",
        }))
    ;
});

//"genDoc": "cd src/lib && typedoc --json ../../doc/api/api.json"