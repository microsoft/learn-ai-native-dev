---
id: module-e
number: 5
title: Capstone Project
subtitle: 30 minutes - Full integration challenge
---

## step: e-prerequisites
### title: Prerequisites

Before starting this module:

- [ ] **Complete Modules A-D** (all techniques required)
- [ ] **DevDash project** with MCP servers running
- [ ] **GitHub repository** configured for Coding Agent
- [ ] **Orchestrator agent** from Module C

> **Capstone integrates everything:** This module combines MCP, Coding Agent, Orchestration, and Testing into one workflow.

---

## step: capstone-intro
### title: The Final Challenge

You've learned four advanced techniques:
- **MCP Servers** — Connecting AI to external data
- **Coding Agent** — Async development via GitHub issues
- **Agent Orchestration** — Multi-specialist review workflows
- **AI Testing** — Comprehensive test generation

Now you'll combine everything in a capstone project: **Add GitHub Stats to DevDash**.

:::diagram capstone-architecture
:::

**What you'll build:**

The DevDash CLI will display live weather, GitHub stats, and an inspirational quote - all fetched via your MCP servers!

---

## step: phase-1-mcp
### title: Phase 1: Build GitHub MCP Server

First, extend your MCP infrastructure to fetch GitHub data.

Copy this into GitHub Copilot chat:

:::prompt
number: E1
title: Create GitHub MCP server
---
Create a GitHub stats MCP server:

mcp-servers/github-server/
├── package.json (with @modelcontextprotocol/sdk dependency)
├── src/
│   └── index.js

The server should expose a tool called "get_github_stats" that:
1. Accepts a "username" parameter
2. Uses the GitHub API (no auth needed for public data):
   - User info: https://api.github.com/users/{username}
   - Repos: https://api.github.com/users/{username}/repos
3. Returns:
   - Total public repos
   - Total stars across all repos
   - Most recent repo name

Handle errors gracefully (user not found, rate limited).
:::

Register the server in `.vscode/mcp.json` (add to your existing servers):

```json
{
  "servers": {
    "github": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp-servers/github-server/src/index.js"]
    }
  }
}
```

Test it:

:::prompt
number: E2
title: Test GitHub MCP server
---
Use the github stats tool to get stats for username "octocat".

Then get stats for your own GitHub username.
:::

### ✅ Phase 1 Checkpoint
- [ ] GitHub MCP server created
- [ ] Server registered in VS Code
- [ ] Successfully fetches GitHub stats

---

## step: phase-2-issue
### title: Phase 2: Use Coding Agent for Implementation

Now let's use the Copilot coding agent to implement the feature.

**Create this issue on GitHub:**

**Title:** Add GitHub stats panel to DevDash

**Description:**
```markdown
## Summary
Display GitHub user statistics in the DevDash CLI dashboard.

## Requirements
- Add a new module src/modules/github.js
- Format: "📊 GitHub: X repos, Y stars"
- Username configurable via --user flag or environment variable
- Default to a hardcoded demo username if not specified

## Acceptance Criteria
- [ ] GitHub stats display in dashboard
- [ ] --user flag works to specify username
- [ ] GITHUB_USER env var works as fallback
- [ ] Default demo data if no user specified
- [ ] Error handling for API failures

## Technical Notes
- Use the existing module pattern from src/modules/weather.js
- Integrate with the dashboard.js display
- Don't add any new dependencies (use native fetch)

## How to Test
```bash
node src/index.js --user octocat
# Should show octocat's GitHub stats
```
```

1. Create the issue
2. **Assign Copilot** as the assignee
3. Review the implementation plan when it's posted
4. Wait for the PR, then review and iterate
5. **Don't merge yet** — we'll review with the orchestrator first

---

## step: phase-3-review
### title: Phase 3: Multi-Agent Review

Before merging the coding agent's PR, let's run it through your review orchestrator.

**Checkout the PR branch locally:**

```bash
git fetch origin
git checkout <pr-branch-name>
```

Now run the review orchestrator:

:::prompt
number: E3
title: Review GitHub stats PR
---
Perform a comprehensive review of the recent changes for the GitHub stats feature.

Use the review-orchestrator to:
1. Check security (any API keys exposed? Safe error handling?)
2. Analyze test coverage (are there tests for the new module?)
3. Verify documentation (is README updated? Code commented?)

Generate a review report and save to docs/GITHUB-STATS-REVIEW.md
:::

**Address any issues found:**

The orchestrator will likely identify:
- Missing tests for the new github.js module
- Documentation gaps
- Potential improvements

Leave comments on the PR to request fixes, or fix them yourself.

### ✅ Phase 3 Checkpoint
- [ ] PR reviewed by orchestrator
- [ ] Security issues addressed (if any)
- [ ] Test coverage gaps identified

---

## step: phase-4-tests
### title: Phase 4: Generate Tests

Your test-analyzer probably identified missing tests. Let's generate them.

:::prompt
number: E4
title: Generate GitHub module tests
---
Use the generate-tests skill to create comprehensive tests for:

1. src/modules/github.js
   - Happy path with valid data
   - Edge cases: 0 repos, 0 stars, very high numbers
   - Error handling: user not found, API error
   - Format validation

2. Integration tests for the --user flag
   - Flag parsing works
   - Environment variable fallback works
   - Default behavior works

Run tests and ensure all pass. Then run coverage and report the result.
:::

Verify coverage:

```bash
npm run test:coverage
```

Target: **80%+ coverage** including the new code.

### ✅ Phase 4 Checkpoint
- [ ] Tests generated for GitHub module
- [ ] Tests generated for --user flag handling
- [ ] All tests passing
- [ ] 80%+ coverage achieved

---

## step: phase-5-merge
### title: Phase 5: Final Review and Merge

Now let's do a final review and merge everything.

**Run the orchestrator one more time:**

:::prompt
number: E5
title: Final review before merge
---
Do a final review of all changes for the GitHub stats feature.

Confirm:
1. All tests pass
2. Coverage is above 80%
3. No security issues
4. Documentation is complete

Generate a final sign-off report.
:::

**If everything passes:**

```bash
git checkout main
git merge <pr-branch-name>
git push
```

**Test the complete DevDash:**

```bash
node src/index.js --user octocat
```

You should see the full dashboard with weather, GitHub stats, and a quote!

---

## step: celebrate
### title: 🎉 Congratulations!

You've completed the Advanced Track!

**What you built:**

```text
╔══════════════════════════════════════════════════════════════╗
║                     DevDash v1.0.0                          ║
║                 📅 Current date and time                     ║
╠══════════════════════════════════════════════════════════════╣
║  🌤️  Weather: 72°F, Sunny in Seattle                        ║
║  📊 GitHub: 42 repos, 1,337 stars                           ║
║  💬 "The best way to predict the future is to               ║
║           invent it." — Alan Kay                            ║
╚══════════════════════════════════════════════════════════════╝
```

**Skills you mastered:**

| Skill | What You Can Do Now |
|-------|---------------------|
| **MCP Servers** | Connect AI to any external API or database. Build tools, resources, and secure configs |
| **Coding Agent** | Delegate well-defined tasks to cloud AI with plan review and CI validation |
| **Agent Orchestration** | Coordinate multiple specialists for comprehensive review |
| **AI Testing** | Generate thorough tests and achieve high coverage |

---

## step: your-toolkit
### title: Your Complete AI-Native Toolkit

Here's everything you've built across the full tutorial:

**From Parts 0-8 (Foundation):**
- AGENTS.md for project context
- .github/copilot-instructions.md for coding standards
- Path-specific instructions (.github/instructions/)
- Custom agents: test-agent, docs-agent, review-agent
- Skills: verify-requirements, add-feature

**From Advanced Track:**
- MCP servers: fetch, quotes (with tools + resources), weather, github
- Secure `inputs` for API keys in MCP config
- MCP Inspector for debugging
- Coding agent workflow with `copilot-setup-steps.yml`
- Copilot PR review for automated code review
- Review orchestrator + specialist agents
- Test generation skill
- Complete DevDash CLI with live data

**Your workflow now:**

```text
1. Define feature (specs/PRD.md, issue)
2. Implement (VS Code agent or Copilot coding agent)
3. Review (orchestrator with specialists)
4. Test (AI-generated comprehensive tests)
5. Ship (with confidence)
```

---

## step: next-challenges
### title: Bonus Challenges

Want to push further? Try these:

**Challenge 1: Add More Data Sources**
- Create an MCP server for a new API (news, crypto prices, package stats)
- Integrate it into DevDash

**Challenge 2: Interactive Mode**
- Add a --watch flag that refreshes the dashboard every 60 seconds
- Add keyboard navigation to drill into different sections

**Challenge 3: Web Dashboard**
- Create an Express server that exposes DevDash data as a JSON API
- Build a React page (using your Parts 0-8 skills) to display the data visually
- Connect your MCP servers to feed live data to the web UI
- This proves the MCP techniques work identically for terminal AND browser apps

**Challenge 4: Team Rollout**
- Package your agents and skills for your team
- Create a repository template with all the AI infrastructure
- Document best practices for your organization

**Challenge 5: Build Your Own Orchestrator**
- Create a "feature builder" orchestrator
- It should: gather requirements → create tasks → implement → test → document
- Fully automated feature development!

---

## step: resources
### title: Continue Learning

**Official Documentation:**
- [MCP Specification](https://modelcontextprotocol.io/) — Protocol spec, SDK docs, and server directory
- [Copilot Coding Agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent) — Coding agent docs
- [GitHub Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions) — Build third-party integrations
- [Agent Skills Standard](https://agentskills.io/) — Reusable skill specification

**Tools:**
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) — Visual debugging for MCP servers
- [MCP Servers Directory](https://github.com/modelcontextprotocol/servers) — Pre-built MCP servers

**Community:**
- [Awesome Copilot](https://github.com/github/awesome-copilot) — Community agents and skills

**Modern Copilot features to explore:**
- **Copilot Edits** (Ctrl+Shift+I) — Multi-file editing in one pass
- **Next Edit Suggestions** — Predictive inline edits based on your recent changes
- **Copilot Vision** — Paste screenshots into chat for UI-related help
- **Model Picker** — Switch between models for different tasks (reasoning vs speed)
- **`@workspace`** — Ask questions about your entire codebase
- **`copilot`** — Use Copilot CLI directly in your terminal

**Share what you built!** The AI-native development community grows when we share our agents, skills, and workflows. Consider open-sourcing your DevDash customizations.

💡 **Remember:** The techniques you learned scale from side projects to enterprise applications. Start applying them to your real work today.
