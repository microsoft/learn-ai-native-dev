---
name: version-checker
description: Validate that tutorial content references current tool versions, APIs, CLI commands, and features. Use when reviewing content for outdated information, checking deprecations, verifying feature availability, auditing tool references, or updating stale version numbers. Covers GitHub Copilot (VS Code + CLI), Claude Code, VS Code settings, MCP, and Agent Skills standard.
allowed-tools: Bash(grep:*) Read fetch
---

# Version Currency Checker

This skill validates that AI-Native Development Tutorial content references current versions, features, CLI commands, and terminology for all tools mentioned.

## When to Use This Skill

- Before publishing new tutorial content
- After major tool updates (VS Code, GitHub Copilot, Claude Code, etc.)
- When users report outdated information
- During quarterly content audits (minimum monthly for CLI commands)
- When adding references to new tools or features

## Tools and Features to Check

### GitHub Copilot (VS Code)

| Feature | Current Status | Check For | Verify At |
|---------|---------------|-----------|-----------|
| Agent Mode | Stable | References to "Agent" in mode picker | [docs.github.com/copilot](https://docs.github.com/copilot) |
| Custom Agents | Stable | `.agent.md` file extension | [Agent docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| Agent Skills | Preview | `chat.useAgentSkills` setting | VS Code release notes |
| Copilot Coding Agent | Stable | GitHub.com autonomous agent | [GitHub Copilot docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent) |
| Model Picker | Stable | Model selection in chat | VS Code Copilot release notes |

**Deprecated terminology to flag:**
- "Chat modes" → Now called "Custom Agents"
- `.chatmode.md` → Now `.agent.md`

### GitHub Copilot CLI

| Command | Current Syntax | Check For | Verify At |
|---------|---------------|-----------|-----------|
| Install | `gh extension install github/gh-copilot` | Package name, install method | [GitHub CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli) |
| Invoke | `gh copilot` | Command syntax | Official docs |
| Suggest | `gh copilot suggest` | Subcommand names | `gh copilot --help` |
| Explain | `gh copilot explain` | Subcommand names | `gh copilot --help` |

### Claude Code (Anthropic)

| Feature | Current Syntax | Check For | Verify At |
|---------|---------------|-----------|-----------|
| Install (npm) | `npm install -g @anthropic-ai/claude-code` | Package name | [anthropic.com/claude-code](https://anthropic.com/claude-code) |
| Install (brew) | `brew install anthropic/tap/claude-code` | Tap name, formula | Homebrew tap |
| Invoke | `claude` | Binary name | Official docs |
| Config location | `~/.claude/` | Path | [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) |
| CLAUDE.md | Project instructions file | Filename, location | Official docs |
| MCP support | `--mcp-server` flag | Flag syntax | `claude --help` |

**Claude Code commands to verify:**
- `/help` — Show available commands
- `/clear` — Clear conversation
- `/config` — View/edit configuration
- `/mcp` — MCP server management
- `/model` — Model selection

**Deprecated Claude Code patterns to flag:**
- Old package names (verify `@anthropic-ai/claude-code` is current)
- Old config paths (if changed)

### VS Code Settings

| Setting | Purpose | Verify |
|---------|---------|--------|
| `chat.useAgentSkills` | Enable Agent Skills | Still valid setting name |

### Agent Skills Standard

- Specification at agentskills.io
- Folder location: `.github/skills/` (recommended) or `.claude/skills/` (legacy)
- Personal skills: `~/.copilot/skills/` (recommended) or `~/.claude/skills/` (legacy)

### MCP (Model Context Protocol)

- GitHub MCP Server availability
- Remote vs local server options
- Toolset configuration

## Pre-Ship Command Verification

Before publishing, verify all CLI commands are current by checking official documentation:

### Step 0: Extract All CLI Commands

```powershell
# Find all shell/bash code blocks with install or CLI commands
Select-String -Path "src/content/**/*.md" -Pattern "npm install|brew install|gh copilot|gh extension|claude |npx " | 
    Select-Object Filename, LineNumber, Line | 
    Format-Table -Wrap
```

### Step 1: Verify GitHub Copilot CLI

1. **Check current install method:** `gh extension install github/gh-copilot`
2. **Run `gh copilot --help`** to verify subcommand names
3. **Cross-reference:** [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

### Step 2: Verify Claude Code

1. **Check npm package:** `npm view @anthropic-ai/claude-code` (or search npmjs.com)
2. **Check Homebrew:** `brew info anthropic/tap/claude-code`
3. **Run `claude --help`** to verify command flags
4. **Cross-reference:** [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code)

### Step 3: Verify MCP Commands

1. **Check MCP server install methods** against [modelcontextprotocol.io](https://modelcontextprotocol.io)
2. **Verify configuration syntax** in any `mcp.json` examples

## Verification Process

### Step 1: Extract Tool References

Scan all tutorial markdown files for:
```
src/content/tutorial/part-*.md
```

Look for:
- VS Code setting names (`chat.*`, `github.copilot.*`)
- File extensions (`.agent.md`, `.instructions.md`, `SKILL.md`)
- Folder paths (`.github/agents/`, `.github/skills/`, `.github/instructions/`)
- Feature names (Agent Mode, Plan Mode, etc.)
- URLs to documentation

### Step 2: Check Against Current Documentation

For each reference found:
1. Verify the feature/setting still exists
2. Check if naming has changed
3. Confirm the described behavior matches current behavior
4. Note any preview/experimental status changes

### Step 3: Generate Currency Report

```markdown
## Version Currency Report

**Audit Date:** [date]
**Tutorial Version:** [version]
**Tools Verified Against:**
- GitHub Copilot CLI: [version or "latest as of date"]
- Claude Code: [version or "latest as of date"]
- VS Code: [version]

### ✅ Current References
| Reference | Location | Status |
|-----------|----------|--------|
| [feature] | [file:line] | Current |

### ⚠️ Outdated References
| Reference | Location | Issue | Fix |
|-----------|----------|-------|-----|
| [feature] | [file:line] | [what's wrong] | [suggested update] |

### 🔍 Unverified References
| Reference | Location | Notes |
|-----------|----------|-------|
| [feature] | [file:line] | [why unverified] |

### 🔧 CLI Commands Verified
| Command | Location | Verified? | Notes |
|---------|----------|-----------|-------|
| `npm install -g @anthropic-ai/claude-code` | module-f | ✅/❌ | [notes] |
| `gh extension install github/gh-copilot` | module-f | ✅/❌ | [notes] |
| `brew install anthropic/tap/claude-code` | module-f | ✅/❌ | [notes] |
```

### Step 4: Check Availability Notes

The tutorial includes availability notes like:
```markdown
⚠️ **Availability Note (January 2026):**
Agent Skills is in **preview** in VS Code stable.
```

Verify these notes are still accurate and update dates if needed.

## Known Volatile Areas

These parts of the tutorial reference fast-changing features:

1. **Part 5: Custom Agents** - Agent picker location, file extensions
2. **Part 6: Agent Skills** - Preview status, setting name, folder paths
3. **Part 8: Troubleshooting** - Setting names, feature availability
4. **Module F: Terminal AI** - Claude Code install commands, Copilot CLI syntax
5. **Module G: Build Agent** - CI/CD commands, GitHub Actions syntax
6. **Module H: Pipelines** - MCP server configuration, remote tooling

### Rapidly-Evolving Commands (Check Monthly)

| Command | Location | Why It Changes |
|---------|----------|----------------|
| `npm install -g @anthropic-ai/claude-code` | module-f | Package name/scope may change |
| `gh extension install github/gh-copilot` | module-f | Extension name may change |
| `brew install anthropic/tap/claude-code` | module-f | Tap/formula names may change |
| MCP server configs | module-a, module-f | Protocol evolving rapidly |

## Update Checklist

When updating outdated references:

- [ ] Update the feature name/setting in all occurrences
- [ ] Update any screenshots or diagrams
- [ ] Update the troubleshooting section if affected
- [ ] Add/update availability notes with current date
- [ ] Run `npm run build` to verify no broken references
- [ ] Update this skill's reference table if tool landscape changed
