// Minimal Figma tokens pull + normalize + apply utilities

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

export function parseFileKey(input, env = process.env) {
  if (input && /^[A-Za-z0-9]{10,}$/.test(input)) return input;
  if (input && input.includes('figma.com')) {
    const m = input.match(/figma\.com\/(file|design)\/([A-Za-z0-9]+)\//);
    if (m && m[2]) return m[2];
  }
  if (env.FIGMA_FILE_KEY) return env.FIGMA_FILE_KEY;
  throw new Error('Missing Figma file key. Pass a URL/key or set FIGMA_FILE_KEY.');
}

export async function fetchJson(url, token) {
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Figma API ${res.status} ${res.statusText}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function fetchVariablesAndModes(fileKey, token) {
  const url = `https://api.figma.com/v1/files/${fileKey}/variables`;
  try {
    const json = await fetchJson(url, token);
    const vars = json?.meta?.variables || [];
    const modes = json?.meta?.modes || [];
    const collections = json?.meta?.variableCollections || [];
    return { variables: vars, modes, collections };
  } catch (e) {
    return { variables: [], modes: [], collections: [], error: e };
  }
}

export function normalizeName(name) {
  return String(name)
    .trim()
    .replace(/[\s/]+/g, '.')
    .replace(/[^a-zA-Z0-9_.-]/g, '-')
    .replace(/\.{2,}/g, '.')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function normalizeTokens(variables, modes) {
  const tokens = { color: {}, dimension: {}, number: {}, string: {}, shadow: {}, opacity: {}, others: {} };
  const modeIndex = new Map(modes.map((m, i) => [m.modeId || m.id || String(i), i]));
  const perMode = modes.map(() => ({ color: {}, dimension: {}, number: {}, string: {}, shadow: {}, opacity: {}, others: {} }));

  for (const v of variables) {
    const name = normalizeName(v.name || v.id);
    const type = (v.resolvedType || v.type || '').toLowerCase();
    const bucket = type.includes('color') ? 'color'
      : type.includes('float') || type.includes('number') ? 'number'
      : type.includes('string') ? 'string'
      : type.includes('opacity') ? 'opacity'
      : type.includes('shadow') ? 'shadow'
      : type.includes('dimension') ? 'dimension'
      : 'others';

    tokens[bucket][name] = { $type: bucket, value: null };
    const vbm = v.valuesByMode || {};
    for (const [modeId, val] of Object.entries(vbm)) {
      const idx = modeIndex.get(modeId);
      if (idx == null) continue;
      perMode[idx][bucket][name] = { $type: bucket, value: val };
    }
  }
  return { tokens, perMode };
}

export async function writeTokens({ tokens, modes, perMode, outTokens = 'tokens.json', themesDir = 'themes' }) {
  await writeFile(outTokens, JSON.stringify(tokens, null, 2));
  if (modes && modes.length > 0) {
    if (!existsSync(themesDir)) await mkdir(themesDir, { recursive: true });
    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const file = path.join(themesDir, `${normalizeName(mode.name || `mode-${i}`)}.json`);
      await writeFile(file, JSON.stringify(perMode[i], null, 2));
    }
  }
}

export function cssVarName(name) {
  return `--${name.replace(/\./g, '-')}`;
}

export function toCssVars(tokens) {
  const lines = [':root {'];
  for (const [group, entries] of Object.entries(tokens)) {
    for (const [name, def] of Object.entries(entries)) {
      const val = def && typeof def === 'object' && 'value' in def ? def.value : null;
      if (val == null) continue;
      lines.push(`  ${cssVarName(name)}: ${formatCssValue(val)};`);
    }
  }
  lines.push('}');
  return lines.join('\n');
}

function formatCssValue(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v) {
    const { r, g, b, a } = v;
    const rr = Math.round(Number(r) * 255);
    const gg = Math.round(Number(g) * 255);
    const bb = Math.round(Number(b) * 255);
    const aa = a == null ? 1 : Number(a);
    return `rgba(${rr}, ${gg}, ${bb}, ${aa})`;
  }
  return String(v);
}

export async function applyCss(tokens, { outDir = 'src/themes', file = 'tokens.css' } = {}) {
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
  const css = toCssVars(tokens);
  await writeFile(path.join(outDir, file), css + '\n');
  return { outFile: path.join(outDir, file) };
}

export async function readJsonSafe(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return null; }
}

export function diffTokenMaps(a, b) {
  const changes = { added: [], removed: [], changed: [] };
  const keysA = new Set(Object.keys(a || {}));
  const keysB = new Set(Object.keys(b || {}));
  for (const k of keysB) {
    if (!keysA.has(k)) changes.added.push(k);
  }
  for (const k of keysA) {
    if (!keysB.has(k)) changes.removed.push(k);
  }
  for (const k of keysA) {
    if (keysB.has(k)) {
      const va = JSON.stringify(a[k]);
      const vb = JSON.stringify(b[k]);
      if (va !== vb) changes.changed.push(k);
    }
  }
  return changes;
}

export function diffTokens(oldTokens, newTokens) {
  const groups = new Set([...Object.keys(oldTokens || {}), ...Object.keys(newTokens || {})]);
  const summary = {};
  for (const g of groups) {
    summary[g] = diffTokenMaps(oldTokens?.[g], newTokens?.[g]);
  }
  return summary;
}

