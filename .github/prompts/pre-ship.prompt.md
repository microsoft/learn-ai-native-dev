---
description: "Run a full pre-ship review for a content track before deploying. Validates content structure, track wiring, build, accessibility, version currency, and content quality."
mode: "agent"
agent: "reviewer"
---

Run a full pre-ship review of the **${input:track:Which track? (foundation, advanced, terminal)}** track.

Execute all 7 steps autonomously — do NOT stop between steps:

1. **Content structure QA** — Validate markdown syntax, step numbering, prompt blocks, diagram wiring, unclosed blocks, terminology
2. **Track wiring** — Verify data parser, page components, routes, and header navigation exist
3. **Build** — Run `npm run build` and confirm it passes
4. **Accessibility & readability** — Check plain language, jargon, inclusive language, tone
5. **Version currency** — Verify tool/API references are current
6. **Content review** — Read the content: learning flow, step progression, prompt clarity, technical accuracy, no placeholder content
7. **Report** — Generate a structured report with verdict (✅ APPROVED / 🔄 NEEDS CHANGES / ❌ NOT APPROVED) and issues by severity
