# AI Manifest

The AI Manifest (ai-manifest.json) is a machine-readable index of Forge components used by AI tools to generate correct, accessible, and performant code.

## Contents
- Components: tag, category, props (type/required/default), events (name/detail), slots
- AI Methods: getPossibleActions(), explainState(), aiState getter for intelligent component interaction
- A11y patterns and design token references
- Examples: Web Components, React, SSR fallback

## Build & Location
- Generated during npm run build by scripts/generate-ai-manifest.js
- Output: ai-manifest.json (repo root) and dist/ai-manifest.json

## Validation
- Run npm run validate:ai for basic shape validation
- CI can enforce schema checks once stricter validation is added

## Contributing
- Add or update examples under docs/components/<component>.md or examples/<tag>/
- Keep prop types/enums accurate via TypeScript declarations; the generator prefers dist/*.d.ts
- For SSR, ensure ADR-018 fallback patterns are included in examples
