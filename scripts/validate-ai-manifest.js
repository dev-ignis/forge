#!/usr/bin/env node
/*
  Lightweight validation for ai-manifest.json without external deps.
  - Checks file presence, basic shape, and required top-level fields.
  - Emits warnings for common issues but exits 0 to avoid breaking CI initially.
  Convert to stricter validation (e.g., ajv) when dependencies are available.
*/
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const manifestPath = resolve(process.cwd(), 'ai-manifest.json');
if (!existsSync(manifestPath)) {
  console.warn('[ai] ai-manifest.json not found — run `npm run build:ai`');
  process.exit(0);
}

let data;
try {
  data = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.error('[ai] Invalid JSON in ai-manifest.json');
  process.exit(1);
}

const errors = [];
if (typeof data.manifestVersion !== 'string') errors.push('manifestVersion must be string');
if (typeof data.package !== 'string') errors.push('package must be string');
if (!Array.isArray(data.components)) errors.push('components must be array');

if (errors.length) {
  console.error('[ai] Manifest validation errors:\n - ' + errors.join('\n - '));
  process.exit(1);
}

console.log('[ai] Manifest looks valid (basic checks)');
