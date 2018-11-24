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
    input: 'src/main.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd', // 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
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
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
