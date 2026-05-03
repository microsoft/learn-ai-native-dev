# Community Contributions

Community contributions are **not** a track. They are a contribution
*surface* that can land inside any existing track — or, in rare cases, as a
standalone path.

This doc names the shapes a community contribution can take, where each
shape lives in the codebase, and what the editorial floor is for each.

## Where community contributions can land

| Shape | Lands in | Source location | Example |
|---|---|---|---|
| New **project shape** | Foundation | [`src/data/projectShapes.ts`](../src/data/projectShapes.ts) | "Healthcare scheduling app" project for Foundation |
| New **module** in an official track | Foundation / Agentic / Terminal | `src/content/{tutorial,advanced,terminal}/*.md` + entry in [`src/data/paths.ts`](../src/data/paths.ts) module list | "Module I: Evals" added to Agentic |
| **Improvement** to existing content | Any track | The relevant module markdown file | Fix typos, clarify a step, refresh a tool version |
| New **diagram** for an existing module | Any track | [`src/components/diagrams/`](../src/components/diagrams) + reference in StepCard | New visual for Module C |
| Standalone **community path** | A new path with `status: community` | [`src/content/community/<id>/`](../src/content/community) + `path.json` | An entirely new learning path on a niche topic |

The first four shapes are the common case. The fifth — a standalone path —
exists only because some topics don't fit the three official tracks; it is
*not* the default landing spot for community work.

## Per-shape contracts

### 1. New example track (Foundation only)

- Add an entry to [`src/data/projectShapes.ts`](../src/data/projectShapes.ts)
  matching the `ProjectShape` interface.
- Use the [`track-generator`](../.github/skills/track-generator/SKILL.md) skill
  or the `/add-example` prompt to scaffold consistently.
- Foundation is the only track that supports examples (`supportsExamples: true`
  in `paths.ts`).

### 2. New module in an existing track

- Add a markdown file to the right `src/content/<track>/` folder.
- Follow that track's instructions file:
  - Foundation → [`tutorial-content.instructions.md`](../.github/instructions/tutorial-content.instructions.md)
  - Agentic → [`advanced-content.instructions.md`](../.github/instructions/advanced-content.instructions.md)
  - Terminal → [`terminal-content.instructions.md`](../.github/instructions/terminal-content.instructions.md)
- Add a row to the corresponding track doc in [`tracks/`](tracks).
- Run `@docs-auditor` to confirm the docs/code pair is consistent.

### 3. Content improvements

- Use [`@author`](../.github/agents/author.agent.md) for typos / phrasing /
  small reformatting.
- Use [`@content-health`](../.github/agents/content-health.agent.md) for
  staleness or version bumps.

### 4. New diagram

- Use the [`diagram-scaffolder`](../.github/skills/diagram-scaffolder/SKILL.md)
  skill. It produces the React component, registers the barrel export, and
  wires StepCard's `<Diagram name="..." />` parser.

### 5. Standalone community path

A standalone path is appropriate **only** when the content does not fit
within Foundation, Agentic, or Terminal.

```
src/content/community/<id>/
├── path.json                # Manifest matching LearningPath
├── module-1-intro.md
├── module-2-deep-dive.md
└── …
```

`path.json` shape:

```jsonc
{
  "id": "kebab-case-id",          // matches folder name
  "title": "…",
  "tagline": "…",
  "level": "beginner|intermediate|advanced",
  "status": "community",
  "supportsExamples": false,
  "estimatedMinutes": 90,
  "topics": ["..."],
  "iconName": "compass",
  "contributedBy": "github-handle"
}
```

The loader is
[`src/data/communityLoader.ts`](../src/data/communityLoader.ts) — adding a
folder is enough; no TypeScript edit required.

## Editorial floor (all shapes)

Every community contribution must:

- Pass `npm run build` cleanly.
- Pass the
  [`tutorial-content-qa` skill](../.github/skills/tutorial-content-qa/SKILL.md).
- Use only the markdown syntax documented in
  [`content-architecture.md`](content-architecture.md) §5.
- Credit the author in [`CONTRIBUTORS.md`](../CONTRIBUTORS.md), and — for
  standalone paths — set `contributedBy`.

The [`@reviewer` agent](../.github/agents/reviewer.agent.md) enforces this on
every PR. The floor is intentionally *lower* than the bar for promotion to
`official`.

## Lifecycle and promotion

- Default landing status for any community contribution: `community`
  (or `experimental` if it is exploratory).
- See [`lifecycle.md`](lifecycle.md) for promotion rules.
- The authoritative status policy lives in
  [`.github/CONTENT_LIFECYCLE.md`](../.github/CONTENT_LIFECYCLE.md).

## Related

- Issue templates: [`.github/ISSUE_TEMPLATE/`](../.github/ISSUE_TEMPLATE)
- Slash commands: `/add-example`, `/fix-content`, `/refresh-content`,
  `/propose-topic` — see
  [`.github/AUTHORING.md`](../.github/AUTHORING.md).
- Agents: [`@author`](../.github/agents/author.agent.md),
  [`@content-health`](../.github/agents/content-health.agent.md),
  [`@researcher`](../.github/agents/researcher.agent.md),
  [`@reviewer`](../.github/agents/reviewer.agent.md).
