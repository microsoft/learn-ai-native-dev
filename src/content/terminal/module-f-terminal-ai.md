---
id: module-f
number: 1
title: Terminal AI Fundamentals
subtitle: 90 minutes - Master Claude Code, Copilot CLI, Shell Composition & Recovery
---

## step: f-prerequisites
### title: Prerequisites

Before starting this module, ensure you have:

- [ ] **Node.js 20+ (LTS recommended)** — [nodejs.org](https://nodejs.org)
- [ ] **A terminal you love** — Terminal, iTerm2, Warp, Windows Terminal, or any shell
- [ ] **A Claude subscription or Anthropic API key** — [claude.ai](https://claude.ai) or [console.anthropic.com](https://console.anthropic.com)
- [ ] **A GitHub Copilot subscription** — [github.com/features/copilot](https://github.com/features/copilot)
- [ ] **Foundation Track (Parts 0-8) completed** — You understand instruction files, agents, and skills

> **Terminal-first mindset:** This track teaches you to build with AI without ever opening an IDE. Everything happens in your terminal.

> **Version note:** Tool installation commands and features evolve quickly. If a command doesn't work, check the official documentation for the latest instructions.

---

## step: why-terminal-ai
### title: Step F1: Why Terminal AI Matters

Throughout Parts 0-8, every AI interaction happened inside VS Code. Click Agent Mode, type a prompt, watch the magic happen. But there's a whole world beyond the editor.

**When the terminal wins over the IDE:**

| Scenario | IDE-Based AI | Terminal AI |
|----------|-------------|-------------|
| SSH into a production server | ❌ No VS Code | ✅ Claude Code runs anywhere |
| Quick one-line fix | Overkill — open project, wait for indexing | ✅ `claude "fix the typo in config.yaml"` |
| CI/CD pipelines | ❌ Can't run VS Code in GitHub Actions | ✅ Headless mode in CI |
| Scripting & automation | Manual | ✅ Pipe AI into bash scripts |
| Pair programming over SSH | Complex | ✅ Share a tmux session with AI |

**The two tools you'll master:**

1. **Claude Code** — Anthropic's agentic coding tool. It reads files, writes code, runs commands, manages git, connects to MCP servers — all from a command-line interface. Available in your terminal, VS Code, JetBrains, desktop app, and browser.

2. **GitHub Copilot CLI (`copilot`)** — GitHub's agentic coding tool for the terminal. It can do everything Claude Code can — read/write files, run commands, manage git, use MCP servers — plus it has native GitHub.com integration for creating PRs, working on issues, and managing Actions workflows.

:::collapsible
title: What is a REPL?
---
**REPL** stands for **R**ead, **E**valuate, **P**rint, **L**oop.

It's an interactive program that:
1. **Reads** what you type
2. **Evaluates** (processes) your input
3. **Prints** the result
4. **Loops** back to wait for more input

When you open `node` in your terminal with no arguments, that's a REPL. When you open Claude Code, that's also a REPL — it reads your natural language, sends it to the AI, prints the response, and waits for your next message.

Python's `python` command, Ruby's `irb`, and browser DevTools console are all REPLs.
:::

💡 **The pattern:** Claude Code and Copilot CLI are both full agentic coding agents. Claude Code uses Anthropic's ecosystem; Copilot CLI uses GitHub's ecosystem with native GitHub.com integration. Learn both so you can pick the best tool for your workflow.

---

## step: install-claude-code
### title: Step F2: Install & Configure Claude Code

Claude Code can be installed via npm (recommended for most users) or using platform-specific installers.

**Install Claude Code:**

```bash
# Native installer (recommended — all platforms)
# macOS / Linux / WSL:
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell:
irm https://claude.ai/install.ps1 | iex

# Homebrew (macOS/Linux)
brew install claude-code

# WinGet (Windows)
winget install Anthropic.ClaudeCode
```

> **Note:** The native installer auto-updates in the background. npm installation (`npm install -g @anthropic-ai/claude-code`) still works but is deprecated. Check [code.claude.com/docs/en/getting-started](https://code.claude.com/docs/en/getting-started) for the latest instructions.

**Verify installation:**

```bash
claude --version
```

**First launch — authenticate:**

```bash
claude
```

On first run, Claude Code will open your browser to authenticate. You need one of:

1. **Claude Pro, Max, Team, or Enterprise** — Log in with your claude.ai account (recommended)
2. **Anthropic Console API key** — From [console.anthropic.com](https://console.anthropic.com)
3. **Third-party providers** — Amazon Bedrock, Google Vertex AI, or Microsoft Foundry

> **Note:** The free Claude.ai plan does not include Claude Code access.

:::collapsible
title: How do the three AI coding tools compare?
---
They're complementary tools that shine in different contexts:

| Feature | VS Code Agent Mode | Claude Code | GitHub Copilot CLI |
|---------|-------------------|-------------|--------------------|
| **Interface** | GUI — click, type in sidebar | Terminal REPL + IDE extensions | Terminal REPL |
| **File access** | Automatic via workspace | Reads/writes files via tools | Reads/writes files via tools |
| **Runs commands** | In VS Code terminal | In your actual shell | In your actual shell |
| **Works over SSH** | Needs Remote SSH extension | Works natively | Works natively |
| **CI/CD** | Can't run in pipelines | Headless mode (`-p` flag) | Headless mode (`-p` flag) |
| **Instruction files** | `copilot-instructions.md` | `CLAUDE.md` | `copilot-instructions.md` |
| **MCP servers** | Supported | Supported | Supported |
| **GitHub integration** | Via extensions | Via tools | Native (PRs, issues, Actions) |
| **Default model** | Varies (Claude/GPT) | Claude Sonnet 4.5 | Claude Sonnet 4.5 |

**Use VS Code Agent Mode when:** You want visual diff previews, integrated debugging, or work primarily in a GUI.

**Use Claude Code when:** You're in the terminal, on a remote server, scripting automation, or want maximum keyboard-driven speed with the Anthropic ecosystem.

**Use Copilot CLI when:** You want terminal-native AI with deep GitHub.com integration — creating PRs, working on issues, managing workflows — all from the command line.
:::

After authentication, you should see Claude Code's interactive REPL — a `>` prompt waiting for your first message.

Type `exit` or press Ctrl+C to leave.

---

## step: claude-code-core
### title: Step F3: Core Claude Code Workflow

Now let's use Claude Code to explore and understand a project.

**Clone a sample project to experiment with:**

```bash
git clone https://github.com/anthropics/anthropic-cookbook.git
cd anthropic-cookbook
```

**Launch Claude Code in the project:**

```bash
claude
```

**Try these commands to explore:**

```
> What does this project do? Give me a high-level summary.
```

Claude Code will read files, scan the directory structure, and give you an overview — all without you opening a single file.

**The `/init` command — auto-generate project instructions:**

```
> /init
```

This scans your project and creates a `CLAUDE.md` file — Claude Code's equivalent of `copilot-instructions.md`. It detects your tech stack, build commands, conventions, and creates rules automatically.

**Key Claude Code commands:**

| Command | What It Does |
|---------|-------------|
| `/init` | Auto-generate CLAUDE.md from project scan |
| `/compact` | Compress conversation when context gets long |
| `/cost` | Show token usage and estimated cost |
| `/clear` | Clear conversation history |
| `/help` | Show all available commands |
| `Ctrl+C` | Cancel current operation |
| `exit` | Quit Claude Code |

**Multi-file editing in action:**

```
> Add a new Python script called hello.py that prints "Hello from Claude Code!" and add it to the README's list of examples.
```

Watch Claude Code:
1. Create the new file
2. Read the existing README
3. Edit the README to include the new script
4. **Ask for your permission** before writing each file

💡 **Permission gates are built in.** Claude Code always asks before writing files or running commands. This is the same pattern you'll build from scratch in Module G.

---

## step: meta-prompting
### title: Pro Technique: Let AI Write Your Prompts

Here's a secret that experienced AI developers use every day: **you don't have to write complex prompts from scratch.** You can rough-write what you want and let AI craft the detailed prompt for you.

**The pattern:**

```
Your rough idea → AI expands into detailed prompt → You refine and use it
```

Throughout this track, you'll encounter detailed prompts — some 50 to 100+ lines long. These weren't written from scratch by hand. They were generated by describing the intent to an AI tool and iterating.

**Try it now with Claude Code:**

```bash
claude
```

```
> I need a detailed prompt that instructs an AI to create a comprehensive 
  CLAUDE.md file for a Node.js CLI project. The prompt should cover project 
  overview, architecture, conventions, testing, and "do not" rules. 
  Write me that prompt.
```

Watch how Claude Code generates a well-structured, detailed prompt — complete with sections you might not have thought to include.

**Or try with Copilot CLI:**

```bash
copilot
```

```
> Write me a detailed AI prompt for creating a project instruction file. 
  The project is a Node.js CLI app. I want the prompt to be thorough 
  enough that any AI could follow it to create a complete 
  copilot-instructions.md or CLAUDE.md.
```

**Why this works:**

| Writing prompts manually | Using AI to write prompts |
|--------------------------|---------------------------|
| Easy to forget sections | AI includes comprehensive coverage |
| Inconsistent structure | Consistent, well-organized output |
| Time-consuming for complex tasks | Seconds to generate, minutes to refine |
| Limited by what you know to ask | AI suggests things you didn't think of |

**The "Generate with AI" option:**

Throughout this tutorial, prompt boxes with detailed content have two modes:

- **Full Prompt** — The complete, detailed prompt ready to copy and paste
- **Generate with AI** — A shorter description you can paste into any AI tool to generate the full prompt yourself

This teaches you the technique while giving you the complete answer as a reference. Try the "Generate with AI" option on the next few prompts to practice this skill.

💡 **This is a core AI-native skill.** The best AI developers don't memorize prompts — they describe what they want and iterate. The detailed prompts in this tutorial are the *output* of this process, not something you need to write from scratch.

---

## step: claude-md
### title: Step F4: CLAUDE.md — Your Terminal Instruction File

You already know `copilot-instructions.md` from Part 3. `CLAUDE.md` is the same concept for Claude Code.

**The mapping:**

| VS Code (Parts 0-8) | Claude Code (Terminal) | Purpose |
|---------------------|----------------------|---------|
| `.github/copilot-instructions.md` | `CLAUDE.md` | Global project rules |
| `AGENTS.md` | `CLAUDE.md` | Build/test commands, architecture |
| `.instructions.md` (path-specific) | Nested `CLAUDE.md` files | Folder-specific rules |
| `.agent.md` (custom agents) | `.claude/commands/*.md` | Reusable workflows |

> **🔗 Foundation Connection:** In Part 3, you created comprehensive instruction files with "How to Make Changes" workflows and "DO NOT" rules. The same depth matters here — Claude Code works best when CLAUDE.md is thorough.

**Create a comprehensive CLAUDE.md for your DevDash project:**

:::prompt
number: F1
title: Create comprehensive CLAUDE.md for DevDash
---
Create a CLAUDE.md file in my DevDash project root. Make it comprehensive like the copilot-instructions.md from Part 3 — not just a quick overview, but a full guide for any AI agent working on this project:

```markdown
# DevDash - Developer Dashboard CLI

## Project Overview
Node.js CLI application that displays developer dashboard data in the terminal. Fetches live data from MCP servers and external APIs.

## Build & Run
- Install: `npm install`
- Run: `node src/index.js`
- Test: `npm test`
- Lint: `npm run lint`

## Architecture
- `src/index.js` — CLI entry point, orchestrates modules
- `src/modules/` — Data display modules (weather, quote, github)
- `mcp-servers/` — MCP server implementations
- `specs/` — PRD and task files (source of truth for features)
- `tests/` — Jest test suite

## How to Make Changes

When modifying this project:

1. **Check the spec first** — Read `specs/PRD.md` to understand requirements
2. **Find the right module** — Each feature lives in its own file under `src/modules/`
3. **Follow the pattern** — Look at existing modules for structure
4. **Test your changes** — Run `npm test` before considering any change complete
5. **Update the spec** — If adding a feature, add it to PRD.md first

## Conventions
- Pure Node.js — no frameworks, no TypeScript
- ES modules (import/export)
- Error handling with try/catch for all API calls
- Console output uses template literals with emoji prefixes
- One feature per module file
- Functions should be small and focused

## API Keys & Secrets
- All API keys come from environment variables
- Never hardcode credentials
- Use `.env.example` to document required variables

## Do NOT
- Add any frontend framework
- Use CommonJS require() syntax  
- Add databases
- Store API keys in code
- Add dependencies without checking if Node.js built-ins can do it
- Modify multiple unrelated things in one change
- Skip tests

## Testing Strategy
- Unit tests for each module in `tests/`
- Mock external API calls
- Test error handling paths
- Target 80%+ coverage

## Common Patterns

**Adding a new data module:**
1. Create `src/modules/new-feature.js`
2. Export a single async function
3. Handle errors with try/catch
4. Return formatted string with emoji prefix
5. Add tests in `tests/new-feature.test.js`
6. Import and call from `src/index.js`

**Error message format:**
```javascript
console.log(`⚠️ Error: ${error.message}`)
```
```

===
Write a comprehensive CLAUDE.md project instruction file for my DevDash project — a Node.js CLI app that shows developer dashboard data in the terminal. It uses pure Node.js (no frameworks, no TypeScript), ES modules, fetches from MCP servers and APIs. Include sections for: project overview, build/run commands, architecture (src/index.js entry, src/modules/ for features, mcp-servers/, specs/, tests/), step-by-step "How to Make Changes" workflow, coding conventions, API key handling via env vars, a "Do NOT" list of things to avoid, testing strategy with Jest, and a common pattern for adding new data modules. Make it thorough enough that any AI agent could follow the rules reliably.
:::

**Why this depth matters:**

| Shallow CLAUDE.md | Deep CLAUDE.md |
|-------------------|----------------|
| "Use ES modules" | Agent knows the syntax rule |
| + "How to add a module" | Agent knows the workflow |
| + "Do NOT skip tests" | Agent checks its own work |
| + "Check spec first" | Agent follows your process |

The more context you provide, the more reliably Claude Code follows your project's conventions.

**Nested CLAUDE.md files:**

Just like path-specific instructions in Part 4, you can place `CLAUDE.md` files in subdirectories:

```
devdash/
├── CLAUDE.md                    # Project-level rules
├── src/
│   └── CLAUDE.md                # Source code conventions
└── mcp-servers/
    └── CLAUDE.md                # MCP server rules
```

Claude Code reads the most specific file for the context it's working in.

---

## step: gh-copilot-cli
### title: Step F5: GitHub Copilot CLI

GitHub Copilot CLI is a **full agentic coding agent** for the terminal — just like Claude Code. It can read and write files, run commands, manage git, use MCP servers, and interact with GitHub.com directly.

> **Note:** The old `gh copilot suggest` / `gh copilot explain` extension is retired and replaced by GitHub Copilot CLI. The default model is Claude Sonnet 4.5.

**Install GitHub Copilot CLI:**

```bash
# npm (all platforms — requires Node.js 22+)
npm install -g @github/copilot

# Homebrew (macOS/Linux)
brew install copilot-cli

# WinGet (Windows)
winget install GitHub.Copilot
```

> **Note:** Check [docs.github.com/en/copilot](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-github-copilot-in-the-cli) for the latest installation instructions.

**First launch — authenticate:**

```bash
copilot
```

On first launch, use the `/login` command and follow the on-screen instructions to authenticate with your GitHub account. You need an active GitHub Copilot subscription.

**Interactive mode — a full agentic REPL:**

Just like Claude Code, Copilot CLI gives you an interactive session where you can have a conversation:

```
> What does this project do? Summarize the architecture.
```

```
> Add error handling to the API routes in server.ts
```

```
> Create a PR with these changes
```

Copilot CLI reads your files, writes code, runs commands, and asks for permission before taking action — just like Claude Code does.

**Plan mode — for complex tasks:**

Press **Shift+Tab** to switch to plan mode. In this mode, Copilot analyzes your request, asks clarifying questions, and builds a structured implementation plan before writing any code.

**Programmatic mode — for scripting and CI:**

```bash
copilot -p "Show me this week's commits and summarize them" --allow-tool='shell(git)'
```

**Key Copilot CLI commands:**

| Command | What It Does |
|---------|-------------|
| `/compact` | Compress conversation when context gets long |
| `/context` | Show detailed token usage breakdown |
| `/model` | Switch the AI model |
| `/mcp` | View connected MCP servers |
| `/login` | Authenticate with GitHub |
| `/feedback` | Submit feedback or bug reports |
| `Shift+Tab` | Toggle between ask/execute mode and plan mode |

**Native GitHub.com integration — the key differentiator:**

Unlike Claude Code, Copilot CLI can interact directly with GitHub.com:

```
> List my open PRs
> I've been assigned issue #42. Start working on it in a new branch.
> Create a PR with these changes and request review from @teammate
> Check the changes in PR #57 and report any problems
```

**Permission controls:**

```bash
# Allow specific tools without prompting
copilot --allow-tool='shell(git)'

# Block dangerous tools
copilot --deny-tool='shell(rm)' --deny-tool='shell(git push)'

# Allow all tools (use with caution)
copilot --allow-all-tools
```

**When to use which agent:**

| Consideration | Claude Code | Copilot CLI |
|---------------|-------------|-------------|
| **Billing** | Claude subscription or Anthropic API key | GitHub Copilot subscription |
| **AI Models** | Claude (Sonnet, Opus, Haiku) | Claude Sonnet 4.5 (default); selectable via `/model` |
| **GitHub.com integration** | Via shell commands (`gh` CLI) | Native — PRs, issues, Actions built-in |
| **IDE support** | VS Code, JetBrains, Desktop app, Web | Terminal-focused |
| **MCP servers** | Supported | Supported |
| **Custom instructions** | `CLAUDE.md` | `copilot-instructions.md` |
| **Custom agents/skills** | `.claude/commands/*.md` | Custom agents, skills, hooks |
| **Plan mode** | Not built-in | Shift+Tab for structured planning |
| **Headless/CI** | `-p` flag | `-p` flag with `--allow-tool` |

---

## step: custom-commands
### title: Step F6: Custom Commands — Reusable Workflows

In Part 5, you created custom agents (`.agent.md` files) that specialized in specific tasks. Claude Code has the same concept: **custom commands** stored in `.claude/commands/`.

> **🔗 Foundation Connection:** Custom commands are the terminal equivalent of the `test-agent`, `docs-agent`, and `review-agent` you built in Part 5. Same idea, different location.

**The pattern:**

```
project/
├── .claude/
│   └── commands/
│       ├── review.md      # /review → Run code review workflow
│       ├── test.md        # /test → Run testing workflow
│       └── ship.md        # /ship → Pre-merge checklist
└── CLAUDE.md
```

When you type `/review` in Claude Code, it loads `.claude/commands/review.md` and executes that workflow.

:::prompt
number: F2
title: Create custom commands for DevDash
---
Create a `.claude/commands/` directory in your DevDash project with three workflow commands:

**.claude/commands/review.md:**
```markdown
# Code Review Command

Review the recent changes for quality and correctness.

## Process
1. Run `git diff HEAD~1` to see recent changes
2. For each changed file:
   - Check for code smells (long functions, magic numbers, unclear names)
   - Verify error handling is present
   - Check if tests were added/updated
   - Verify conventions match CLAUDE.md
3. Generate a review report with:
   - Summary of changes
   - Issues found (with severity: Critical/High/Medium/Low)
   - Suggestions for improvement

## Output Format
```
## Review: [brief description]

### Changes Reviewed
- [list of files]

### Issues
| Severity | File | Issue |
|----------|------|-------|
| ... | ... | ... |

### Verdict
APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```
```

**.claude/commands/test.md:**
```markdown
# Test Command

Run tests and analyze coverage.

## Process
1. Run `npm test` and capture output
2. Run `npm test -- --coverage` if coverage is configured
3. Analyze results:
   - List any failing tests
   - Note coverage percentage
   - Identify files with low coverage
4. If tests fail, analyze failure reasons and suggest fixes

## Output Format
```
## Test Results

**Status:** PASS / FAIL
**Tests:** X passed, Y failed
**Coverage:** Z%

### Failures (if any)
- [test name]: [reason]

### Low Coverage Files
- [file]: [coverage %] - [suggested tests]
```
```

**.claude/commands/ship.md:**
```markdown
# Ship Command

Pre-merge checklist before shipping code.

## Process
1. Run tests (`/test` workflow)
2. Run review (`/review` workflow)
3. Check for console.log statements that should be removed
4. Verify no TODOs remain in changed files
5. Ensure CHANGELOG.md is updated (if exists)
6. Generate final ship report

## Checklist
- [ ] All tests pass
- [ ] No critical issues in review
- [ ] No debug statements
- [ ] TODOs addressed
- [ ] Documentation updated

## Output Format
```
## Ship Checklist

| Item | Status |
|------|--------|
| Tests | ✅ / ❌ |
| Review | ✅ / ❌ |
| Debug cleanup | ✅ / ❌ |
| TODOs | ✅ / ❌ |
| Docs | ✅ / ❌ |

**Ready to Ship:** YES / NO
```
```

===
Create three Claude Code custom command markdown files in .claude/commands/ for my DevDash project: 1) review.md that runs git diff and reviews each file for code smells, missing tests, and convention compliance, producing a severity table and verdict. 2) test.md that runs npm test and coverage, reports failures and low-coverage files. 3) ship.md that runs both review and test, checks for debug statements and TODOs, produces a ship-readiness checklist. Each should have a Process section and consistent Output Format.
:::

**Test your custom commands:**

```bash
cd devdash
claude
```

```
> /review
```

Claude Code loads `.claude/commands/review.md` and runs through the review workflow.

```
> /ship
```

Watch it run through the entire pre-merge checklist.

**The power of commands:**

| Ad-hoc Prompt | Custom Command |
|---------------|----------------|
| "Review my code" | Same result every time |
| Different output format each time | Consistent output format |
| May forget steps | Never skips steps |
| Hard to share | Share the `.claude/` folder |

**Copilot CLI equivalent:**

Copilot CLI uses custom agents and skills (same as VS Code) rather than Claude's command files. If you want the same workflows in Copilot CLI:
- Use `.github/agents/*.agent.md` (custom agents)
- Use `.github/skills/*/SKILL.md` (on-demand skills)

### ✅ Checkpoint
- [ ] `.claude/commands/` directory exists
- [ ] `/review` command runs code review workflow
- [ ] `/test` command runs tests and reports results
- [ ] `/ship` command runs pre-merge checklist
- [ ] Commands produce consistent, formatted output

---

## step: terminal-power-patterns
### title: Step F7: Terminal Power Patterns — Piping, Chaining & Composition

You can use Claude Code and Copilot CLI interactively. That's table stakes. A terminal power user **composes** AI with the rest of the shell.

**The core idea:** Terminal AI tools read from stdin and write to stdout — just like `grep`, `sed`, and `jq`. That means you can pipe data through them.

**Pattern 1: Pipe context into the agent**

```bash
# Feed a file directly into a prompt
cat src/server.ts | claude -p "Find security vulnerabilities in this code"

# Feed git diff into a review
git diff HEAD~3 | copilot -p "Review these changes for bugs"

# Feed error logs into diagnosis
tail -100 /var/log/app.log | claude -p "What's causing these errors?"
```

**Pattern 2: Chain agent output into other tools**

```bash
# Generate a commit message from staged changes
git diff --cached | claude -p "Write a conventional commit message for these changes" | git commit -F -

# Generate docs and write to file
claude -p "Generate API docs for src/routes/" --json | jq -r '.response' > docs/API.md

# List issues and have the agent triage them
gh issue list --json title,body,labels | copilot -p "Triage these issues by priority"
```

**Pattern 3: Use the agent inside shell scripts**

```bash
#!/bin/bash
# auto-review.sh — Review every changed file
for file in $(git diff --name-only HEAD~1); do
  echo "=== Reviewing $file ==="
  cat "$file" | claude -p "Brief code review of this file. Note any issues." 2>/dev/null
  echo ""
done
```

**Pattern 4: Combine with `jq` for structured output**

```bash
# Get structured analysis
claude -p "List the top 3 performance issues in src/" --json | jq '.response'

# Parse specific fields from agent output
copilot -p "Analyze package.json dependencies" --json | jq -r '.tools_used[]'
```

**Try it now:**

```bash
# In your DevDash project (or any project):
git log --oneline -10 | claude -p "Summarize what this project has been working on recently"
```

```bash
# Generate a changelog from commits
git log --oneline v1.0..HEAD | copilot -p "Write a CHANGELOG entry from these commits"
```

💡 **The mental model:** Claude Code and Copilot CLI aren't just chat interfaces — they're unix tools. The `-p` flag turns them into a filter you can slot into any pipeline. The `--json` flag makes their output parseable. This is where terminal AI becomes genuinely more powerful than IDE-based AI.

| IDE AI | Terminal AI |
|--------|------------|
| Click → type → read | Pipe → transform → redirect |
| One interaction at a time | Chain multiple AI calls in a pipeline |
| Manual copy/paste of context | `cat`, `git diff`, `gh issue` feed context automatically |
| Output stays in the UI | Output flows into files, commits, scripts |

---

## step: when-things-break
### title: Step F8: When Things Break — Terminal AI Recovery

Everything we've done so far has been the happy path. Real terminal AI sessions go sideways. Here's how to recover.

**Problem 1: Context overflow — the agent gets confused**

After a long session, the agent has too much conversation history. It starts repeating itself, forgetting instructions, or giving worse answers.

```bash
# Claude Code: compress the context
> /compact
```

```bash
# Copilot CLI: same command
> /compact
```

If `/compact` isn't enough, start a fresh session. Your instruction files (CLAUDE.md, copilot-instructions.md) reload automatically — the agent doesn't lose its "memory" of your project rules, only the conversation.

**Problem 2: The agent loops or stalls**

Sometimes the agent calls the same tool repeatedly or tries the same failing approach in a loop.

```bash
# Interrupt without killing the session
Ctrl+C

# Then redirect:
> That approach isn't working. Try a different strategy: [describe what you want]
```

💡 **The pattern:** Don't just say "try again." Tell the agent *what was wrong* and *what to try instead*. This fills the same role as error recovery in the agentic loop — you're the feedback mechanism.

**Problem 3: API rate limits or auth expiry**

```bash
# Symptoms: "429 Too Many Requests" or "401 Unauthorized"

# Check your key is still valid
echo $ANTHROPIC_API_KEY | head -c 10   # Should start with sk-ant-

# Check rate limit status (Claude Code)
> /cost

# If your session token expired, re-authenticate:
claude   # Will prompt for re-auth if needed
```

**Problem 4: The agent edits the wrong file or makes a bad change**

```bash
# Undo the last agent change
git checkout -- path/to/file.ts

# Or see what changed and selectively revert
git diff
git checkout -p   # Interactive: choose which hunks to keep
```

💡 **Always work in a git repo.** Terminal AI tools can write files and run commands. Git is your safety net. If you're not sure about a change, check `git diff` before committing.

**Problem 5: Agent hallucinates tools or files**

The agent claims to have edited a file, but the file doesn't exist. Or it says it ran a command, but the output doesn't match.

```bash
# Verify what actually changed
git status
git diff

# If the agent claims a file exists:
ls -la path/to/claimed-file.ts
```

The rule: **trust but verify.** Check the filesystem, not the agent's claim.

**Quick recovery cheat sheet:**

| Problem | Recovery |
|---------|----------|
| Confused/degraded answers | `/compact` or start fresh session |
| Loops on same approach | `Ctrl+C` → redirect with specific alternative |
| Rate limited (429) | Wait 60s, or check `/cost` for usage |
| Auth expired (401) | Re-launch the agent to re-authenticate |
| Bad file edit | `git checkout -- file` |
| Wrong file created | `rm file && git checkout .` |
| Agent claims something untrue | `git status`, `git diff`, `ls` to verify |

---

## step: real-world-exercise
### title: Step F9: Exercise — Onboard to an Unfamiliar Codebase

Time to prove the pattern works. You'll onboard to a codebase you've never seen — using only terminal AI tools — in under 15 minutes.

**The challenge:**

1. Clone a new repo you've never worked with
2. Use Claude Code to understand it
3. Use Claude Code to add a small feature
4. Try the same workflow with Copilot CLI

**Step 1: Clone an unfamiliar project**

```bash
git clone https://github.com/expressjs/express.git
cd express
```

**Step 2: Launch Claude Code and explore**

```bash
claude
```

```
> /init
```

Then ask:

```
> Explain the architecture of this project. What are the main entry points, 
  and how does routing work internally?
```

**Step 3: Try the same task with Copilot CLI**

Exit Claude Code, then launch Copilot CLI in the same project:

```bash
copilot
```

```
> Explain the architecture of this project. How does routing work?
```

Notice how both tools give you similar agentic capabilities — reading files, exploring the codebase, and explaining architecture.

**Step 4: Make a change with either agent**

Using whichever agent you prefer:

```
> Add a simple health check endpoint example to the examples/ directory. 
  Create examples/health-check.js that starts an Express server with a 
  GET /health route that returns { status: "ok", timestamp: Date.now() }.
```

Watch the agent create the file, and confirm the write. Then test it:

```bash
node examples/health-check.js &
curl http://localhost:3000/health
```

### ✅ Module F Checkpoint

You can now:
- [ ] Install and authenticate Claude Code
- [ ] Install and authenticate GitHub Copilot CLI
- [ ] Create comprehensive `CLAUDE.md` files (matching Part 3 depth)
- [ ] Use `/init` to auto-generate instruction files
- [ ] Create custom commands in `.claude/commands/` for reusable workflows
- [ ] Pipe data through AI tools in shell pipelines
- [ ] Recover from common terminal AI failures (context overflow, loops, bad edits)
- [ ] Navigate and edit codebases from the terminal with either agent
- [ ] Use Copilot CLI for tasks with native GitHub.com integration
- [ ] Choose the right agent for your workflow and ecosystem

**Foundation connections established:**
- Part 3 → CLAUDE.md (comprehensive instruction files)
- Part 4 → Nested CLAUDE.md files (path-specific rules)
- Part 5 → Custom commands (terminal equivalent of custom agents)
- Terminal craft → Shell piping and composition (F7)
- Recovery patterns → Context overflow, loops, bad edits (F8)

**Next up:** In Module G, you'll build a coding agent like Claude Code **from scratch**. You'll understand exactly how these tools work under the hood — and you'll use spec-driven development to do it.
