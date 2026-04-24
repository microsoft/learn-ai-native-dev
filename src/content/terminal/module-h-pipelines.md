---
id: module-h
number: 3
title: Autonomous AI Pipelines
subtitle: 75 minutes - Spec, deploy & verify self-healing CI
---

## step: h-prerequisites
### title: Prerequisites

Before starting this module:

- [ ] **Complete Module G** — Your coding agent must be working (with tests passing)
- [ ] **GitHub repository** for your agent project
- [ ] **GitHub Actions** enabled on the repository
- [ ] **Anthropic API key** stored as a GitHub Actions secret

> **From local to production:** You've built an agent that works on your machine. Now you'll deploy it in real workflows — using the same spec-driven approach.

---

## step: spec-the-pipeline
### title: Step H0: Spec the Pipeline

Before writing any CI configuration, let's define what the pipeline should do. This is the same spec-driven approach from Module G — now applied to infrastructure.

> **🔗 Foundation Connection:** In G0, you wrote a PRD before building the agent. In H0, you'll write acceptance criteria before building the pipeline. The methodology works for code AND infrastructure.

:::prompt
number: H0
title: Define pipeline requirements
---
Create `specs/PIPELINE.md` in your my-coding-agent project with acceptance criteria for your CI/CD pipeline:

```markdown
# CI Pipeline Requirements

## Overview
Automated pipeline that processes GitHub issues, fixes test failures, and ensures code quality.

## Acceptance Criteria

### AC1: Issue Processing
- [ ] Pipeline triggers when issue is labeled `ai-agent`
- [ ] Agent reads issue body and processes the request
- [ ] Changes are committed to a new branch `ai/issue-{number}`
- [ ] PR is created automatically with reference to the issue

### AC2: Self-Healing Tests
- [ ] Pipeline triggers on PR test failures
- [ ] Agent analyzes test output and identifies failure cause
- [ ] Agent modifies SOURCE code (not tests) to fix failures
- [ ] Maximum 2 fix attempts before requiring human intervention
- [ ] All changes visible in PR for review

### AC3: Safety Constraints
- [ ] Agent cannot push directly to main
- [ ] Agent cannot delete files without confirmation (PR-based)
- [ ] Maximum token budget per run: $1.00
- [ ] Maximum turns per run: 15
- [ ] Tool whitelist: read_file, write_file, list_directory, search_files (no run_command in CI)

### AC4: Auditability
- [ ] All agent actions logged to workflow artifacts
- [ ] Token usage tracked and reported
- [ ] PR description includes summary of AI changes

## Success Metrics
- Issue-to-PR time: < 5 minutes for simple requests
- Self-healing success rate: > 80% for common test failures
- False positive rate (unnecessary changes): < 10%
```

===
Create specs/PIPELINE.md with acceptance criteria for a CI/CD pipeline. Define four criteria: AC1 — issue processing triggered by 'ai-agent' label that creates PRs on new branches. AC2 — self-healing tests with max 2 fix attempts that modify source code (not tests). AC3 — safety constraints (no direct main push, tool whitelist, $1 token budget, 15 max turns). AC4 — audit logging with token tracking and PR summaries. Include success metrics for each.
:::

**Why spec the pipeline?**

| Without Spec | With Spec |
|--------------|-----------|
| "Add a CI workflow" | AC1-AC4 are your checklist |
| Unclear when it's "done" | Done = all criteria pass |
| Easy to skip safety checks | AC3 explicitly requires them |
| Changes drift over time | Spec is your north star |

You'll verify against these acceptance criteria in H6.

---

## step: headless-deep-dive
### title: Step H1: Headless Mode Deep Dive

> **Satisfies:** Enables AC1-AC4 (headless mode is required for all CI scenarios)

In Module G (Step G9), you added basic `-p` flag support. Now let's make headless mode production-ready.

**The concept:** Headless mode turns your agent from an interactive tool into a scriptable command. Instead of typing prompts, you pipe them in. Instead of reading responses on screen, you capture structured output.

**Three headless patterns:**

```bash
# Pattern 1: Direct prompt
node agent.js -p "Add error handling to server.ts"

# Pattern 2: Pipe from file
cat issue-body.md | node agent.js -p -

# Pattern 3: Pipe from another command
gh issue view 42 --json body -q .body | node agent.js -p -
```

:::prompt
number: H1
title: Production headless mode
---
Enhance headless mode in my-coding-agent:

1. Update src/index.ts to support these flags:
   - `-p "prompt"` or `--prompt "prompt"` — run a single prompt
   - `--json` — output response as JSON: { success: boolean, response: string, tools_used: string[], tokens: { input: number, output: number } }
   - `--allowed-tools tool1,tool2` — whitelist only specific tools
   - `--max-turns N` — limit the number of agentic loop iterations (default: 25)
   - Read from stdin when prompt is `-`: `echo "fix bug" | node agent.js -p -`

2. Exit codes:
   - 0 — success
   - 1 — error (API failure, tool error)
   - 2 — safety limit reached (max turns exceeded)

3. In headless mode:
   - Suppress all decorative output (banners, spinners, colors)
   - Only output the result (or JSON if --json flag)
   - Auto-approve all 'confirm' permission tools (headless = automated)
   - EXCEPT blocked tools — those still refuse

4. Logging:
   - Write tool calls to stderr (so stdout stays clean for piping)
   - Example: stderr shows `[tool] read_file: package.json` while stdout has the response

===
Enhance headless mode for production use. Add flags: -p/--prompt for direct prompt, --json for structured output (success/response/tools_used/tokens), --allowed-tools for whitelisting, --max-turns for iteration limits, and stdin pipe support. Set exit codes: 0 success, 1 error, 2 safety limit. Suppress decorative output, auto-approve confirm tools (except blocked), log tool calls to stderr keeping stdout clean for piping.
:::

**Test the pipeline:**

```bash
# Direct prompt
node src/index.ts -p "What files are in this project?" --json

# Pipe a GitHub issue into the agent
echo "Add a --version flag to the CLI that prints the version from package.json" | node src/index.ts -p -

# Whitelist only safe tools
node src/index.ts -p "List all TypeScript files" --allowed-tools read_file,list_directory,search_files
```

---

## step: github-actions
### title: Step H2: GitHub Actions Integration

Now let's run your agent in CI. This is where things get powerful — your agent can automatically process issues, review code, and fix problems.

**Before you paste any YAML — understand the moving parts.**

A CI workflow that uses an AI agent has five responsibilities. Every approach (custom agent, Claude Code, Copilot CLI) must solve all five:

| Responsibility | Why It Matters | What Goes Wrong Without It |
|----------------|---------------|---------------------------|
| **1. Trigger** | When does the agent run? | Runs on every push = wasted money. Runs on wrong event = never triggers. |
| **2. Context** | What information does the agent receive? | No context = agent hallucinates. Too much = context overflow. |
| **3. Constraints** | What is the agent allowed to do? | No tool whitelist = agent runs `rm -rf`. No turn limit = infinite loop. |
| **4. Output** | Where do the agent's changes go? | Push to main = bypasses review. No branch = changes are lost. |
| **5. Audit** | How do you know what happened? | No logs = can't debug failures. No cost tracking = surprise bills. |

Let's build each one, then assemble them into a workflow.

**Part 1 — Trigger: When should the agent run?**

```yaml
on:
  issues:
    types: [opened, labeled]
```

The `if` condition is your gate. Without it, the agent runs on *every* issue event:

```yaml
jobs:
  process-issue:
    if: contains(github.event.issue.labels.*.name, 'ai-agent')
```

💡 **Why a label gate?** Cost control. Each agent run uses API tokens. You only want it when a human explicitly requests it by adding the `ai-agent` label.

**Part 2 — Context: Feed the issue into the agent**

```bash
# The issue body IS the prompt
ISSUE_BODY="${{ github.event.issue.body }}"
echo "$ISSUE_BODY" | node src/index.ts -p -
```

This is the same piping pattern from F7. GitHub Actions provides the issue body as a variable; you pipe it into headless mode (`-p -` reads from stdin).

**Part 3 — Constraints: Limit what the agent can do**

```bash
--max-turns 15 --allowed-tools read_file,list_directory,search_files,write_file
```

Notice: `run_command` is **not** in the whitelist. In CI, the agent should read and write files — not execute arbitrary shell commands. This is your permission system (G5) enforced at the CLI level (H1).

**Part 4 — Output: Branch, commit, PR**

```bash
BRANCH="ai/issue-${{ github.event.issue.number }}"
git checkout -b "$BRANCH"
git add -A
git diff --cached --quiet || (git commit -m "AI: Address issue #${{ github.event.issue.number }}" && git push origin "$BRANCH")
```

Key decisions:
- **New branch** — never push to main. AI changes always go through review.
- **`git diff --cached --quiet ||`** — only commit if the agent actually changed something. Silent no-ops are fine.
- **PR creation** — makes changes visible and reviewable before merge.

**Part 5 — Permissions: What GitHub Actions can do**

```yaml
permissions:
  contents: write       # Push branches
  issues: write         # Comment on the issue
  pull-requests: write  # Create PRs
```

These are GitHub's permissions for the workflow itself — separate from your agent's tool permissions. Keep them minimal.

**You have three approaches** to the "Run AI Agent" step — from zero-setup to fully custom:

:::tabs
tab: Copilot CLI (Zero Setup)
---
If you have a GitHub Copilot subscription, you can use Copilot CLI directly in CI without deploying your custom agent:

```yaml
- name: AI Process Issue
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    copilot -p "Address this issue: $ISSUE_BODY" \
      --allow-tool='shell(git)' \
      --allow-tool='write'
```

No custom agent needed. Native GitHub integration for PRs and issues.

tab: Claude Code (Zero Setup)
---
If you have an Anthropic API key, you can use Claude Code directly:

```yaml
- name: AI Process Issue
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    claude -p "Address this issue: $(cat issue-body.txt)" \
      --allowedTools "Edit,Read,Write" \
      --max-turns 15
```

No custom agent needed. Uses Claude Code's built-in capabilities.

tab: Custom Agent (Module G)
---
Deploy the agent you built in Module G for full control over tools, permissions, and behavior:

```yaml
- name: AI Process Issue
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    # or: OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  run: |
    ISSUE_BODY="${{ github.event.issue.body }}"
    echo "$ISSUE_BODY" | node src/index.ts -p - --json --max-turns 15 \
      --allowed-tools read_file,list_directory,search_files,write_file
```

Full control. Your tools, your permissions, your provider choice.
:::

**Now assemble the full workflow.** Every line below maps to one of the five responsibilities above:

:::prompt
number: H2
title: GitHub Actions AI workflow
---
Create a GitHub Actions workflow that runs our coding agent on new issues:

Create .github/workflows/ai-agent.yml:

```yaml
name: AI Agent

# RESPONSIBILITY 1: Trigger — only on issue events
on:
  issues:
    types: [opened, labeled]

# RESPONSIBILITY 5: Audit — minimal permissions
permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  process-issue:
    # RESPONSIBILITY 1: Gate — only labeled issues
    if: contains(github.event.issue.labels.*.name, 'ai-agent')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install agent dependencies
        run: npm install
      
      # RESPONSIBILITY 2 + 3: Context (issue body) + Constraints (tools, turns)
      - name: Run AI Agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          ISSUE_BODY="${{ github.event.issue.body }}"
          RESPONSE=$(echo "$ISSUE_BODY" | node src/index.ts -p - --json --max-turns 15 --allowed-tools read_file,list_directory,search_files,write_file)
          echo "$RESPONSE" > agent-response.json
          
      # RESPONSIBILITY 4: Output — branch + commit + PR
      - name: Create branch and commit
        run: |
          BRANCH="ai/issue-${{ github.event.issue.number }}"
          git checkout -b "$BRANCH"
          git add -A
          git diff --cached --quiet || (git commit -m "AI: Address issue #${{ github.event.issue.number }}" && git push origin "$BRANCH")
          
      - name: Create PR
        if: success()
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          BRANCH="ai/issue-${{ github.event.issue.number }}"
          gh pr create \
            --title "AI: Address #${{ github.event.issue.number }}" \
            --body "Automated changes by AI Agent for issue #${{ github.event.issue.number }}" \
            --base main \
            --head "$BRANCH" || true
```

Also add your API key to the repository secrets:
1. Go to Settings → Secrets and variables → Actions
2. Add the secret for your chosen provider: `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`
3. `GITHUB_TOKEN` is available automatically for Copilot CLI workflows

===
Create .github/workflows/ai-agent.yml triggered on issues labeled 'ai-agent'. The workflow should: checkout the repo, install deps, run the coding agent with the issue body as input using --json --max-turns 15 and a tool whitelist, create an ai/issue-{number} branch, commit any changes, and open a PR referencing the issue. Set proper permissions and use ANTHROPIC_API_KEY from secrets. Include alternatives for Copilot CLI and Claude Code.
:::

**Test the workflow:**

1. Push the workflow file to your repository
2. Create a new issue with the label `ai-agent`
3. Issue title: "Add --version flag"
4. Issue body: "Add a --version flag to the CLI that reads version from package.json and prints it"
5. Watch the Actions tab — your agent processes the issue and creates a PR

**When things go wrong in CI** (and they will):

| Symptom | Cause | Fix |
|---------|-------|-----|
| Workflow never triggers | Missing label, wrong event type | Check `if:` condition matches your label exactly |
| Agent produces empty output | No API key, wrong secret name | Check Actions → Run → env vars are set |
| Agent runs but makes no changes | Issue body too vague, tools too restricted | Make the issue body specific; check `--allowed-tools` includes `write_file` |
| PR creation fails | Branch already exists, permission denied | Add `|| true` to `gh pr create`; check `permissions:` block |
| Agent loops to max turns | Task too complex for the turn limit | Increase `--max-turns` or break the issue into smaller tasks |
| Surprise API cost | No cost limit set | Add `--max-cost 1.00` flag (H5) |

---

## step: self-healing-ci
### title: Step H3: Self-Healing CI

This is the crown jewel. A CI pipeline that **fixes its own test failures**.

> **⚠️ Important:** Self-healing CI is powerful but risky. Start with `--dry-run` on your first deployment. Never enable it on repos with production credentials or deployment pipelines. Always require human review (PR-only changes).

**How it works:**

```
Test run fails
    ↓
CI detects failure
    ↓
Agent analyzes test output
    ↓
Agent fixes the code
    ↓
CI re-runs tests
    ↓
Tests pass → Auto-merge
```

:::prompt
number: H3
title: Self-healing CI pipeline
---
Create a self-healing test pipeline:

1. Create .github/workflows/self-healing.yml:

```yaml
name: Self-Healing Tests

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: write
  pull-requests: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm install
      
      - name: Run tests
        id: test
        continue-on-error: true
        run: npm test 2>&1 | tee test-output.txt
      
      - name: AI Fix (if tests failed)
        if: steps.test.outcome == 'failure'
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          # Alternative: OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          # Alternative: Use Copilot CLI with GITHUB_TOKEN instead of custom agent
          ATTEMPT: ${{ github.run_attempt }}
        run: |
          # Safety: only attempt fix 2 times
          if [ "$ATTEMPT" -gt 2 ]; then
            echo "Max fix attempts reached. Manual intervention needed."
            exit 1
          fi
          
          TEST_OUTPUT=$(cat test-output.txt)
          PROMPT="The test suite failed with this output:

          $TEST_OUTPUT

          Analyze the failures and fix the SOURCE CODE (not the tests) to make them pass.
          Only modify the minimum code necessary. Do not change test files."
          
          echo "$PROMPT" | node src/index.ts -p - --max-turns 10 --allowed-tools read_file,write_file,search_files,list_directory
          
      - name: Commit fixes
        if: steps.test.outcome == 'failure'
        run: |
          git config user.name "AI Agent"
          git config user.email "ai-agent@noreply.github.com"
          git add -A
          git diff --cached --quiet || (git commit -m "fix: AI auto-fix for failing tests" && git push)
      
      - name: Re-run tests after fix
        if: steps.test.outcome == 'failure'
        run: npm test
```

Key safety features:
- Maximum 2 fix attempts (prevents infinite loops)
- Only modifies source code, not tests
- Limited tool access (no command execution)
- All changes are in a PR (reviewable before merge)

===
Create .github/workflows/self-healing.yml triggered on PR events. If tests fail, pipe the test output to the coding agent with instructions to fix source code (not tests), commit the fix, and re-run. Safety: max 2 attempts (check github.run_attempt), limited tools (no run_command), PR-only changes for human review. Include a collapsible showing how to do this with Copilot CLI instead.
:::

**Test it:**

1. Push the workflow
2. Create a branch with an intentional bug (e.g., break a function return value)
3. Open a PR
4. Watch CI:
   - Tests fail → Agent analyzes output → Agent fixes code → Tests pass

:::collapsible
title: Alternative: Self-healing with Copilot CLI (no custom agent)
---
Instead of your custom agent, you can use Copilot CLI directly in the fix step:

```yaml
- name: AI Fix (if tests failed)
  if: steps.test.outcome == 'failure'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    if [ "${{ github.run_attempt }}" -gt 2 ]; then
      echo "Max fix attempts reached."
      exit 1
    fi
    copilot -p "Fix the failing tests. Output: $(cat test-output.txt)" \
      --allow-tool='write' \
      --deny-tool='shell(rm)'
```

Same safety pattern, zero custom agent setup.
:::

**Safety is critical.** The pipeline has multiple guards:

| Guard | Purpose |
|-------|---------|
| Max 2 attempts | Prevents infinite fix loops |
| `--allowed-tools` whitelist | Agent can't run arbitrary commands |
| `--max-turns 10` | Limits agent computation |
| PR-only changes | Human reviews before merge |
| No test modification | Agent fixes code, not tests |

---

## step: embedded-sdk
### title: Step H4: Embedded AI SDK [Optional]

You've built a standalone agent. Now let's package it as a **library** that other tools can use. This step is optional — skip it if you're focused on CI pipelines.

:::prompt
number: H4
title: Create an embeddable agent SDK
---
Refactor my-coding-agent to also work as an importable library:

1. Create src/sdk.ts that exports a clean API:

```typescript
import { Agent } from './agent'
import { ToolRegistry } from './tools/registry'

export interface AgentOptions {
  provider?: string                  // 'anthropic' | 'openai' (auto-detected from env)
  apiKey?: string                    // API key (falls back to env)
  projectPath?: string              // Project root (falls back to cwd)
  allowedTools?: string[]           // Tool whitelist
  maxTurns?: number                 // Max agentic loop iterations
  autoApprove?: boolean             // Skip permission prompts
  onToolCall?: (name: string, input: any) => void  // Hook for tool calls
  onResponse?: (text: string) => void              // Hook for responses
}

export async function createAgent(options: AgentOptions): Promise<Agent>
export async function runPrompt(prompt: string, options?: AgentOptions): Promise<string>
```

2. Update package.json:
   - Add "exports" field pointing to src/sdk.ts
   - Add "bin" field for CLI: "my-agent": "src/index.ts"

3. Create a demo: examples/custom-tool.ts showing how to embed the agent:

```typescript
import { createAgent } from '../src/sdk'

async function main() {
  const agent = await createAgent({
    maxTurns: 5,
    allowedTools: ['read_file', 'list_directory'],
    onToolCall: (name, input) => {
      console.log(`[Tool] ${name}:`, JSON.stringify(input))
    }
  })
  
  const response = await agent.chat('What does this project do?')
  console.log(response)
}

main()
```

4. Create examples/devops-assistant.ts:
   A custom DevOps CLI tool that uses the agent internally to:
   - Analyze deployment logs
   - Suggest fixes for infrastructure issues  
   - Generate Dockerfiles from project analysis

===
Refactor my coding agent to also work as an importable library. Create src/sdk.ts exporting createAgent(options) and runPrompt(prompt, options) with options for provider, apiKey, projectPath, allowedTools, maxTurns, autoApprove, and event hooks (onToolCall, onResponse). Update package.json with exports and bin fields. Create example files showing embedded usage.
:::

**Test the SDK:**

```bash
npx tsx examples/custom-tool.ts
```

Your agent is now both a CLI tool AND a library. Other developers can embed AI capabilities into their tools using your agent as the engine.

---

## step: production-safeguards
### title: Step H5: Production Safeguards

Before deploying AI automation in real workflows, you need proper guardrails.

**The safeguard checklist:**

| Category | Safeguard | Implementation |
|----------|-----------|---------------|
| **Cost** | Token budget per run | `--max-turns` flag, cost tracking |
| **Cost** | Monthly spend cap | Check accumulated cost in `/cost`, exit if exceeded |
| **Safety** | Tool whitelist | `--allowed-tools` flag |
| **Safety** | Blocked commands | Pattern matching in run_command |
| **Safety** | Human review | PR-only changes, never push to main |
| **Audit** | Logging | All tool calls logged to stderr |
| **Audit** | Artifacts | Save agent response as workflow artifact |
| **Recovery** | Rollback | Git revert if tests still fail after fix |
| **Recovery** | Max attempts | Hard limit on fix iterations |

:::prompt
number: H5
title: Add audit logging and cost controls
---
Add production safeguards to my-coding-agent:

1. Create src/safeguards.ts:
   a. AuditLogger class:
      - Log every tool call with timestamp, tool name, input, output, duration
      - Write to a JSON log file: .agent/audit.jsonl (one JSON object per line)
      - Include session ID (UUID) for tracing
   
   b. CostGuard class:
      - Track cumulative tokens per session
      - Accept a maxCostDollars option (default: $1.00)
      - Before each API call, estimate remaining budget
      - Refuse to continue if budget exceeded: "Cost limit reached ($X.XX / $Y.YY)"
   
   c. RateLimiter class:
      - Maximum N API calls per minute (default: 20)
      - Wait if rate would be exceeded
      - Log when rate limiting kicks in

2. Wire safeguards into src/agent.ts:
   - AuditLogger logs all tool executions
   - CostGuard checks budget before each API call
   - RateLimiter prevents API abuse

3. Add CLI flags:
   - `--max-cost 0.50` — set cost limit per run
   - `--audit-log path/to/log.jsonl` — custom audit log location
   - `--dry-run` — show what the agent WOULD do without actually writing files or running commands

===
Add production safeguards: an AuditLogger writing tool calls to a JSONL file with timestamps and session UUIDs, a CostGuard tracking token spend and refusing past a budget limit, and a RateLimiter capping API calls per minute. Add CLI flags: --max-cost, --audit-log path, and --dry-run to preview actions without side effects. Wire all into the agent loop.
:::

**The `--dry-run` flag is particularly powerful for CI:**

```bash
# Preview what the agent would do without any side effects
node agent.js -p "Refactor the auth module" --dry-run
```

### ✅ Final Checkpoint — Terminal Track Complete

You can now:
- [ ] Run your agent in headless mode for scripting
- [ ] Process GitHub issues automatically via Actions (custom agent OR existing tools)
- [ ] Fix failing tests automatically with safety limits
- [ ] Embed your agent as a library in other tools
- [ ] Control costs, audit usage, and limit scope

**When to build a custom agent vs. use existing tools:**

| Scenario | Build Custom? | Use Existing? |
|----------|:---:|:---:|
| One-off automation script | | ✅ Copilot CLI / Claude Code |
| Team-wide CI pipeline with custom logic | ✅ | |
| Specialized domain tool (e.g., security scanner) | ✅ | |
| Day-to-day coding tasks | | ✅ |
| Learning how agents work | ✅ (you just did!) | |
| Quick PR automation | | ✅ Copilot CLI (native GitHub) |

---

## step: verify-pipeline
### title: Step H6: Verify Against Pipeline Spec

Before declaring victory, verify that your pipeline meets all the acceptance criteria from H0.

:::prompt
number: H6
title: Verify pipeline against spec
---
Using your agent (or Claude Code / Copilot CLI), verify the pipeline against specs/PIPELINE.md:

```
Read specs/PIPELINE.md and test each acceptance criterion:

For AC1 (Issue Processing):
- Create a test issue with label `ai-agent`
- Verify pipeline triggers
- Verify PR is created with correct branch name

For AC2 (Self-Healing Tests):
- Create a PR with a failing test
- Verify agent attempts fix
- Verify max 2 attempts limit

For AC3 (Safety Constraints):
- Check workflow file for tool restrictions
- Verify max-turns and max-cost flags
- Confirm no direct push to main

For AC4 (Auditability):
- Check workflow artifacts for logs
- Verify PR description includes AI summary

Generate a verification report with PASS/FAIL for each criterion.
```

===
Use the coding agent to verify the CI pipeline against specs/PIPELINE.md. Test each acceptance criterion: AC1 by creating a test issue, AC2 with a failing-test PR, AC3 by auditing workflow safety constraints, AC4 by checking logs and artifacts. Generate a PASS/FAIL report for each criterion.
:::

### ✅ Pipeline Checkpoint
- [ ] AC1: Issue processing triggers and creates PR
- [ ] AC2: Self-healing attempts fix with 2-attempt limit
- [ ] AC3: Safety constraints enforced in workflow
- [ ] AC4: Audit logs appear in workflow artifacts

---

## step: track-complete
### title: 🎉 Terminal Track Complete!

**What you accomplished across this track:**

| Module | What You Built | Spec-Driven? |
|--------|---------------|--------------|
| **Module F** | Mastered Claude Code + Copilot CLI + Shell Composition + Recovery | ✅ Comprehensive CLAUDE.md |
| **Module G** | Built a multi-provider AI coding agent, used it on a real project | ✅ PRD + Tasks + Verification |
| **Module H** | Deployed with self-healing CI and safety controls | ✅ Pipeline acceptance criteria |

**The spec-driven development loop:**

```
SPEC IT      →  BUILD IT     →  TEST IT      →  VERIFY IT
(PRD.md)        (Code)          (Jest)          (Against spec)
     ↑                                               │
     └────────── Fix failures and re-verify ─────────┘
```

You applied this loop to:
- The coding agent itself (Module G)
- The CI pipeline (Module H)
- Every piece of infrastructure you built

**The complete mental model:**

You now understand AI coding agents at every level:

```
USER INPUT
    ↓
[REPL / Headless] ← You built this (index.ts)
    ↓
[CONTEXT LOADER] ← You built this (loader.ts)
    ↓ reads AGENT.md, CLAUDE.md, copilot-instructions.md
[SYSTEM PROMPT]
    ↓
[SKILL MATCHER] ← You built this (matcher.ts)
    ↓ pattern-match query → lazy-load SKILL.md
[ENHANCED PROMPT]
    ↓
[AGENTIC LOOP] ← You built this (agent.ts) ← THIS IS THE CORE
    ↓
    ├→ [TOOL CALL] → [PERMISSION GATE] → [EXECUTE]
    │       ↑              ↑                  ↑
    │   You built      You built          You built
    │   (registry.ts)  (registry.ts)      (read-file.ts, etc.)
    │
    ├→ [MCP TOOL CALL] → [MCP CLIENT] → [MCP SERVER]
    │       ↑                 ↑              ↑
    │   You built         You built     You built (Module A)
    │   (registry.ts)     (client.ts)
    │
    └→ [RESPONSE] → stdout
```

**Every concept from this entire tutorial now has a mechanical explanation:**

| What you learned | Where you built it |
|-----------------|-------------------|
| Spec-driven development | G0, H0 — PRD before code, criteria before CI |
| Instruction files | G6 — Context loader reads and injects them |
| Skills load on demand | G8 — Pattern matching + lazy loading |
| Custom agents/commands | F6 — .claude/commands/ workflows |
| Shell composition with AI | F7 — Piping, chaining, unix integration |
| Recovery from AI failures | F8 — Context overflow, loops, bad edits |
| Agent Mode loops | G3 — The agentic while loop |
| Tools have permissions | G5 — Permission gates |
| MCP servers expose tools | G7 — MCP client discovers and calls them |
| Testing non-deterministic AI | G10 — Mock providers + deterministic assertions |
| Verify against spec | G11, H6 — PASS/FAIL tables |
| Use your own tools | G12 — Dog-fooding on a real project |

**Your portfolio now includes:**
- Spec-driven multi-provider terminal AI coding agent
- Skill system with pattern matching and lazy loading
- Custom command workflows (`.claude/commands/`)
- Comprehensive test suite with 80%+ coverage
- Self-healing CI pipeline with safety guardrails
- Verification reports proving requirements are met

**The methodology IS the product.** You used spec-driven development to build a spec-driven development tool.

**One more thing — what changed about YOUR role.**

You can now build a working AI coding agent in a few hours. That's not hypothetical — you just did it. But the value you brought wasn't typing code. It was:

- **Deciding what to build** — the PRD in G0 was your judgment, not the AI's
- **Designing the architecture** — provider abstraction, permission gates, skill matching — those were design decisions
- **Knowing when it's wrong** — in G12, you used your agent and noticed the rough edges. The AI didn't catch those.
- **Setting the constraints** — in H2, you decided which tools to whitelist and how many turns to allow. Safety is a human judgment call.

As AI coding tools get faster and cheaper, the scarce resource isn't code. It's clarity about what's worth building, the taste to know when it's good enough, and the judgment to set boundaries.

That's the real skill this track taught — not just how to build AI tools, but how to be the human those tools need.

**Where to go from here:**
- Add more skills (security-review, performance-audit, documentation)
- Build team-shared command libraries
- Connect more MCP servers for specialized capabilities
- Create custom CI workflows for different project types
- Share your agent and pipeline patterns with your team
