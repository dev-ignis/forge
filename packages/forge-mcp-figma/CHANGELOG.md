# @nexcraft/forge-mcp-figma

## 0.2.0

### Minor Changes

- 842b2e4: chore: increment beta versions to skip unpublished versions
  - Bump framework packages to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-mcp-figma to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-rhf to 0.4.0-beta.0 to skip past unpublished 0.3.1-beta.0 and 1.0.0-beta.0

- 1cf8628: feat: initial release of Figma tokens CLI and MCP server for Forge
  - @nexcraft/forge-tokens: CLI to pull tokens from a Figma file via URL or file key, generate tokens.json and optional themes, apply CSS variables, and print PR instructions.
  - @nexcraft/forge-mcp-figma: minimal MCP stdio server exposing figma.pull_tokens / figma.apply_tokens / figma.open_pr (stub), powered by the CLI library.

### Patch Changes

- Updated dependencies [1cf8628]
  - @nexcraft/forge-tokens@0.2.0
