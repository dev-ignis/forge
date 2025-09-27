#!/usr/bin/env node
/*
 Minimal npm audit runner with Discord notifications and routing.
 - Env knobs:
   - SECURITY_ALERT_LEVEL: "critical" (default) or "high"
   - SECURITY_AUDIT_VERBOSE: "false" (default) or "true"
   - DISCORD_WEBHOOK_URL: default webhook (required)
   - DISCORD_WEBHOOK_CRITICAL: overrides for critical alerts (optional)
   - DISCORD_WEBHOOK_OPS: overrides for ops/summary (optional)
 - CLI args:
   --scope=prod|all (default prod)
   --ci-mode=pr|nightly|release (affects routing text)
   --no-fail (never exit non-zero)
*/
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

function parseArgs(argv) {
  const out = { scope: 'prod', ciMode: 'pr', noFail: false };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--scope=')) out.scope = arg.split('=')[1];
    else if (arg.startsWith('--ci-mode=')) out.ciMode = arg.split('=')[1];
    else if (arg === '--no-fail') out.noFail = true;
  }
  return out;
}

function runNpmAudit({ scope }) {
  const args = ['audit', '--json'];
  if (scope === 'prod' || scope === 'production') args.push('--omit=dev');
  // Do not set --audit-level to ensure JSON always returns fully.
  return new Promise((resolve) => {
    execFile('npm', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      // npm may exit non-zero when vulns found; still parse stdout
      const out = stdout || (error && error.stdout) || '';
      resolve({ code: error ? error.code : 0, stdout: out, stderr });
    });
  });
}

function toBool(v, fallback = false) {
  if (typeof v !== 'string') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}

function normalizeSummary(json) {
  // Try modern npm v8+ format first
  const meta = json?.metadata?.vulnerabilities || json?.vulnerabilities;
  const counts = {
    info: meta?.info ?? 0,
    low: meta?.low ?? 0,
    moderate: meta?.moderate ?? 0,
    high: meta?.high ?? 0,
    critical: meta?.critical ?? 0,
  };
  // Attempt to extract top advisories (best-effort across formats)
  const top = [];
  if (json?.vulnerabilities && typeof json.vulnerabilities === 'object') {
    for (const [name, v] of Object.entries(json.vulnerabilities)) {
      const sev = v?.severity || (v?.via && v.via.find?.(x => typeof x === 'object')?.severity);
      const id = v?.via && v.via.find?.(x => typeof x === 'object')?.source;
      const url = v?.via && v.via.find?.(x => typeof x === 'object')?.url;
      top.push({ id, name, severity: sev, url });
    }
  } else if (json?.advisories) {
    for (const adv of Object.values(json.advisories)) {
      // legacy format
      top.push({ id: adv.id, name: adv.module_name, severity: adv.severity, url: adv.url });
    }
  }
  // sort by severity weight
  const weight = { critical: 4, high: 3, moderate: 2, low: 1, info: 0 };
  top.sort((a, b) => (weight[b.severity] || 0) - (weight[a.severity] || 0));
  return { counts, top: top.slice(0, 5) };
}

function shouldFail(counts, level) {
  if (level === 'high') return (counts.high || 0) + (counts.critical || 0) > 0;
  return (counts.critical || 0) > 0; // default critical
}

function pickWebhook({ ciMode, hasCritical, env }) {
  const def = env.DISCORD_WEBHOOK_URL;
  const critical = env.DISCORD_WEBHOOK_CRITICAL || def;
  const ops = env.DISCORD_WEBHOOK_OPS || def;
  if (!def && !env.DISCORD_WEBHOOK_CRITICAL && !env.DISCORD_WEBHOOK_OPS) return null;
  if (ciMode === 'release') return critical;
  if (hasCritical) return critical;
  return ops;
}

async function readEvent() {
  try {
    const p = process.env.GITHUB_EVENT_PATH;
    if (!p) return null;
    const raw = await readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function postDiscord(webhook, payload) {
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`Discord webhook failed: ${res.status} ${res.statusText} ${text}`);
    }
  } catch (e) {
    console.error('Discord webhook error:', e?.message || e);
  }
}

function formatContent({ ciMode, counts, top, level, runUrl, repo, ref, prNumber }) {
  const sevIcon = counts.critical > 0 ? '🛑' : counts.high > 0 ? '⚠️' : '✅';
  const scopeTxt = ciMode === 'pr' ? `PR #${prNumber ?? ''}`.trim() : ciMode === 'nightly' ? 'Nightly' : 'Release Gate';
  const title = `${sevIcon} Security Audit (${scopeTxt})`;
  const countsTxt = `critical:${counts.critical} high:${counts.high} moderate:${counts.moderate} low:${counts.low}`;
  const topTxt = top && top.length ? top.map(t => `• ${t.severity?.toUpperCase()}: ${t.name}${t.id ? ` (${t.id})` : ''}${t.url ? ` <${t.url}>` : ''}`).join('\n') : '• No details available';
  const header = `${title} — level=${level}\nrepo:${repo} ref:${ref}\n${countsTxt}\nRun: ${runUrl}`;
  return `${header}\n\nTop advisories:\n${topTxt}`;
}

async function main() {
  const args = parseArgs(process.argv);
  const level = (process.env.SECURITY_ALERT_LEVEL || 'critical').toLowerCase();
  const verbose = toBool(process.env.SECURITY_AUDIT_VERBOSE ?? 'false', false);
  const { stdout } = await runNpmAudit({ scope: args.scope });

  let json;
  try { json = JSON.parse(stdout); } catch { json = null; }
  if (!json) {
    console.error('Failed to parse npm audit JSON output. Raw snippet:', String(stdout).slice(0, 500));
  }
  const { counts, top } = normalizeSummary(json || {});

  const fail = shouldFail(counts, level);
  const hasCritical = (counts.critical || 0) > 0;
  const webhook = pickWebhook({ ciMode: args.ciMode, hasCritical, env: process.env });

  const server = process.env.GITHUB_SERVER_URL || 'https://github.com';
  const repo = process.env.GITHUB_REPOSITORY || '';
  const runId = process.env.GITHUB_RUN_ID || '';
  const ref = process.env.GITHUB_REF || '';
  const runUrl = `${server}/${repo}/actions/runs/${runId}`;
  const event = await readEvent();
  const prNumber = event?.pull_request?.number || event?.number;

  const shouldNotify = fail || (args.ciMode === 'nightly' ? (verbose || hasCritical || (level === 'high' && (counts.high || 0) > 0)) : fail);
  if (webhook && shouldNotify) {
    const content = formatContent({ ciMode: args.ciMode, counts, top, level, runUrl, repo, ref, prNumber });
    await postDiscord(webhook, { content });
  }

  if (args.noFail) {
    console.log(`No-fail mode: ${fail ? 'would have failed' : 'clean'} at level=${level}`);
    process.exit(0);
  }
  process.exit(fail ? 1 : 0);
}

// Entrypoint
main().catch((e) => {
  console.error('Security audit script error:', e?.stack || e?.message || String(e));
  process.exit(1);
});

