# Design Principles

These principles apply to **all** website content and UI. They are derived from
the code in [`src/`](../src) and the conventions in [`AGENTS.md`](../AGENTS.md).

## 1. Three experience qualities

Every page, component, and sentence is checked against these:

1. **Empowering** — Reinforce that anyone can create faster with AI. Avoid
   gatekeeping language ("real developers", "obviously").
2. **Crystalline** — Complex processes broken into obvious, numbered steps with
   clear visual hierarchy. If a learner can't say "I am on step N of M", the
   step is wrong.
3. **Inviting** — Warm, friendly, approachable. Premium-developer-tool feel
   (Linear / Vercel / Arc), not corporate.

## 2. Audience contract

The tutorial serves **three concentric audiences**, in order of priority:

| Audience | Mental model | What they need |
|---|---|---|
| **Beginners** (never built software) | "Can I really do this?" | Plain language, copy-paste prompts, visible wins early. |
| **Builders** (some experience) | "Show me a faster way." | Patterns, comparisons, escape hatches when AI gets it wrong. |
| **Pros** (work in code daily) | "Make me an AI-Native team of one." | Agents, skills, MCP, orchestration, terminal workflows. |

A page may target one tier explicitly, but **must not actively exclude** the
others. Use progressive disclosure (collapsible blocks, "Going deeper" callouts).

## 3. Voice and tone

- **Second person** ("you", "your") — never "the user".
- **Present tense, active voice** — "Run the build" not "the build will be run".
- **Short sentences.** Aim for ≤ 22 words. Break with bullets, not commas.
- **Concrete over abstract.** Show a prompt; don't describe what a good prompt
  looks like.
- **No hype, no fear.** "AI helps you ship" not "AI is revolutionizing".
- **Inclusive language.** Use the **Accessibility & readability** section of the [`tutorial-content-qa` skill](../.github/skills/tutorial-content-qa/SKILL.md) before merging.

## 4. Pedagogy

Every step on every page follows the same micro-shape:

1. **Why this matters** (1–2 sentences, learner stake).
2. **What you do** (numbered actions, ≤ 7 items).
3. **Prompt block** (copy-paste, with template variables when relevant).
4. **What success looks like** (an observation, not "you're done").
5. **Optional: troubleshooting / going deeper.**

Anti-patterns: theory dumps without a prompt, prompts without success criteria,
"refer to the docs" without a quote.

## 5. Visual language

| Aspect | Rule |
|---|---|
| Typography | H1 Space Grotesk Bold 48 px (36 px mobile); body Inter 16 px / 1.6 (15 px mobile). |
| Spacing | Section `py-24 px-8` (mobile `py-12 px-4`); cards `p-6`; step gap `gap-12`. |
| Color | Tailwind tokens via CSS variables in `src/styles/theme.css`. **No hex literals in components.** |
| Icons | Phosphor first, Heroicons second. No emoji-as-icon. |
| Code blocks | Shiki via `src/lib/shiki.ts`. Long lines scroll horizontally on mobile. |
| Motion | Subtle. `use-animate-in` hook only. Respect `prefers-reduced-motion`. |

## 6. Accessibility floor (non-negotiable)

- Semantic HTML (`<nav>`, `<main>`, `<button>`; never `<div onClick>`).
- All interactive elements keyboard-reachable; visible `:focus` ring.
- Color contrast WCAG AA against both themes.
- Diagrams provide a text equivalent (alt text or adjacent prose).
- Forms and inputs have explicit `<label>` associations.

The **Accessibility & readability** section of the [`tutorial-content-qa` skill](../.github/skills/tutorial-content-qa/SKILL.md)
runs as part of pre-ship review.

## 7. Performance budget

- Initial route JS ≤ 250 KB gzipped. Diagram components are lazy-loaded.
- Markdown content is bundled at build time; no runtime fetches for tutorial
  text.
- Images: `webp` or `svg`; explicit `width`/`height` to avoid layout shift.

## 8. Content currency

- Cite tool versions where behavior depends on them.
- The [`version-checker` skill](../.github/skills/version-checker/SKILL.md) and
  the [`@content-health` agent](../.github/agents/content-health.agent.md) audit
  staleness on a schedule.

## 9. Security in examples

Tutorial code is read by thousands of learners who copy it verbatim. Therefore:

- Never hardcode API keys, tokens, or secrets — even fake-looking ones.
- Never use `eval`, `Function`, or `dangerouslySetInnerHTML` with dynamic
  input.
- Always show input validation at trust boundaries.
- Always use `https://` for external resources.

The same rules apply to AI-generated examples copied from chat sessions.
