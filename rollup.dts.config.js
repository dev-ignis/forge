import dts from 'rollup-plugin-dts';
import { resolve } from 'path';

export default {
  input: './dist/index.d.ts',
  output: {
    file: './dist/index.bundled.d.ts',
    format: 'es'
  },
  plugins: [
    dts({
      respectExternal: true,
      compilerOptions: {
        paths: {
          '@': [resolve('./src')],
          '@components': [resolve('./src/components')],
          '@core': [resolve('./src/core')]
        }
      }
    })
  ],
  external: [
    'lit',
    'lit/decorators.js',
    'lit/directives/class-map.js',
    'lit/directives/if-defined.js'
  ]
};