#!/usr/bin/env node

import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');

// Directories to clean up after bundling
const dirsToRemove = [
  'components',
  'core',
  'test',
  'types'
];

// Remove individual .d.ts files and directories
dirsToRemove.forEach(dir => {
  const dirPath = join(distPath, dir);
  if (existsSync(dirPath)) {
    console.log(`Cleaning up ${dir}/...`);
    rmSync(dirPath, { recursive: true, force: true });
  }
});

// Remove any .d.ts.map files (except index.d.ts.map if needed)
const mapFiles = [
  'index.d.ts.map'  // Remove map file since we're bundling
];

mapFiles.forEach(file => {
  const filePath = join(distPath, file);
  if (existsSync(filePath)) {
    console.log(`Removing ${file}`);
    rmSync(filePath, { force: true });
  }
});

console.log('Type cleanup complete!');