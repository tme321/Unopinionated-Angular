var gulp = require("gulp");
var mincss = require('gulp-clean-css');
var minhtml = require('gulp-htmlmin');
var gif = require('gulp-if');
var path = require('path');

const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true
};

const PROJECT_ROOT = path.join(__dirname, '../..');
const DIST_ROOT = path.join(PROJECT_ROOT, 'dist');

/** Minifies the HTML and CSS assets in the distribution folder. */
gulp.task('minify:assets', () => {
  return gulp.src('**/*.+(html|css)', { cwd: DIST_ROOT})
    .pipe(gif(/.css$/, mincss(), minhtml(HTML_MINIFIER_OPTIONS)))
    .pipe(gulp.dest(DIST_ROOT));
});
