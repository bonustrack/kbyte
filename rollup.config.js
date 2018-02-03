import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import builtins from 'rollup-plugin-node-builtins';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    entry: 'src/main.js',
    dest: pkg.browser,
    format: 'umd', // iife
    moduleName: pkg.name,
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      uglify({}, minify),
      builtins(),
      json(),
      filesize(),
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
      'crypto',
      'bitcore-mnemonic',
      'bitcore-lib',
      'byteballcore/constants',
      'byteballcore/object_hash',
      'byteballcore/object_length',
      'byteballcore/validation_utils',
    ],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
  },
];
