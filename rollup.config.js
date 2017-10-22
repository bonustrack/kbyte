import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    entry: 'src/main.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'kbyte',
    external: ['crypto'],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      uglify({}, minify),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    entry: 'src/main.js',
    external: [
      'bluebird',
      'byteballcore/object_hash',
      'byteballcore/constants',
      'byteballcore/object_length',
    ],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
  },
];
