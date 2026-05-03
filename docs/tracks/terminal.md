# Track: Terminal & CLI

The "no IDE required" track. Teaches AI-Native development from a terminal —
Claude Code, Copilot CLI, build pipelines.

- **Path id:** `terminal`
- **Status:** `official`
- **Audience:** advanced
- **Estimated time:** ~120 minutes (real total ≈ 345 min if all modules done end-to-end)
- **Supports example tracks:** ❌
- **Source:** [`src/content/terminal/`](../../src/content/terminal)

## Design intent

1. **Terminal is the platform.** Every step happens in a shell. Reaching for
   an IDE is a learning failure; if the lesson cannot be expressed in a
   terminal, it does not belong here.
2. **Two CLIs side-by-side.** Show **Claude Code** and **Copilot CLI** for the
   same task wherever both apply, with a comparison table.
3. **Meta-prompts and `===` separators.** Terminal modules sometimes describe
   the prompt the learner should ask the agent to *generate*, not just the
   prompt itself. See [`terminal-content.instructions.md`](../../.github/instructions/terminal-content.instructions.md).
4. **Composable, recoverable.** Teach pipe / xargs / tmux / undo patterns. A
   learner must always know how to back out.
5. **CI-ready.** By Module H the learner has a self-healing pipeline they
   could drop into GitHub Actions on Monday.

## Per-module design

| # | Module | Subtitle | Primary objective | Source |
|---|---|---|---|---|
| F | Terminal AI Fundamentals | 90 min — Claude Code, Copilot CLI, Shell Composition, Recovery | Install both CLIs, run same task in each, learn pipe/recovery patterns. | [`module-f-terminal-ai.md`](../../src/content/terminal/module-f-terminal-ai.md) |
| G | Build Your Own Coding Agent | 180 min — Spec, build, test, use, verify | End-to-end: spec → implement → test → run an agent against your repo. | [`module-g-build-agent.md`](../../src/content/terminal/module-g-build-agent.md) |
| H | Autonomous AI Pipelines | 75 min — Spec, deploy & verify self-healing CI | Wire a CI pipeline where AI fixes its own failures within policy. | [`module-h-pipelines.md`](../../src/content/terminal/module-h-pipelines.md) |

## Step numbering convention

Like Agentic, Terminal uses letter-prefixed steps (`F1`, `F2`, … `G1`, …).
Module G's spec-driven cycle uses additional sub-numbering (`G1.1`, `G1.2`,
…); see [`SpecDrivenCycleDiagram`](../../src/components/diagrams/SpecDrivenCycleDiagram.tsx).

## Editorial guardrails

- Do not assume a specific shell. Bash, zsh, fish, PowerShell — examples that
  differ across shells must show both or use POSIX-portable syntax.
- Do not assume macOS. Test on at least one Linux distro and Windows
  (PowerShell 7+) before merging a new module.
- Tool versions evolve fast. The
  [`version-checker` skill](../../.github/skills/version-checker/SKILL.md) and
  [`@content-health` agent](../../.github/agents/content-health.agent.md) run
  monthly against this track.
- Never commit a real API key — even one that looks fake. Use `${ANTHROPIC_API_KEY}` and friends.
