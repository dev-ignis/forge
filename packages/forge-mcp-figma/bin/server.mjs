#!/usr/bin/env node
// Minimal MCP-like JSON-RPC over stdio
import { parseFileKey, fetchVariablesAndModes, normalizeTokens, writeTokens, applyCss } from '@nexcraft/forge-tokens';

const methods = {
  async 'figma.pull_tokens'(params = {}) {
    const key = parseFileKey(params.fileKey || '', process.env);
    const token = process.env.FIGMA_TOKEN;
    if (!token) throw new Error('Missing FIGMA_TOKEN');
    const { variables, modes } = await fetchVariablesAndModes(key, token);
    const { tokens, perMode } = normalizeTokens(variables, modes);
    await writeTokens({ tokens, modes, perMode });
    return { ok: true, counts: { variables: variables.length, modes: modes.length } };
  },
  async 'figma.apply_tokens'() {
    const tokens = await (await import('node:fs/promises')).readFile('tokens.json', 'utf8').then(JSON.parse).catch(() => null);
    if (!tokens) throw new Error('tokens.json not found');
    await applyCss(tokens);
    return { ok: true };
  },
  async 'figma.open_pr'(params = {}) {
    // Stub: leave to CI or a future GitHub App integration
    return { ok: true, message: 'PR automation not implemented in MCP server' };
  }
};

let nextId = 1;
function respond(id, result, error) {
  const payload = { jsonrpc: '2.0', id, ...(error ? { error: { code: -32000, message: String(error?.message || error) } } : { result }) };
  process.stdout.write(JSON.stringify(payload) + '\n');
}

process.stdin.setEncoding('utf8');
let buf = '';
process.stdin.on('data', chunk => {
  buf += chunk;
  let idx;
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    try {
      const msg = JSON.parse(line);
      const { id, method, params } = msg;
      const fn = methods[method];
      if (!fn) { respond(id ?? nextId++, null, new Error(`Unknown method: ${method}`)); continue; }
      Promise.resolve(fn(params)).then(res => respond(id ?? nextId++, res, null)).catch(err => respond(id ?? nextId++, null, err));
    } catch (e) {
      respond(null, null, e);
    }
  }
});
