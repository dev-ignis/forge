import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ForgeRHF',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`,
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-hook-form',
        '@nexcraft/forge/integrations/react'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-hook-form': 'ReactHookForm'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});