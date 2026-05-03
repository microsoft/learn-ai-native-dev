# Track: Foundation

The on-ramp. Anyone — beginner or pro — should leave this track having shipped a
real, working web app via AI-Native techniques, and understanding the loop they
will use forever.

- **Path id:** `foundation`
- **Status:** `official`
- **Audience:** beginner → builder
- **Estimated time:** ~120 minutes
- **Supports example tracks:** ✅ (learners pick a project on `/examples`)
- **Source:** [`src/content/tutorial/`](../../src/content/tutorial)

## Design intent

1. **Win in 15 minutes.** A learner must see a working artifact by the end of
   Part 1. Everything else is leverage on that foundation.
2. **Substitutability.** The same lesson must work for any of the example
   tracks. No project-specific phrasing inside step prose; use template
   variables (`{{projectName}}`, `{{colorCoding}}`, …).
3. **Layering.** Each part adds one new lever (rules → folder rules →
   agents → skills → integration → troubleshooting). No skipping. No
   conceptual leaps that reference Parts 3–8 in Parts 0–2.
4. **Plain language first.** Every step that mentions a developer term has a
   one-line analogy. The **Accessibility & readability** section of the [`tutorial-content-qa` skill](../../.github/skills/tutorial-content-qa/SKILL.md)
   enforces this on review.
5. **Copy-paste friendly.** Every action has a `:::prompt` block the learner
   can paste verbatim — no fill-in-the-blanks unless the variable is named.

## Per-part design

| # | Part | Subtitle | Primary objective | Success signal | Source |
|---|---|---|---|---|---|
| 0 | Getting Started | 5 min — Get ready to build | Set up VS Code + Copilot Agent mode. | Learner sees "Agent" in the chat mode picker. | [`part-0-getting-started.md`](../../src/content/tutorial/part-0-getting-started.md) |
| 1 | Build Something That Works | 15 min — First working prototype | Direct AI to scaffold a working project from a one-paragraph brief. | App runs locally and matches the chosen example track. | [`part-1-build-something-that-works.md`](../../src/content/tutorial/part-1-build-something-that-works.md) |
| 2 | Add Interactive Features | 15 min — Make it respond to clicks | Iterate on a working app via a single expanded prompt. | New behavior added without breaking existing features. | [`part-2-add-interactive-features.md`](../../src/content/tutorial/part-2-add-interactive-features.md) |
| 3 | Teach AI Your Rules | 15 min — Make AI work how you want | Introduce `copilot-instructions.md`. | AI applies the rule on the next request unprompted. | [`part-3-teach-ai-your-rules.md`](../../src/content/tutorial/part-3-teach-ai-your-rules.md) |
| 4 | Folder-Based Rules | 15 min — Different rules per folder | Introduce `*.instructions.md` with `applyTo:`. | Rules fire only for matching files. | [`part-4-path-specific-instructions.md`](../../src/content/tutorial/part-4-path-specific-instructions.md) |
| 5 | Custom Agents | 15 min — Specialized AI personas | Define `*.agent.md` with system prompt + tool restrictions. | Switching agents visibly changes output style. | [`part-5-custom-agents.md`](../../src/content/tutorial/part-5-custom-agents.md) |
| 6 | Agent Skills | 20 min — Reusable AI workflows | Author a `SKILL.md` per Agent Skills standard. | Slash command runs the playbook end-to-end. | [`part-6-agent-skills.md`](../../src/content/tutorial/part-6-agent-skills.md) |
| 7 | Putting It All Together | 15 min — Add a complete new feature | Combine instructions + agents + skills on a real feature. | Feature shipped; learner can articulate which lever did what. | [`part-7-putting-it-all-together.md`](../../src/content/tutorial/part-7-putting-it-all-together.md) |
| 8 | Troubleshooting & Reference | 5 min — Quick fixes and what's next | Quick reference + bridge to Agentic / Terminal tracks. | Learner knows where to go for any problem. | [`part-8-troubleshooting-reference.md`](../../src/content/tutorial/part-8-troubleshooting-reference.md) |

## Step numbering convention

Foundation steps use **continuous numbering across parts** (Part 1 ends on
Step 7, Part 2 starts at Step 8, …). This is a deliberate signal: the project
is one continuous build, not a series of disconnected lessons. Do not reset
numbering when adding a step in the middle — renumber subsequent steps and
update [`.github/reference/step-map.md`](../../.github/reference/step-map.md).

## Example tracks

Foundation is the **only** track with example interchangeability. See:

- Data: [`src/data/exampleTracks.ts`](../../src/data/exampleTracks.ts).
- Authoring skill: [`track-generator`](../../.github/skills/track-generator/SKILL.md).
- Variables: [`.github/reference/template-variables.md`](../../.github/reference/template-variables.md).

## Editorial guardrails

- Do **not** introduce concepts before their part (e.g., no mention of skills
  before Part 6).
- Do **not** reference tools the learner has not installed in Part 0.
- Do **not** use industry-specific examples in step prose; route them through
  example tracks.
- The `:::prompt` block in every step must be runnable verbatim — verify with
  the [`tutorial-content-qa` skill](../../.github/skills/tutorial-content-qa/SKILL.md).
