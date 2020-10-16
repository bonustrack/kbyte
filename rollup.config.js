import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const external = [...Object.keys(pkg.dependencies || {})];

export default [
  {
    input: 'src/main.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      globals: {
        ws: 'WebSocket'
      }
    },
    plugins: [
      typescript({ clean: true }),
      terser(),
      filesize()
    ]
  },
  {
    input: 'src/main.ts',
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript({ clean: true })
    ]
  }
];
