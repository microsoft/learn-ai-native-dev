---
name: docs-sync
description: Diff src/ and .github/ against docs/ to detect drift between code and design spec. Use when auditing the docs folder, after merging structural changes (adding paths/modules/diagrams/syntax/agents/skills/hooks), or before a release. Use for questions like "is docs in sync?", "what changed since the last docs update?", "find docs drift". Produces a structured report with proposed edits — does not modify docs/ directly.
---

# Docs Sync (skill)

This skill is the diffing playbook the
[`@docs-auditor`](../../agents/docs-auditor.agent.md) agent runs. You can also
invoke it directly with `/docs-sync`.

It produces a **drift report**. It does not write to `docs/`. Apply changes by
delegating to `@author`.

## Inputs

- `$ARGUMENTS` (optional) — restrict the audit to one of:
  `paths` | `tracks` | `components` | `syntax` | `harness` | `routes` | `lifecycle` | `links` | `all`. Default: `all`.

## Procedure

### Step 1 — Snapshot the code

Collect, in this order:

1. `src/data/paths.ts` exports.
2. All `path.json` files under `src/content/community/*/`.
3. Frontmatter (`id`, `number`, `title`, `subtitle`) of every markdown file
   under `src/content/{tutorial,advanced,terminal}/`.
4. The list of files under `src/components/diagrams/` (excluding `index.ts`).
5. The list of files under `.github/{instructions,prompts,skills,agents,hooks}/`.
6. The route table from `src/App.tsx`.

### Step 2 — Snapshot the docs

Collect:

1. The track tables in `docs/tracks/{foundation,agentic,terminal}.md` and
   the contribution-shape table in `docs/community-contributions.md`.
2. The component/diagram references in `docs/components.md`.
3. The custom-syntax table in `docs/content-architecture.md` (§5) and the
   route table (§2).
4. The harness inventory tables in `docs/harness.md`.
5. The status table in `docs/lifecycle.md`.
6. All relative links in every `docs/*.md` file.

### Step 3 — Diff

Compare each pair from Steps 1 and 2:

- **Code item missing from docs** → `add to docs`.
- **Doc item missing from code** → `remove from docs` (only if file is gone)
  or `flag for human review` (if file might be renamed).
- **Mismatched fields** (title, subtitle, status, applyTo, …) → `update doc`.
- **Broken relative link** → `fix link`.

### Step 4 — Group findings

Group by target file in `docs/`. Each group becomes one section in the
report.

### Step 5 — Emit report

Use the template at `templates/report.md` (see below).

## Report template

```markdown
# Docs Sync — <ISO date>

Scope: `$ARGUMENTS`
Workspace: <git short SHA>

## Summary
- Files needing updates: N
- New items to document: N
- Items to remove: N
- Broken links: N

## docs/tracks/foundation.md
- ⚠️ Subtitle drift on Part 4: docs say "Different rules per folder", code says "Different rules for different folders".
- Proposed: update row.

## docs/components.md
- ❌ Diagram `NewFlowDiagram.tsx` exists in `src/components/diagrams/` but is not referenced.
- Proposed: add row to "Diagrams" section.

…

## Suggested next step
Run `@author` and paste this report.
```

## Boundaries

- Do not write to `docs/`. Output only.
- Do not change content lifecycle statuses or example tracks.
- Do not run `npm run build` — that is the `@reviewer`'s job. You may run
  it read-only if a link looks ambiguous.
- Treat `.github/CONTENT_LIFECYCLE.md` as the source of truth when it
  conflicts with `docs/lifecycle.md`.

## Related

- Agent: [`docs-auditor`](../../agents/docs-auditor.agent.md).
- Spec: [`docs/harness.md`](../../../docs/harness.md#docs-auditor).
