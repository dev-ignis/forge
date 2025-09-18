export default {
  globs: ['src/**/*.ts'],
  exclude: [
    'src/**/*.test.ts',
    'src/**/*.spec.ts',
    'src/**/test/**',
    'src/**/tests/**',
    'node_modules/**',
    'examples/**',
    'packages/**',
    'dist/**',
    'coverage/**',
    '.storybook/**'
  ],
  outdir: './',
  dev: false,
  watch: false,
  litelement: true,
  packagejson: true
};