# Track: Agentic Workflows

The "ship like an AI-Native team of one" track. Picks up where Foundation Part 8
ends.

- **Path id:** `agentic`
- **Status:** `official`
- **Audience:** advanced
- **Estimated time:** ~180 minutes
- **Supports example tracks:** ❌ (uses a fixed `DevDash CLI` companion project)
- **Source:** [`src/content/advanced/`](../../src/content/advanced)

## Design intent

1. **Tool surface, not theory.** Each module teaches one concrete surface
   (MCP, Coding Agent, orchestration, AI testing, capstone) by *using* it.
2. **No example interchangeability.** Agentic concepts are tied to the tool
   under demonstration; substituting projects would dilute the lesson.
3. **Letter-prefixed steps.** Steps inside Module A are labeled `A1`, `A2`, …
   to disambiguate from Foundation's continuous numbering. Module B uses
   `B1`, `B2`, …, and so on.
4. **Multi-prompt exposition.** Modules use the `===` separator to chain
   prompts where the second depends on the first's output. See the
   [`advanced-content.instructions.md`](../../.github/instructions/advanced-content.instructions.md).
5. **Diagrams carry their weight.** Every module has at least one diagram
   that is referenced explicitly in prose ("compare your run to the
   diagram below"). Decorative-only diagrams are removed.

## Per-module design

| # | Module | Subtitle | Primary objective | Diagram(s) | Source |
|---|---|---|---|---|---|
| A | MCP Servers | 45 min — Connect AI to external systems | Configure an MCP fetch server, build a custom one, integrate with the project. | `MCPArchitectureDiagram` | [`module-a-mcp-servers.md`](../../src/content/advanced/module-a-mcp-servers.md) |
| B | Copilot Coding Agent | 40 min — Cloud-based async development | Use the Copilot coding agent for issues that resolve themselves into PRs. | `WorkflowComparisonDiagram` | [`module-b-coding-agent.md`](../../src/content/advanced/module-b-coding-agent.md) |
| C | Agent Orchestration | 50 min — Multi-agent collaboration | Coordinate multiple agents on one task with explicit handoffs. | `AgentOrchestrationDiagram`, `AgenticLoopDiagram` | [`module-c-agent-orchestration.md`](../../src/content/advanced/module-c-agent-orchestration.md) |
| D | AI-Powered Testing | 40 min — Generate comprehensive tests | Use AI to author and maintain test suites against a spec. | `AITestingFlowDiagram` | [`module-d-ai-testing.md`](../../src/content/advanced/module-d-ai-testing.md) |
| E | Capstone Project | 30 min — Full integration challenge | Combine MCP + agents + orchestration + tests on one feature. | `CapstoneArchitectureDiagram` | [`module-e-capstone.md`](../../src/content/advanced/module-e-capstone.md) |

## Editorial guardrails

- Every module has a **Prerequisites** step that lists exact tools, versions,
  and installation commands. The [`version-checker` skill](../../.github/skills/version-checker/SKILL.md)
  audits these on the cadence in [`.github/CONTENT_LIFECYCLE.md`](../../.github/CONTENT_LIFECYCLE.md).
- Multi-prompt blocks must show *why* the chain matters; don't chain prompts
  for stylistic reasons.
- When a tool surface changes (e.g., MCP server config schema), the
  Docs Auditor and Researcher coordinate on a refresh PR.
