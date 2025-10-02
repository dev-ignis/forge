# @nexcraft/forge-tokens

## 0.2.0

### Minor Changes

- 1cf8628: feat: initial release of Figma tokens CLI and MCP server for Forge
  - @nexcraft/forge-tokens: CLI to pull tokens from a Figma file via URL or file key, generate tokens.json and optional themes, apply CSS variables, and print PR instructions.
  - @nexcraft/forge-mcp-figma: minimal MCP stdio server exposing figma.pull_tokens / figma.apply_tokens / figma.open_pr (stub), powered by the CLI library.
