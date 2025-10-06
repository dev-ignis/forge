#!/usr/bin/env node

/**
 * Post-build script to add 'use client' directive to all component files
 *
 * This follows the industry standard pattern (used by MUI and others) where
 * the 'use client' directive is added during build time, not in source files.
 *
 * Why:
 * - Keeps source files framework-agnostic
 * - Consumers don't need to manually add 'use client' to every component
 * - Works automatically with Next.js App Router (v13+)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');

console.log('🔧 Adding "use client" directives to React components...\n');

// Find all .js files in dist/
const files = glob.sync('**/*.js', {
  cwd: distDir,
  absolute: true,
  ignore: ['**/ssr/**'] // Don't add to SSR utilities if they exist
});

let processedCount = 0;
let skippedCount = 0;

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has 'use client'
  if (content.trimStart().startsWith("'use client'") || content.trimStart().startsWith('"use client"')) {
    skippedCount++;
    return;
  }

  // Prepend 'use client' directive at the very top
  const newContent = `'use client';\n${content}`;
  fs.writeFileSync(filePath, newContent, 'utf-8');

  const relativePath = path.relative(distDir, filePath);
  console.log(`  ✅ ${relativePath}`);
  processedCount++;
});

console.log(`\n✨ Done! Processed ${processedCount} files, skipped ${skippedCount} files.\n`);
