---
description: "Audit and refresh stale content (outdated tool versions, deprecated APIs, broken links)."
mode: "agent"
---

You are refreshing content flagged as stale.

Use the [`@content-health`](.github/agents/content-health.agent.md) agent for the audit and [`@researcher`](.github/agents/researcher.agent.md) for evidence-gathering. Hand off to [`@author`](.github/agents/author.agent.md) to apply the edits.

**Process:**

1. **Parse the issue body first.** If a `report-stale-content.yml` issue body is pasted (or referenced), extract `File or URL`, `What is outdated`, and `Evidence` directly. Only ask follow-ups for missing fields.
2. Use `version-checker` and live web sources to confirm what the *current* state is. Cite sources.
3. Propose the refreshed wording, then apply it via `@author`.
4. If the change cascades (e.g., a CLI flag was renamed, affecting many files), grep for all occurrences across `src/content/**/*.md` and update them together — this is the one case where multi-file edits in this prompt are expected.
5. Run `npm run build` and confirm it succeeds.
6. In the PR description, link the evidence used.

**Hard rules:**

- Do NOT update without evidence. If you cannot find a current source, comment back asking the reporter for a link.
- Preserve pedagogy: the lesson's *teaching* should stay the same; only the technical specifics change.
