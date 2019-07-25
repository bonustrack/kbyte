import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
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
      terser(),
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
