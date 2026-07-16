# Deep Analysis — July 2026

A full due-diligence analysis of @nexcraft/forge, produced 2026-07-13 against `develop` HEAD `73f3b59` (2025-10-15) — nine months into project dormancy. Everything here was measured, not assumed: the toolchain was actually run, bundle sizes actually measured, the published npm tarballs actually downloaded and diffed, and every headline claim adversarially fact-checked.

## Method

41 AI agents in four phases: **(1) Deep Read** — 13 parallel area analysts + a toolchain agent that ran type-check/lint/tests/build live; **(2) Verify** — 16 adversarial fact-checkers, each instructed to *refute* a specific claim with evidence; **(3) Gap probes** — a completeness critic dispatched 4 follow-up investigations (BaseElement deep-dive, npm ownership, audit-vulnerability shipping analysis, license consistency); **(4) Synthesis** — 6 writers + editorial pass. ~2.8M tokens, 1,300+ tool calls. The repo was left untouched (read-only; verified clean before/after).

## Documents

| Doc | Contents | Read if you want… |
|---|---|---|
| [01 — Executive Summary](./01-executive-summary.md) | Verdict, top findings ranked, key numbers, decision framing | The 5-minute version |
| [02 — Architecture & AI System](./02-architecture-and-ai-system.md) | BaseElement, mixins, perf monitoring, token bridge; how the AI-metadata pipeline works and where it degrades | To understand the core design and the "AI-native" substance-vs-marketing question |
| [03 — Component Inventory](./03-component-inventory.md) | All 30 elements: API size, AI depth, a11y, tests, known bugs ranked | Per-component state and the bug list |
| [04 — Testing, Build & CI/CD](./04-testing-build-cicd.md) | Real coverage numbers, bundle measurements, the sideEffects/tree-shaking hazard, workflow map, release path, toolchain-today results, npm audit | Quality/pipeline reality |
| [05 — Packages & Ecosystem](./05-packages-and-ecosystem.md) | 6 workspace packages (incl. the not-actually-MCP figma server), demos, git/npm/GitHub analytics, dependency drift, ownership & licensing | Distribution and ecosystem health |
| [06 — Documentation Audit](./06-documentation-audit.md) | Dead links, fabricated API tables, contradictory counts, AI-instruction-file errors | What the docs get wrong |
| [07 — Roadmap Assessment](./07-roadmap-assessment.md) | Full 18-ADR index with reality checks; every phase/priority: claimed vs. actual status; the story of the Oct 2025 stop | Plans-vs-reality archaeology |
| [08 — Recommended Roadmap](./08-recommended-roadmap.md) | Phase 0 (do today), Path B (freeze, ~2 days), Path A (revive, phased ~2–6 weeks) | **What to do next** |
| [09 — Fact-Check](./09-fact-check.md) | 16 claims → confirmed/partial/refuted with evidence | Which public claims are true |

## The five findings that matter most

1. **Rotate the credentials in `.env` today** (live npm token + Discord webhooks; never committed, but plaintext on disk). Applies under every path.
2. **The toolchain fully works after 9 months** — revival cost is documentation/claims work, not archaeology.
3. **Three headline README badges are false** (coverage, <10KB bundle, 100% WCAG AA) — and the project's own last planning doc admitted the positioning was premature.
4. **`sideEffects: false` + top-level element registration is a real correctness hazard**, and "selective imports" secretly pull the full 91KB-gzip bundle. ADR-011 designed the fix; it was never built.
5. **99 commits — including a security fix — sit unreleased on develop**, with 10 CI-green dependabot PRs unattended.

## Provenance

Raw analyst notes, verifier transcripts, toolchain logs, and the npm-audit JSON live outside the repo at `~/.claude/jobs/68655e73/tmp/forge-analysis/`. These files are generated work products; this folder is safe to commit (checked: contains no secret values), but review before pushing to the public repo since it candidly documents the project's weaknesses.
