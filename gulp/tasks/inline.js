var gulp = require("gulp");
const inlineResources = require('../../node/inline');

var path = require('path');

const PROJECT_ROOT = path.join(__dirname, '../..');
const DIST_ROOT = path.join(PROJECT_ROOT, 'dist', 'lib');

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
gulp.task('inline-resources', () => inlineResources(DIST_ROOT));
