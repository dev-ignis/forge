#!/usr/bin/env node
import { parseFileKey, fetchVariablesAndModes, normalizeTokens, writeTokens, applyCss, readJsonSafe, diffTokens } from '../lib/figma.mjs';

function help() {
  console.log(`Forge Tokens CLI\n\nUsage:\n  forge-tokens figma:pull [url-or-key] [--apply] [--pr]\n  forge-tokens validate [tokens.json]\n  forge-tokens apply [tokens.json]\n  forge-tokens diff <old.json> <new.json>\n\nEnv:\n  FIGMA_TOKEN      Figma PAT (required)\n  FIGMA_FILE_KEY   Default file key (optional)\n`);
}

function getFlag(name) {
  return process.argv.includes(name);
}

function getArg(i) {
  return process.argv[i];
}

async function cmdFigmaPull() {
  const arg = getArg(3);
  const key = parseFileKey(arg, process.env);
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('Missing FIGMA_TOKEN. Create a Figma PAT and export FIGMA_TOKEN.');
    process.exit(1);
  }
  console.log(`Pulling variables from Figma file: ${key}`);
  const { variables, modes } = await fetchVariablesAndModes(key, token);
  if (!variables || variables.length === 0) {
    console.warn('No variables returned from Figma. Ensure Variables are used in this file.');
  }
  const { tokens, perMode } = normalizeTokens(variables, modes);
  await writeTokens({ tokens, modes, perMode });
  console.log('Wrote tokens.json' + (modes?.length ? ` and ${modes.length} theme files` : ''));

  if (getFlag('--apply')) {
    await applyCss(tokens);
    console.log('Generated CSS variables in src/themes/tokens.css');
  }

  if (getFlag('--pr')) {
    console.log('PR automation not yet configured. Please commit and open a PR:');
    console.log('  git checkout -b chore/tokens-sync && git add tokens.json themes src/themes/tokens.css && git commit -m "chore(tokens): sync from Figma"');
  }
}

async function cmdValidate() {
  const file = getArg(3) || 'tokens.json';
  const json = await readJsonSafe(file);
  if (!json) {
    console.error(`Cannot read ${file}`);
    process.exit(1);
  }
  const groups = Object.keys(json || {});
  if (groups.length === 0) {
    console.error('No tokens found.');
    process.exit(2);
  }
  console.log(`Validated tokens: groups=${groups.join(', ')}`);
}

async function cmdApply() {
  const file = getArg(3) || 'tokens.json';
  const json = await readJsonSafe(file);
  if (!json) {
    console.error(`Cannot read ${file}`);
    process.exit(1);
  }
  await applyCss(json);
  console.log('Generated CSS variables in src/themes/tokens.css');
}

async function cmdDiff() {
  const a = await readJsonSafe(getArg(3));
  const b = await readJsonSafe(getArg(4));
  if (!a || !b) {
    console.error('Provide two JSON files to diff.');
    process.exit(1);
  }
  const d = diffTokens(a, b);
  console.log(JSON.stringify(d, null, 2));
}

async function main() {
  const cmd = getArg(2);
  if (!cmd) { help(); process.exit(0); }
  if (cmd === 'figma:pull') return cmdFigmaPull();
  if (cmd === 'validate') return cmdValidate();
  if (cmd === 'apply') return cmdApply();
  if (cmd === 'diff') return cmdDiff();
  help();
  process.exit(1);
}

main().catch(e => { console.error(e?.stack || e?.message || String(e)); process.exit(1); });

