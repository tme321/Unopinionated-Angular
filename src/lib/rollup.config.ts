export default {
  entry: './index.js',
  dest: './bundles/unopinionated-angular-toolbox.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'unopinionated-angular-toolbox',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/animations': 'ng.animations',
    'rxjs/Rx': 'Rx',
  }
}
