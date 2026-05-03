# Documentation

This `docs/` folder is the **design specification for the website-as-product** —
what the tutorial teaches, how content is structured, and the principles every
page must uphold.

It is deliberately **separate** from the contributor harness in
[`.github/`](../.github), which configures the AI tools (agents, skills,
instructions, prompts, hooks) that contributors and maintainers use while
*building* the website.

## The two surfaces

| Surface | Lives in | Audience | Purpose |
|---|---|---|---|
| **Website (the product)** | [`src/`](../src) + [`docs/`](.) | Learners visiting the site | Teach AI-Native development through tracks, parts, and examples. |
| **Build harness** | [`.github/`](../.github) | Contributors + AI assistants editing the repo | Customize Copilot/Claude so changes land safely and consistently. |

```
learn-ai-native-dev/
├── src/                       # Website source code (React + content markdown)
├── docs/                      # Design spec for the website ◄── you are here
│   ├── design-principles.md
│   ├── content-architecture.md
│   ├── components.md
│   ├── lifecycle.md
│   ├── harness.md             # Map + authoritative defs of the .github/ harness
│   └── tracks/                # Per-track + per-part design intent
└── .github/                   # Build harness (agents, skills, instructions, ...)
```

## Read in this order

1. [`philosophy.md`](philosophy.md) — north star: what we teach, why, and the four content kinds (Pattern, Path, Recipe, Project Shape).
2. [`design-principles.md`](design-principles.md) — voice, audience, accessibility, visual language.
3. [`content-architecture.md`](content-architecture.md) — paths → modules → steps; routes; lifecycle.
4. [`components.md`](components.md) — contracts for `StepCard`, `PromptBox`, diagrams, etc.
5. [`tracks/foundation.md`](tracks/foundation.md), [`tracks/agentic.md`](tracks/agentic.md), [`tracks/terminal.md`](tracks/terminal.md) — per-track + per-part objectives, prerequisites, success criteria.
6. [`community-contributions.md`](community-contributions.md) — how community work lands inside any track (and, rarely, as a standalone path).
7. [`lifecycle.md`](lifecycle.md) — content statuses and promotion.
8. [`harness.md`](harness.md) — exactly what an *instruction*, *prompt file*, *agent*, *skill*, and *hook* are, and where each lives. Also documents the seven Copilot-SDK automation surfaces (PR-bot, refresh cron, diagram drift, instructions linter, curriculum gap-finder, translation pipeline, promotion readiness).

## Keeping docs in sync with code

A dedicated **Docs Auditor agent** keeps this folder current as the codebase
evolves. See [`harness.md`](harness.md#docs-auditor) and
[`.github/agents/docs-auditor.agent.md`](../.github/agents/docs-auditor.agent.md).

After any meaningful code/content change, run:

```
@docs-auditor
```

The auditor diffs `src/` against `docs/` and proposes targeted updates. It
**never** invents new design rules; it only reflects what the code already
expresses.

## Editing rules for this folder

- One topic per file. Link, don't duplicate.
- Reflect what the code does today; aspirational notes go in issues.
- Path-specific instructions live in [`docs.instructions.md`](../.github/instructions/docs.instructions.md).
