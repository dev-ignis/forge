import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    isolate: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.*',
        '**/*.d.ts',
        '**/*.stories.ts',
        '**/index.ts',
        'src/index.ts',
        'dist/**',
        'storybook-static/**',
        '.storybook/**',
        'scripts/**',
        'src/types/**',
        'src/integrations/**',
        'demos/**',
        'test-performance.js',
        'packages/**',
        'src/core/ai-metadata-exporter.ts',
        'src/core/ai-metadata-validator.ts'
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70
      }
    },
    // Important for Web Components
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@core': resolve(__dirname, './src/core')
    }
  },
  esbuild: {
    target: 'es2020'
  }
});