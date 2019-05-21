import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  {
    input: 'src/main.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'iife', // 'umd'
      globals: {
        ws: 'WebSocket',
      },
    },
    plugins: [
      uglify({}, minify),
      filesize(),
    ],
    external: ['ws'],
  },
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    external: ['ws'],
  },
];
