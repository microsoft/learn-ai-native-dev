# Content Architecture

How a learner moves through the site and how content flows from markdown to
rendered React.

## 1. Information hierarchy

```
Path  ──►  Module  ──►  Step  ──►  Block (prose | prompt | diagram | callout)
```

| Level | Lives in | Single source of truth |
|---|---|---|
| Path | [`src/data/paths.ts`](../src/data/paths.ts) (official) or `src/content/community/<id>/path.json` | Path id, title, status, level, topics. |
| Module | First-class markdown file (one per part/module) | `id`, `number`, `title`, `subtitle` frontmatter. |
| Step | `## step: <slug>` heading inside a module file | Slug used in the URL. |
| Block | Markdown body + custom syntax | Parsed by [`StepCard`](../src/components/StepCard.tsx). |

## 2. Routes

| URL | Component | Purpose |
|---|---|---|
| `/` | [`HomePage`](../src/pages/HomePage.tsx) | Three entry points (Foundation, Examples, Catalog). |
| `/learn` | [`CatalogPage`](../src/pages/CatalogPage.tsx) | Filterable catalog of all paths. |
| `/learn/:pathId` | Path home (legacy: Foundation/Advanced/Terminal) | Path overview + module list. |
| `/learn/:pathId/:moduleId/:stepId?` | [`LessonPage`](../src/pages/LessonPage.tsx) family | Render a step. |
| `/projects` | [`ProjectsPage`](../src/pages/ProjectsPage.tsx) | Pick a Foundation project shape. Audience-filtered. `/examples` redirects here. |
| `/contribute` | [`ContributePages`](../src/pages/ContributePages.tsx) | Three contribution shapes. |

Legacy URLs (`/lesson/*`, `/advanced/*`, `/terminal/*`) **redirect** into
`/learn/:pathId/*` for back-compat. Do not introduce new top-level routes
without a plan to fold them in.

## 3. Path types

| Type | Where defined | Curated? |
|---|---|---|
| **Official** | `src/data/paths.ts` + content under `src/content/{tutorial,advanced,terminal}/` | Maintainers. |
| **Community** | `src/content/community/<id>/path.json` + adjacent markdown | Loaded via [`communityLoader.ts`](../src/data/communityLoader.ts). |

Currently three official paths: **Foundation**, **Agentic Workflows**,
**Terminal & CLI**. Per-track design docs live under [`tracks/`](tracks/).

Community contributions are *not* a separate track — they extend any of
the three official tracks (with a new example, module, or fix) or, less
commonly, ship as a standalone path. See
[`community-contributions.md`](community-contributions.md).

## 4. Markdown content shape

Every module file has YAML frontmatter:

```yaml
---
id: module-a            # URL slug for the module
number: 1               # Display order within the path
title: MCP Servers      # Heading
subtitle: 45 minutes …  # One-line context under the title
---
```

Steps are introduced with:

```markdown
## step: <slug>
### title: <Step title>
```

The `<slug>` becomes `:stepId` in the URL.

## 5. Custom markdown syntax

Beyond standard CommonMark, the parser in
[`src/components/StepCard.tsx`](../src/components/StepCard.tsx) recognizes:

| Syntax | Renders | Spec |
|---|---|---|
| `:::prompt` … `:::` | Copy-paste prompt block | [`tutorial-content.instructions.md`](../.github/instructions/tutorial-content.instructions.md) |
| `:::collapsible` … `:::` | Expandable section | [`tutorial-content.instructions.md`](../.github/instructions/tutorial-content.instructions.md) |
| `<Diagram name="…" />` | Lazy-loaded React diagram | [`diagram-scaffolder` skill](../.github/skills/diagram-scaffolder/SKILL.md) |
| `{{templateVar}}` | Replaced from project shape | [`projectShapes.ts`](../src/data/projectShapes.ts) (Foundation only) |
| Advanced `===` separator | Multi-prompt blocks | [`advanced-content.instructions.md`](../.github/instructions/advanced-content.instructions.md) |
| Terminal `===` + meta-prompt | Terminal-track shape | [`terminal-content.instructions.md`](../.github/instructions/terminal-content.instructions.md) |

When adding new syntax, update **both** the parser and the matching
instructions file. The Docs Auditor (see [`harness.md`](harness.md)) flags
drift.

## 6. Project shapes (Foundation only, today)

The Foundation path supports interchangeable **project shapes** (e.g. todo
list, expense tracker, ML lab). The learner picks one on `/projects` and the
shape's `projectName`, `requirements`, `colorCoding`, `taskExamples`, etc.
fill in template variables across every Foundation step.

- Data: [`src/data/projectShapes.ts`](../src/data/projectShapes.ts) (typed
  `ProjectShape` interface; `ExampleTrack` is a deprecated alias).
- Authoring: [`track-generator` skill](../.github/skills/track-generator/SKILL.md).
- Audience filter on `/projects` uses `ExampleAudience`, ordered by priority:
  `researcher` → `developer` → `business` → `creative`.

Agentic and Terminal paths intentionally do **not** consume project shapes
today — their content depends on specific tool surfaces. A future change
could let any path opt in; see [`philosophy.md`](philosophy.md).

## 7. Build pipeline

| Step | Tool | Notes |
|---|---|---|
| Bundle | Vite | Markdown imported as raw strings via `?raw`. |
| Type-check | `tsc --noEmit` (part of `npm run build`) | Strict mode; no `any`. |
| Lint | ESLint (`npm run lint`) | React + TS rules. |
| Deploy | GitHub Actions ([`deploy-pages.yml`](../.github/workflows/deploy-pages.yml)) | Pushes to `gh-pages` on every `main` push. |

Always run `npm run build` before declaring a content change complete.

## 8. State boundaries

- **Routing state** — React Router.
- **Async / data state** — React Query.
- **UI ephemeral state** — local `useState` / `useReducer`.
- **No global store.** If you reach for one, reconsider the design.

## 9. When to add a new module vs. a new path

| You want to add… | Use a… | Rationale |
|---|---|---|
| A topic that builds on an existing track's mental model | New module in that track | Preserves the learner's current path. |
| A topic with a different audience or tool surface | New path (likely community) | Keeps tracks coherent and short. |
| A specific industry example for Foundation | New example track | No new content needed, just template values. |

See [`lifecycle.md`](lifecycle.md) for status promotion.
