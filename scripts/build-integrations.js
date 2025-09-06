#!/usr/bin/env node

/**
 * Build Integration Files
 * 
 * This script copies Vue and Angular integration files to the dist folder during the build process.
 * These files are excluded from the main TypeScript compilation because they import external 
 * dependencies (Vue/Angular) that aren't installed in the main project.
 * 
 * @fileoverview Copies framework integration files that are excluded from TypeScript build
 * @author Ignis Team
 * @since 0.5.0
 * 
 * @example
 * ```bash
 * node scripts/build-integrations.js
 * ```
 * 
 * @see {@link ../tsconfig.json} - Shows which files are excluded from TS compilation
 * @see {@link ../eslint.config.js} - Shows which files are excluded from linting
 */

import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const srcPath = join(process.cwd(), 'src');
const distPath = join(process.cwd(), 'dist');

/**
 * Integration files to copy during build
 * These files are excluded from TypeScript compilation but need to be available in the package
 * 
 * @type {Array<{src: string, dest: string}>}
 */
const integrationFiles = [
  { src: 'integrations/vue.ts', dest: 'integrations/vue.js' },
  { src: 'integrations/angular.ts', dest: 'integrations/angular.js' }
];

/**
 * Creates the integrations directory in dist if it doesn't exist
 */
function ensureIntegrationsDirectory() {
  const integrationsDir = join(distPath, 'integrations');
  if (!existsSync(integrationsDir)) {
    mkdirSync(integrationsDir, { recursive: true });
  }
}

/**
 * Copies integration source files to dist folder
 * Files are copied as .js extensions to match package.json exports
 */
function copyIntegrationFiles() {
  integrationFiles.forEach(({ src, dest }) => {
    const srcFile = join(srcPath, src);
    const destFile = join(distPath, dest);
    
    if (existsSync(srcFile)) {
      console.log(`Copying ${src} → ${dest}`);
      copyFileSync(srcFile, destFile);
    } else {
      console.warn(`Warning: Source file ${src} not found`);
    }
  });
}

// Main execution
try {
  ensureIntegrationsDirectory();
  copyIntegrationFiles();
  console.log('Integration files copied successfully!');
} catch (error) {
  console.error('Error copying integration files:', error);
  process.exit(1);
}