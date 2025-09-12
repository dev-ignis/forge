#!/usr/bin/env node
/*
  Generates ai-manifest.json.
  - Gracefully handles missing inputs (custom-elements.json, d.ts, examples)
  - Writes a minimal, valid manifest so builds don't fail
*/
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

function readJSONSafe(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

const root = process.cwd();
const pkg = readJSONSafe(resolve(root, 'package.json')) || { name: 'unknown' };
const cemPath = resolve(root, 'custom-elements.json');
const cem = existsSync(cemPath) ? readJSONSafe(cemPath) : null;

const components = [];
if (cem && Array.isArray(cem.modules)) {
  // Simplified extraction from CEM
  for (const m of cem.modules) {
    for (const d of (m.declarations || [])) {
      if (d.tagName) {
        components.push({
          id: d.tagName,
          tag: d.tagName,
          category: d.customElement ? 'atom' : undefined,
          props: (d.members || [])
            .filter(x => x.kind === 'field' || x.kind === 'property')
            .map(x => ({ name: x.name, type: x.type?.text })),
          events: (d.events || []).map(e => ({ name: e.name, detail: e.type?.text })),
          slots: (d.slots || []).map(s => s.name || 'default'),
          a11y: {},
          examples: {}
        });
      }
    }
  }
}

const manifest = {
  manifestVersion: '1.0.0',
  package: pkg.name,
  generatedAt: new Date().toISOString(),
  components
};

const outPath = resolve(root, 'ai-manifest.json');
writeFileSync(outPath, JSON.stringify(manifest, null, 2));

// Optionally mirror to dist if present
const distPath = resolve(root, 'dist', 'ai-manifest.json');
try {
  mkdirSync(dirname(distPath), { recursive: true });
  writeFileSync(distPath, JSON.stringify(manifest, null, 2));
} catch {}

console.log(`[ai] Manifest generated at ${outPath}`);
