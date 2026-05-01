# Tutorial Authoring Guide

Quick reference for creating and maintaining AI Native tutorials.

> Public contributors: start at [CONTRIBUTING.md](CONTRIBUTING.md). This file is the deeper agent/skill cheat-sheet for maintainers.

## Contribution Shape → Routing

The three contribution shapes from [CONTRIBUTING.md](CONTRIBUTING.md) map directly to agents and slash-prompts:

| Shape | Issue template | Slash-prompt | Driving agent / skill |
|---|---|---|---|
| 📦 Add an example | [`add-example.yml`](ISSUE_TEMPLATE/add-example.yml) | `/add-example` | [`track-generator`](skills/track-generator/SKILL.md) |
| ✏️ Improve content | [`improve-content.yml`](ISSUE_TEMPLATE/improve-content.yml) | `/fix-content` | [`@editor`](agents/editor.agent.md) |
| 🔄 Refresh stale content | [`report-stale-content.yml`](ISSUE_TEMPLATE/report-stale-content.yml) | `/refresh-content` | [`@content-health`](agents/content-health.agent.md) → [`@researcher`](agents/researcher.agent.md) |
| 📚 New module | [`propose-topic.yml`](ISSUE_TEMPLATE/propose-topic.yml) | `/propose-topic` | [`@orchestrator`](agents/orchestrator.agent.md) |
| 📚 New community path | [`propose-topic.yml`](ISSUE_TEMPLATE/propose-topic.yml) | `/propose-topic` | [`@curriculum-designer`](agents/curriculum-designer.agent.md) → [`@orchestrator`](agents/orchestrator.agent.md) |

Pre-ship gate (Medium/Larger only): [`@reviewer`](agents/reviewer.agent.md).

## When to Use What?

```
┌─────────────────────────────────────────────────────────────────┐
│                         DECISION TREE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  What do you want to do?                                        │
│  │                                                              │
│  ├─► "Brainstorm ideas" ──────────► @ideator                    │
│  │                                                              │
│  ├─► "Create new content" ────────► @orchestrator               │
│  │   (module, part, section)        (coordinates full workflow) │
│  │                                                              │
│  ├─► "Quick edit" ────────────────► @editor                     │
│  │   (typo, callout, version)       (fast, no orchestration)    │
│  │                                                              │
│  ├─► "Check content health" ──────► @content-health             │
│  │   (audit, staleness, gaps)                                   │
│  │                                                              │
│  └─► "Specific micro-task" ───────► Use a Skill (see below)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Skills vs Agents

### Use a **Skill** when...

You're doing a specific, repeatable micro-task with clear input/output:

| Skill | Use For |
|-------|---------|
| `prompt-writer` | Writing a single :::prompt block |
| `exercise-scaffolder` | Generating one exercise template |
| `tutorial-content-qa` | Running QA checklist (steps, prompts, formatting) |
| `track-generator` | Adding a new example track |
| `version-checker` | Validating tool versions |
| `accessibility-checker` | Reviewing readability |
| `content-rendering-debugger` | Debugging rendering issues |
| `content-track-scaffolder` | Scaffolding a new learning path |
| `diagram-scaffolder` | Creating diagram components |

### Use an **Agent** when...

You need contextual reasoning, multi-step work, or cross-file coordination:

| Agent | Use For |
|-------|---------|
| `orchestrator` | Starting new modules, coordinating work |
| `ideator` | Brainstorming, exploring ideas |
| `curriculum-designer` | Structuring learning paths |
| `technical-writer` | Drafting tutorial content |
| `developer` | Building code examples & exercises |
| `ux-designer` | Creating diagrams & visuals |
| `researcher` | Validating technical accuracy |
| `reviewer` | QA before publishing |
| `editor` | Quick, lightweight edits |
| `content-health` | Auditing content for issues |

## Common Workflows

### Adding a New Part

```
@ideator      → brainstorm topic angles
@curriculum   → structure learning objectives  
@researcher   → validate tool versions
@writer       → draft content
@developer    → create exercises
@reviewer     → final QA
```

### Updating Outdated Content

```
@content-health → identify what's stale
@researcher     → find current versions
@editor         → apply fixes
@reviewer       → verify updates
```

### Creating an Exercise

```
@developer → implement exercise + solution
@reviewer  → test that it works
```

### Quick Fixes

```
@editor → fix typo, add callout, update version
```

### Pre-Ship (New Track or Major Content)

One command — `@reviewer` runs all checks autonomously:

```
@reviewer Pre-ship review of the [track] track
```

The reviewer executes: content structure QA → track wiring → build → accessibility → version currency → content review → structured report with verdict.

## File Locations

| Content Type | Location |
|--------------|----------|
| Agent definitions | `.github/agents/` |
| Skills | `.github/skills/` |
| Slash-prompts | `.github/prompts/` |
| Issue templates | `.github/ISSUE_TEMPLATE/` |
| Path registry (official paths) | `src/data/paths.ts` |
| Community paths | `src/content/community/<id>/path.json` + markdown |
| Tutorial markdown — Foundation | `src/content/tutorial/` |
| Tutorial markdown — Agentic | `src/content/advanced/` |
| Tutorial markdown — Terminal | `src/content/terminal/` |
| React components | `src/components/` |
| Example tracks | `src/data/exampleTracks.ts` |
| Lifecycle / status policy | `.github/CONTENT_LIFECYCLE.md` |
