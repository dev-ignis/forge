# Security Measures and Alerts

This repository automates security checks and notifications.

## What Runs
- PR audit: npm audit on runtime deps; fails on Critical.
- Nightly audit: full dependency audit and summary notification (no fail).
- Release gate: audit before publish; blocks on Critical in runtime deps.

## Discord Notifications
Configure secrets in GitHub Actions:
- `DISCORD_WEBHOOK_URL` (required): default channel webhook.
- `DISCORD_WEBHOOK_CRITICAL` (optional): critical/blocking alerts.
- `DISCORD_WEBHOOK_OPS` (optional): operational summaries.

The system routes messages automatically. If only `DISCORD_WEBHOOK_URL` is set, all messages go there. If the optional webhooks are present, Critical/block events go to `DISCORD_WEBHOOK_CRITICAL` and summaries to `DISCORD_WEBHOOK_OPS`.

## Tunable Knobs
Use repository Variables (Settings → Variables → Repository):
- `SECURITY_ALERT_LEVEL`: `critical` (default) or `high` — threshold for failing PRs/release gates and for nightly reporting.
- `SECURITY_AUDIT_VERBOSE`: `false` (default) or `true` — when `true`, nightly posts even if there’s no change.

CI consumes these via `${{ vars.* }}` with sensible defaults.

## Files
- Workflows: `.github/workflows/security-audit-pr.yml`, `.github/workflows/security-audit-nightly.yml`.
- Release gates: added jobs in `.github/workflows/release.yml` and `.github/workflows/beta-release.yml`.
- Script: `scripts/security/audit-and-notify.mjs`.

## Notes
- Webhooks must be stored as GitHub Actions secrets. Do not commit URLs.
- `npm audit` JSON output can vary across npm versions; the script handles common formats and focuses on severity counts plus top advisories.

