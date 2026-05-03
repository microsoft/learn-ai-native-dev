---
description: "Apply a scoped fix to existing tutorial content (typo, clarification, version bump, diagram add)."
mode: "agent"
---

You are helping a contributor improve existing tutorial content.

Use the [`@author`](.github/agents/author.agent.md) agent in **quick-edit mode**. The change is **surgical** — touch only the file(s) explicitly named.

**Process:**

1. **Parse the issue body first.** If the user pasted (or linked) an `improve-content.yml` issue body, extract `File path`, `Problem`, and `Suggested fix` directly. Only ask follow-ups for missing fields. This eliminates double-entry between the issue form and this prompt.
2. Read the file to understand current context.
3. Apply the minimum edit that fixes the issue. Preserve voice, formatting, and prompt-block conventions (see [tutorial-content.instructions.md](.github/instructions/tutorial-content.instructions.md)).
4. Run `npm run build` and confirm it succeeds.
5. If the change touches more than ~20 lines or affects pedagogy, suggest the user re-route to `/propose-topic` instead.

**Hard rules:**

- Do NOT refactor or "improve" code that is already correct.
- Do NOT add new sections, callouts, or diagrams unless explicitly requested.
- Do NOT change frontmatter or step ids.
- For typos and grammar, prefer matching the surrounding voice over "correcting" intentional informal style.

**Tool-version updates:** if the change is bumping a tool version, also run [`version-checker`](.github/skills/version-checker/SKILL.md) to catch related references in other files.
