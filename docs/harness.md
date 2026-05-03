# The Build Harness

> **Scope.** This document explains the AI customization layer that contributors
> and maintainers use to *build* the website. The website itself
> ([`src/`](../src)) and its design ([this folder](.)) are unaffected by it.

The harness lives in [`.github/`](../.github) and follows the conventions
defined by GitHub Copilot for VS Code and the Anthropic *Agent Skills* open
standard, so the same files work in both Copilot Chat and Claude Code.

Authoritative sources used to define each surface:

- GitHub Copilot — [Adding repository custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- VS Code — [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- VS Code — [Customize AI in VS Code (overview)](https://code.visualstudio.com/docs/copilot/copilot-customization)
- Anthropic — [Extend Claude with skills](https://code.claude.com/docs/en/skills) (the Agent Skills standard)
- Anthropic — [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- Anthropic — [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic — [Memory / `CLAUDE.md`](https://code.claude.com/docs/en/memory)

## The five customization surfaces

| Surface | What it is | File pattern | Lives in |
|---|---|---|---|
| **Repository instructions** | Always-on guidance for *any* request in the repo. | `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md` | [`.github/copilot-instructions.md`](../.github/copilot-instructions.md), [`AGENTS.md`](../AGENTS.md) |
| **Path-specific instructions** | Conditional rules applied when the agent edits files matching a glob. | `*.instructions.md` with `applyTo:` frontmatter | [`.github/instructions/`](../.github/instructions) |
| **Prompt files** (slash commands) | Reusable, parameterized prompts the user invokes. | `*.prompt.md` | [`.github/prompts/`](../.github/prompts) |
| **Skills** | Self-contained, model-invoked playbooks (Agent Skills standard). | `<name>/SKILL.md` directories | [`.github/skills/`](../.github/skills) |
| **Custom agents (subagents)** | Specialized personas with their own system prompt, tools, and model. | `*.agent.md` | [`.github/agents/`](../.github/agents) |
| **Hooks** | Shell commands that run at lifecycle events (e.g., before a tool call). | JSON in settings | [`.github/hooks/`](../.github/hooks) |

### Definitions you can rely on

**Repository instructions** apply to *every* chat request in the workspace.
Copilot picks up `.github/copilot-instructions.md` automatically; VS Code and
many AI tools also read `AGENTS.md` and `CLAUDE.md`. Keep them short
(< 2 pages) and project-specific.

**Path-specific instructions** are markdown files ending in `.instructions.md`
inside `.github/instructions/`. The YAML frontmatter must declare an
`applyTo:` glob:

```yaml
---
applyTo: "src/components/**,src/pages/**"
---
```

If `applyTo` is omitted the instructions are not applied automatically.

**Prompt files** are reusable prompts the user *triggers* (e.g.
`/refresh-content`). They are not auto-applied.

**Skills** follow the [Agent Skills](https://agentskills.io/) open standard.
A skill is a directory containing a `SKILL.md` whose YAML frontmatter declares
at minimum a `description`. The model decides when to load the skill based on
that description, then ingests the markdown body. Skills can include
supporting files (templates, scripts) referenced from the body.

**Custom agents (subagents)** define a persona: system prompt, allowed tools,
preferred model, optional hooks. In Claude Code these are markdown files with
YAML frontmatter; VS Code's *custom agents* feature uses `*.agent.md`. The
delegating agent reads the `description` field to decide when to hand off.

**Hooks** are user-defined commands that run automatically at points in the
agent lifecycle (`PreToolUse`, `PostToolUse`, `SessionStart`, `Stop`, …).
They can block, modify, or annotate tool calls. JSON shape per Anthropic's
[hooks reference](https://code.claude.com/docs/en/hooks). VS Code is rolling
out an equivalent surface; we keep our hook configs portable.

## What we currently have

### Repository instructions

| File | Purpose |
|---|---|
| [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) | Code-generation rules + security floor for the whole repo. |
| [`AGENTS.md`](../AGENTS.md) | Project overview, tech stack, structure, design qualities, dev commands. |

### Path-specific instructions

| File | `applyTo` |
|---|---|
| [`tutorial-content.instructions.md`](../.github/instructions/tutorial-content.instructions.md) | `src/content/**/*.md` |
| [`advanced-content.instructions.md`](../.github/instructions/advanced-content.instructions.md) | `src/content/advanced/**` |
| [`terminal-content.instructions.md`](../.github/instructions/terminal-content.instructions.md) | `src/content/terminal/**` |
| [`react-components.instructions.md`](../.github/instructions/react-components.instructions.md) | `src/components/**`, `src/pages/**`, `src/hooks/**` |
| [`data-content.instructions.md`](../.github/instructions/data-content.instructions.md) | `src/data/**` |
| [`docs.instructions.md`](../.github/instructions/docs.instructions.md) | `docs/**` |

### Prompt files

| Slash command | File |
|---|---|
| `/add-example` | [`add-example.prompt.md`](../.github/prompts/add-example.prompt.md) |
| `/fix-content` | [`fix-content.prompt.md`](../.github/prompts/fix-content.prompt.md) |
| `/propose-topic` | [`propose-topic.prompt.md`](../.github/prompts/propose-topic.prompt.md) |
| `/refresh-content` | [`refresh-content.prompt.md`](../.github/prompts/refresh-content.prompt.md) |

All four prompts now parse the matching issue body automatically when the contributor pastes one in — no double-entry between the GitHub form and the prompt.

The legacy `/new-track`, `/health-audit`, and `/pre-ship` prompts were removed: they duplicated the four shapes above plus the `@reviewer` and `@content-health` agent invocations.

### Skills

Each skill is a directory with `SKILL.md`:

| Skill | Use for |
|---|---|
| `tutorial-content-qa` | Running QA across content (steps, prompts, formatting, **and a11y**). |
| `track-generator` | Adding a new example track. |
| `version-checker` | Validating tool versions. |
| `content-track-scaffolder` | Scaffolding a new path. |
| `diagram-scaffolder` | Creating a diagram component end-to-end. |
| `exercise-scaffolder` | Generating an exercise template. |
| `docs-sync` | Diffing `src/` and `.github/` against `docs/` and proposing updates. |

The earlier `prompt-writer`, `content-rendering-debugger`, `accessibility-checker`, and `harness-doc-sync` skills were retired. Their guidance lives inline (in `tutorial-content.instructions.md`, `content-architecture.md` §5, the `tutorial-content-qa` skill, and the `docs-sync` skill respectively).

### Agents

| Agent | Engages when |
|---|---|
| `author` | Any content creation or edit — ideation, curriculum, drafting, code, diagrams, quick fixes. Replaces the former `ideator`, `curriculum-designer`, `technical-writer`, `developer`, `ux-designer`, `editor`, and `orchestrator` agents. |
| `researcher` | Tool currency, API changes. |
| `content-health` | Audit cadence; staleness reports. |
| `reviewer` | Pre-ship gate. |
| `docs-auditor` | Keep `docs/` in sync with code. |

Five agents — down from eleven. The five-persona "studio team" was theatrical; collapsing them into `@author` matches how the work actually flows and removes the "which `@thing` do I call?" tax for contributors.

### Hooks

JSON configs in [`.github/hooks/`](../.github/hooks):

| File | Effect |
|---|---|
| `gate-deployments.json` | Block deploy actions without passing build. |
| `protect-ui-primitives.json` | Block edits under `src/components/ui/` outside of a shadcn-upgrade PR. |
| `validate-markdown.json` | Run a markdown sanity script before write. |

Scripts referenced by hooks live in `.github/hooks/scripts/`.

### Automation surfaces (Copilot SDK)

The **primary** contribution surface is **VS Code + GitHub Copilot Chat** running the slash-prompts in `.github/prompts/`. The contributor's own Copilot subscription pays for the inference, and the experience is identical to any normal repo edit.

In parallel, the same harness is embedded in CI via [`@github/copilot-sdk`](https://github.com/github/copilot-sdk) for bounded, maintainer-paid maintenance jobs. There is no second source of truth — every workflow below reads the same `.github/agents/`, `.github/skills/`, and `.github/prompts/` files.

| Surface | Lives in | Trigger | What it does |
|---|---|---|---|
| **PR-bot** | [`agent-pr-review.yml`](../.github/workflows/agent-pr-review.yml) | `pull_request` to `main` | Runs `@reviewer` + `@docs-auditor`; posts a single structured comment with verdict and writes individual GitHub Checks. |
| **Refresh cron** | [`content-health-cron.yml`](../.github/workflows/content-health-cron.yml) | Weekly + `workflow_dispatch` | Runs `@content-health`; opens an auto-PR labelled `agent-refresh` with version bumps verified against primary sources. |
| **Diagram drift check** | [`diagram-drift-check.yml`](../.github/workflows/diagram-drift-check.yml) | Monthly + `workflow_dispatch` | Asks `@docs-auditor` whether each `src/components/diagrams/*.tsx` still matches the markdown that references it. Files an issue per drifted diagram. |
| **Translation pipeline** | [`translation-pipeline.yml`](../.github/workflows/translation-pipeline.yml) | `workflow_dispatch` (track + locale inputs) | Runs `@author` to translate one track to the chosen locale, then `@reviewer` to confirm step IDs / prompt blocks / frontmatter survived. Opens an `i18n` PR. |
| **Curriculum gap finder** | [`curriculum-gap-finder.yml`](../.github/workflows/curriculum-gap-finder.yml) | Quarterly + `workflow_dispatch` | `@researcher` scans changelogs for the tools we teach; files one issue per uncovered topic with a draft outline. |
| **Instructions linter** | [`instructions-linter.yml`](../.github/workflows/instructions-linter.yml) | Monthly + `workflow_dispatch` | For each `*.instructions.md`, samples recent merge commits matching its `applyTo` glob and grades whether they followed the rules. Recommends keep / rewrite / retire. |
| **Promotion readiness** | [`scripts/promotion-readiness.mjs`](../scripts/promotion-readiness.mjs) | Maintainer-only CLI | Runs the same pre-ship checks `@reviewer` runs and prepares the one-field `community → official` flip PR. |

All workflow scripts share a tiny [`scripts/sdk.mjs`](../.github/workflows/scripts/sdk.mjs) helper so the SDK call site is pinned in one file.

## Choosing the right surface

| You need to… | Use… |
|---|---|
| State a project-wide rule that should apply to every change. | Repository instructions. |
| Apply a rule only to a subset of files. | Path-specific instruction with `applyTo`. |
| Capture a multi-step procedure the user *triggers*. | Prompt file. |
| Capture a multi-step procedure the *model* decides to invoke. | Skill. |
| Define a persona with its own tools and system prompt. | Custom agent. |
| Enforce a policy deterministically at a tool boundary. | Hook. |

Anti-patterns we have learned the hard way:

- **A skill where a prompt file would do.** If the user always types
  `/x`, ship a prompt file.
- **A 600-line repository instruction.** Move conditional rules into
  `*.instructions.md` with `applyTo:`.
- **Inline rules duplicated across files.** Link, don't copy.
- **Editing shadcn primitives without a dedicated PR.** That's what the
  `protect-ui-primitives` hook is for.

## Docs Auditor

The [`docs-auditor` agent](../.github/agents/docs-auditor.agent.md) and the
[`docs-sync` skill](../.github/skills/docs-sync/SKILL.md) keep this `docs/`
folder honest as the codebase evolves.

What it checks:

1. Every file under `src/components/diagrams/` is referenced in
   [`components.md`](components.md) (or explicitly waived).
2. The list of **official** paths in [`src/data/paths.ts`](../src/data/paths.ts)
   matches the tracks documented in [`tracks/`](tracks). Community paths
   live under `src/content/community/*/path.json` and are validated against
   [`community-contributions.md`](community-contributions.md) instead.
3. Every module markdown file has a corresponding entry in its track doc
   (Foundation/Agentic/Terminal).
4. Every custom syntax handled by `StepCard` is documented in
   [`content-architecture.md`](content-architecture.md) §5.
5. Every entry in [`paths.ts`](../src/data/paths.ts), instruction file,
   prompt file, skill, agent, and hook listed above actually exists on
   disk; orphans get flagged.
6. No file under `docs/` references a non-existent file in the workspace.

When it finds drift, it opens a focused PR with a checklist and tagged
sections. Maintainers review and merge.

Run it with:

```
@docs-auditor
```

## Distributing the harness as a plugin (future)

Anthropic's Agent Skills standard supports packaging skills, agents, and hooks
as a plugin (see [Anthropic plugins](https://code.claude.com/docs/en/plugins)).
We currently ship the harness as in-repo files because they are repo-specific.
If we extract a shared part (e.g., a generic "tutorial-content-qa" skill), the
right move is a separate plugin repo, not a copy in `node_modules`.
