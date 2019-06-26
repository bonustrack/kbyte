import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  {
    input: 'src/main.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd', // 'iife'
    },
    plugins: [
      typescript({ clean: true }),
      uglify({}, minify),
      filesize(),
    ],
  },
  {
    input: 'src/main.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
      typescript({ clean: true }),
    ],
  },
];
