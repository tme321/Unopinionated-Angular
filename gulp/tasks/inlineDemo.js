var gulp = require("gulp");
const inlineResources = require('../../node/inline');

var path = require('path');

const PROJECT_ROOT = path.join(__dirname, '../..');
const DEMO_ROOT = path.join(PROJECT_ROOT, 'src/demo/dist');

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
gulp.task('inline-demo-resources', () => inlineResources(DEMO_ROOT));
