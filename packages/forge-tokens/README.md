@nexcraft/forge-tokens

Zero-config CLI to pull design tokens from a Figma file and generate Forge-ready assets.

Quick start
- Set FIGMA_TOKEN (Figma PAT) and provide a Figma URL or file key.
- Run: npx @nexcraft/forge-tokens figma:pull <url-or-key> --apply

Env vars
- FIGMA_TOKEN: Figma Personal Access Token (required)
- FIGMA_FILE_KEY: default file key when URL/key arg is omitted (optional)

Optional config
- forge.figmaconfig.json to customize modes, filters, and output paths.

