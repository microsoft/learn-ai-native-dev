# Tutorial Authoring Guide

Quick reference for creating and maintaining AI Native tutorials.

> Public contributors: start at [CONTRIBUTING.md](CONTRIBUTING.md). This file is the deeper agent/skill cheat-sheet for maintainers.

## The trimmed harness (May 2026)

The harness was deliberately reduced: 11 agents → 5, 11 skills → 7, 7 prompts → 4. The five-persona "studio team" (ideator, curriculum-designer, technical-writer, developer, ux-designer) and the lightweight `editor` were folded into a single [`@author`](agents/author.agent.md) agent that loads the right skill on demand. Standalone single-paragraph skills (`prompt-writer`, `content-rendering-debugger`, `accessibility-checker`) were folded into the relevant instruction file or the [`tutorial-content-qa`](skills/tutorial-content-qa/SKILL.md) skill. The `harness-doc-sync` skill duplicated [`docs-sync`](skills/docs-sync/SKILL.md) and was removed.

## Contribution Shape → Routing

The four contribution shapes from [CONTRIBUTING.md](CONTRIBUTING.md) map directly to agents and slash-prompts. Each prompt now parses the matching issue body automatically — no double-entry.

| Shape | Issue template | Slash-prompt | Driving agent / skill |
|---|---|---|---|
| 📦 Add an example | [`add-example.yml`](ISSUE_TEMPLATE/add-example.yml) | `/add-example` | [`@author`](agents/author.agent.md) + [`track-generator`](skills/track-generator/SKILL.md) |
| ✏️ Improve content | [`improve-content.yml`](ISSUE_TEMPLATE/improve-content.yml) | `/fix-content` | [`@author`](agents/author.agent.md) (quick-edit mode) |
| 🔄 Refresh stale content | [`report-stale-content.yml`](ISSUE_TEMPLATE/report-stale-content.yml) | `/refresh-content` | [`@content-health`](agents/content-health.agent.md) → [`@researcher`](agents/researcher.agent.md) → [`@author`](agents/author.agent.md) |
| 📚 New module / new community path | [`propose-topic.yml`](ISSUE_TEMPLATE/propose-topic.yml) | `/propose-topic` | [`@author`](agents/author.agent.md) → [`@reviewer`](agents/reviewer.agent.md) |

Pre-ship gate (Medium/Larger only): [`@reviewer`](agents/reviewer.agent.md). Docs drift gate: [`@docs-auditor`](agents/docs-auditor.agent.md).

## When to Use What?

```
┌─────────────────────────────────────────────────────────────────┐
│                         DECISION TREE                           │
├─────────────────────────────────────────────────────────────────┤
│  What do you want to do?                                        │
│  │                                                              │
│  ├─► "Create or edit content" ─────► @author                    │
│  │   (brainstorm, draft, edit,       (loads the right skill)    │
│  │    code, diagram, typo)                                      │
│  │                                                              │
│  ├─► "Validate currency" ──────────► @researcher                │
│  │   (versions, APIs, deprecations)                             │
│  │                                                              │
│  ├─► "Audit content health" ───────► @content-health            │
│  │   (staleness, gaps, links)                                   │
│  │                                                              │
│  ├─► "Pre-ship review" ────────────► @reviewer                  │
│  │   (build + a11y + version + QA)                              │
│  │                                                              │
│  └─► "Sync docs/ with code" ───────► @docs-auditor              │
└─────────────────────────────────────────────────────────────────┘
```

That is the entire roster. Five agents.

## Skills (7)

Skills are model-invoked playbooks. Agents load them automatically when the request matches.

| Skill | Use For |
|-------|---------|
| `tutorial-content-qa` | Run QA across content (steps, prompts, formatting, **and a11y**) |
| `track-generator` | Add a new example track (Foundation only) |
| `content-track-scaffolder` | Scaffold a brand-new learning path |
| `diagram-scaffolder` | Create a new diagram component end-to-end |
| `exercise-scaffolder` | Generate exercise templates and solutions |
| `version-checker` | Validate tool / API / CLI versions |
| `docs-sync` | Diff `src/` and `.github/` against `docs/` |

Prompt-block formatting rules now live inline in [`tutorial-content.instructions.md`](instructions/tutorial-content.instructions.md). Rendering-pipeline debugging is documented in [`content-architecture.md`](../docs/content-architecture.md) §5 and is no longer a separate skill.

## Common Workflows

### Adding a New Module
```
@author     → drafts module markdown + scaffolds wiring
@researcher → validates versions in the draft
@reviewer   → pre-ship pass
```

### Updating Outdated Content
```
@content-health → identify stale items
@researcher     → fetch current state
@author         → apply the edits
```

### Quick Fix
```
@author → typo / callout / version bump (quick-edit mode)
```

### Pre-Ship
One command — `@reviewer` runs the full suite autonomously:
```
@reviewer Pre-ship review of the [track] track
```

### Keeping docs/ in Sync
After any structural change (new path, module, diagram, custom syntax, or any file under `.github/{instructions,prompts,skills,agents,hooks}/`), run:
```
@docs-auditor
```
It produces a drift report against [`docs/`](../docs). Apply with `@author`.

## Automation surfaces

In addition to the **primary** VS Code + Copilot Chat flow, the harness runs automatically in CI via the [Copilot SDK](https://github.com/github/copilot-sdk):

| Trigger | Workflow | What it does |
|---|---|---|
| `pull_request` | [`agent-pr-review.yml`](workflows/agent-pr-review.yml) | `@reviewer` + `@docs-auditor` — single structured PR comment + Checks |
| Weekly | [`content-health-cron.yml`](workflows/content-health-cron.yml) | `@content-health` — opens `agent-refresh` PRs with verified version bumps |
| Monthly | [`diagram-drift-check.yml`](workflows/diagram-drift-check.yml) | `@docs-auditor` — issues for diagrams that no longer match the markdown |
| Monthly | [`instructions-linter.yml`](workflows/instructions-linter.yml) | `@reviewer` — grades whether recent diffs followed each `*.instructions.md` |
| Quarterly | [`curriculum-gap-finder.yml`](workflows/curriculum-gap-finder.yml) | `@researcher` — files issues for new tool features we don't cover yet |
| `workflow_dispatch` | [`translation-pipeline.yml`](workflows/translation-pipeline.yml) | `@author` — translate a track to a locale; `@reviewer` validates structure |
| Maintainer CLI | [`scripts/promotion-readiness.mjs`](../scripts/promotion-readiness.mjs) | Score + flip `community → official` |

| File Locations |
|---|
| Agent definitions — `.github/agents/` |
| Skills — `.github/skills/` |
| Slash-prompts — `.github/prompts/` |
| Issue templates — `.github/ISSUE_TEMPLATE/` |
| Hooks — `.github/hooks/` |
| Workflows (agent automations) — `.github/workflows/` |
| Workflow scripts — `.github/workflows/scripts/` |
| Maintainer scripts — `scripts/` |
| Path registry (official paths) — `src/data/paths.ts` |
| Community paths — `src/content/community/<id>/path.json` + markdown |
| Tutorial markdown — Foundation — `src/content/tutorial/` |
| Tutorial markdown — Agentic — `src/content/advanced/` |
| Tutorial markdown — Terminal — `src/content/terminal/` |
