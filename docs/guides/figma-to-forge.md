# Figma → Forge Tokens

A zero‑config way to pull design tokens from a Figma file and generate Forge‑ready assets via CLI or MCP. No plugin required.

## Quick Start (CLI)
- Prereq: Node 20+, a Figma Personal Access Token (PAT)
- Set env and run:

```bash
export FIGMA_TOKEN="<your-figma-pat>"
# Option A: pass a public Figma URL or file key
npx @nexcraft/forge-tokens figma:pull https://www.figma.com/file/<KEY>/My-Designs --apply
# Option B: set a default file key and omit the arg
export FIGMA_FILE_KEY="<KEY>"
npx @nexcraft/forge-tokens figma:pull --apply
```

What happens:
- Pulls Variables (modes/themes) from the file
- Writes `tokens.json` and `themes/<mode>.json` (if modes exist)
- Generates `src/themes/tokens.css` with CSS custom properties

## MCP Tools (Optional)
- Install and run server with env:

```bash
npm i -D @nexcraft/forge-mcp-figma
# Configure your MCP client to run `forge-mcp-figma` with FIGMA_TOKEN (and FIGMA_FILE_KEY optional)
```

Available tools:
- `figma.pull_tokens({ fileKey? })` → writes tokens and returns a summary
- `figma.apply_tokens()` → generates CSS variables
- `figma.open_pr({ branch? })` → stub (use CI or your own GH flow)

## Minimal Config (Optional)
If you need custom modes, paths, or filters, add `forge.figmaconfig.json` at the repo root. For zero‑config, you can skip this file entirely.

```json
{
  "modes": ["Light", "Dark"],
  "output": { "tokens": "tokens.json", "themesDir": "themes" },
  "selectors": { "componentPrefix": "Forge/" }
}
```

## Commands
- `figma:pull [url-or-key] [--apply] [--pr]`
  - Pull tokens from a Figma file (URL or file key). `--apply` writes CSS vars.
- `validate [tokens.json]`
  - Basic validation; fails if empty or missing groups.
- `apply [tokens.json]`
  - Generate `src/themes/tokens.css` from an existing tokens file.
- `diff <old.json> <new.json>`
  - JSON diff summary by token groups (added/removed/changed).

## Examples (Inline)
- tokens.json (snippet)
```json
{
  "color": {
    "color.bg.primary": { "$type": "color", "value": "#0b5fff" },
    "color.text.default": { "$type": "color", "value": "#111827" }
  },
  "dimension": {
    "space.4": { "$type": "dimension", "value": "16px" }
  }
}
```

- Generated CSS (src/themes/tokens.css)
```css
:root {
  --color-bg-primary: #0b5fff;
  --color-text-default: #111827;
  --space-4: 16px;
}
```

## Troubleshooting
- 401/403 from Figma API → Ensure `FIGMA_TOKEN` is set and valid; public files still require auth for Variables API.
- No variables found → Ensure your Figma file uses Variables (preferred). Styles‑only files will not produce mode files.
- Multiple themes/modes → The CLI writes `themes/<mode>.json` for each Figma mode.

## Security Notes
- Keep `FIGMA_TOKEN` in your local env or GitHub Actions secrets. Do not commit tokens.
- The CLI does not store your PAT; it only reads it from env for the current run.

