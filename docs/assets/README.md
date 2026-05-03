# README assets

Visual assets used by the root [`README.md`](../../README.md). Everything here is
**pure SVG** — no screen captures, no video files, no maintenance pipeline.
Each asset traces back to a principle in [`../philosophy.md`](../philosophy.md)
and follows the visual rules in [`../design-principles.md`](../design-principles.md).

## Assets

| File | Where it appears | Story it tells | Philosophy reference |
|---|---|---|---|
| `wordmark-light.svg` / `wordmark-dark.svg` | Hero — top of README | Brand wordmark with the gradient density bar (vibe → spec → agentic). | §3.4 contrast where it teaches |
| `hero-terminal.svg` | Hero — under badges | A 9-second loop: typing `/add-example` in Copilot Chat scaffolds a recipe end-to-end. | "The repo IS the contribution platform." |
| `flywheel.svg` | "Why this exists" | The **practice → problems → intuition** flow, with `vocabulary` as a faint optional satellite. | §1, §3.5 |
| `spectrum.svg` | "Why this exists" | A traveling marker showing learners move *along* the vibe / spec / agentic spectrum. | §3.4 |

## Conventions

- **Palette.** Ink `#0a0a0a` · Accent `#ff5500` · Neutrals `#888 / #d8d8d8`.
- **Type.** `ui-monospace` for code, `Space Grotesk` for headings (matches the site).
- **Motion.** Slow, low-amplitude, non-essential — pure decoration. SMIL is used
  because GitHub renders SMIL inside `<img>`-referenced SVG. Note: SMIL does not
  honor `prefers-reduced-motion`; we keep amplitude small and provide text
  equivalents in adjacent prose / `<details>` blocks per
  [`design-principles.md`](../design-principles.md) §6.
- **Width.** 900 px viewBox so they downscale cleanly on mobile GitHub.

## Editing

Open the SVGs directly — they're hand-authored and small. If you regenerate
them, re-test on `github.com` (light + dark) before committing; some renderers
strip animations.
