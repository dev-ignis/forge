import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'node:fs';

// Prefer local build output if available so demo reflects workspace changes
const repoRoot = path.resolve(__dirname, '../..');
const localDistEntry = path.join(repoRoot, 'dist', 'nexcraft-forge.es.js');
const localDistDir = path.join(repoRoot, 'dist');

export default defineConfig({
  server: { port: 9092 },
  resolve: {
    alias: fs.existsSync(localDistEntry)
      ? [
          { find: '@nexcraft/forge/dist', replacement: localDistDir },
          { find: '@nexcraft/forge', replacement: localDistEntry },
        ]
      : [],
  },
});
