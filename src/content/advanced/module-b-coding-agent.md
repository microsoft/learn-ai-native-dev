---
id: module-b
number: 2
title: Copilot Coding Agent
subtitle: 40 minutes - Cloud-based async development
---

## step: b-prerequisites
### title: Prerequisites

Before starting this module:

- [ ] **Complete Module A** (DevDash project set up)
- [ ] **GitHub repository** with your code pushed
- [ ] **GitHub Copilot access** with Coding Agent enabled (requires Copilot Enterprise or Copilot Pro+)

---

## step: why-coding-agent
### title: Why This Module Matters

In Parts 0-8, you used GitHub Copilot in VS Code — a real-time, synchronous workflow where you chat and AI responds immediately. But what if you want AI to work on a feature while you're doing something else?

**The Copilot coding agent** runs in the cloud, directly on GitHub. You assign it an issue, it creates an implementation plan, builds a PR, and you review when ready. It's like delegating to a junior developer who works asynchronously.

**In this module, you'll:**
• Understand when to use local vs cloud agents
• Set up the required environment configuration
• Configure custom instructions for the coding agent
• Trigger the agent and review its implementation plan
• Iterate through the PR feedback loop
• Use Copilot to auto-review PRs

---

## step: local-vs-cloud
### title: Step B1: Local vs Cloud Agents

Before using the coding agent, let's understand when each approach works best.

**Comparison:**

| Aspect | VS Code Agents | Copilot Coding Agent |
|--------|---------------|---------------------|
| **Where it runs** | Your machine | GitHub cloud (secure VM) |
| **Interaction** | Real-time chat | Issue → Plan → PR → Comments |
| **Context** | Full workspace + conversation | Repository + issue + AGENTS.md |
| **Best for** | Active development, exploration | Well-defined tasks, async work |
| **Feedback** | Instant | PR review cycle |
| **CI/CD** | Not integrated | Validates against GitHub Actions |

:::diagram workflow-comparison
:::

💡 **They complement each other:** Use VS Code agents for exploration and active work, then create issues for the coding agent to handle well-defined tasks in the background.

---

## step: prepare-repository
### title: Step B2: Prepare Your Repository

The coding agent needs a proper environment to run. This involves three things:

1. **Environment setup file** — tells GitHub how to set up the development environment
2. **Project documentation** — gives the agent context about your project
3. **Custom coding agent instructions** — specific guidance for how the agent should write code

**Step 1: Create `copilot-setup-steps.yml`**

This is a **required** GitHub Actions workflow that defines the environment the coding agent runs in. It installs dependencies, sets up tools, and prepares the workspace.

Create `.github/workflows/copilot-setup-steps.yml`:

```yaml
name: "Copilot Setup Steps"

on: workflow_dispatch

jobs:
  copilot-setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install
```

💡 **Why is this required?** The coding agent runs in a cloud VM. This workflow tells it what tools to install and how to set up the project. Without it, the agent won't know how to build or test your code.

**Step 2: Update project documentation:**

Copy this into GitHub Copilot chat:

:::prompt
number: B1
title: Prepare DevDash for coding agent
---
Update the DevDash project documentation for the Copilot coding agent:

1. Update AGENTS.md (create if missing) with:
   - Project description: "DevDash is a CLI dashboard for developers"
   - Build command: npm install
   - Run command: node src/index.js
   - Test command: npm test (we'll add tests later)
   - Project structure explanation
   - Coding standards: ES modules, functional style, clear error handling

2. Create .github/copilot-instructions.md with:
   - Code style preferences (ES modules, async/await, descriptive names)
   - Comment requirements (explain complex logic)
   - Error handling pattern (try/catch with user-friendly messages)

3. Create .github/copilot-coding-agent-instructions.md with:
   - Specific instructions for the cloud coding agent
   - "Always create a test file for new modules"
   - "Run npm test before marking work complete"
   - "Follow existing module patterns in src/modules/"
   - "Keep PRs focused — one feature per PR"

4. Create .github/ISSUE_TEMPLATE/feature.md with:
   - Title placeholder
   - Description section
   - Acceptance criteria section
   - "How to test" section
:::

💡 **Two instruction files:** `.github/copilot-instructions.md` applies to both VS Code Copilot and the coding agent. `.github/copilot-coding-agent-instructions.md` applies **only** to the coding agent — use it for CI-specific rules like "run tests before completing."

Push these changes to GitHub:

```bash
git add .
git commit -m "Prepare repository for Copilot coding agent"
git push
```

---

## step: create-issue
### title: Step B3: Create an Issue for the Agent

Now let's create an issue that the coding agent will work on. A good issue has:
- Clear title describing the feature
- Detailed description of what to build
- Explicit acceptance criteria
- Instructions for testing

**Create this issue on GitHub:**

**Title:** Add --version flag to DevDash CLI

**Description:**
```markdown
## Summary
Add a `--version` flag that displays the current version of DevDash.

## Requirements
- Running `node src/index.js --version` should print the version and exit
- Version should be read from package.json
- Should not display the full dashboard, just the version

## Acceptance Criteria
- [ ] `--version` flag works correctly
- [ ] `--v` short flag also works
- [ ] Version matches package.json version
- [ ] Clean exit after printing version

## How to Test
```bash
node src/index.js --version
# Expected output: devdash v1.0.0
```
```

💡 **Issue quality matters:** The coding agent's output is directly proportional to the clarity of your issue. Vague issues produce vague code.

---

## step: trigger-agent
### title: Step B4: Trigger the Coding Agent

The coding agent activates when you **assign it to an issue**.

**To trigger the agent:**

1. Open your issue on GitHub
2. In the right sidebar, click **Assignees**
3. Select **Copilot** from the assignee list
4. The agent will start working within a few seconds

> **Alternative trigger:** You can also mention `@copilot` in an issue comment to ask it to start working, or to give it additional context after the initial assignment.

**What happens next:**

1. **Environment setup** — The agent runs your `copilot-setup-steps.yml` workflow to prepare the VM
2. **Planning** — The agent reads your issue, AGENTS.md, instructions files, and creates an **implementation plan**
3. **Plan review** — You'll see the plan as a comment on the issue. Review it before the agent starts coding
4. **Implementation** — The agent creates a branch, writes code, and runs your CI checks
5. **PR creation** — It opens a PR with its changes

⏳ **Wait for the plan:** The coding agent first posts an implementation plan as a comment. Review this plan — it tells you what files it will create/modify and how it will approach the task.

💡 **Review the plan:** If the plan looks wrong, comment with corrections before the agent starts coding. This saves time compared to reviewing bad code after the fact.

---

## step: review-pr
### title: Step B5: Review the Agent's PR

Once the PR is ready, review it like any other PR. The coding agent has already validated its work against your GitHub Actions CI pipeline.

**What the agent does automatically:**
- Runs your CI checks (if configured)
- Validates the code compiles/builds
- Runs tests (if `npm test` is in AGENTS.md)

**What to check in your review:**
- Does the code match your acceptance criteria?
- Does it follow your coding standards?
- Are there any edge cases missed?
- Is the code well-commented?

**Common review feedback for the agent:**

| Issue | Comment to Leave |
|-------|------------------|
| Missing feature | "Please also handle the case where..." |
| Style mismatch | "Use arrow functions instead of function declarations" |
| Missing tests | "Add a test for the --version flag" |
| Too complex | "Simplify this by using..." |

💡 **The agent responds to PR comments:** When you leave review comments requesting changes, the agent will push new commits addressing your feedback. It reads your comments, understands the context of the file, and makes targeted fixes.

---

## step: iterate-and-merge
### title: Step B6: Iterate and Merge

Let's practice the feedback loop. Leave a comment on the agent's PR:

**Example comment:**
```
Good start! Please make these changes:
1. Add a --help flag that shows available options
2. Include the Node.js version requirement in the help output
```

**Wait for the agent to respond.** It will push new commits addressing your feedback. The CI pipeline will run again automatically.

**When satisfied:**
1. Approve the PR
2. Merge to main
3. Pull the changes locally

```bash
git pull origin main
node src/index.js --version
```

You should see the version output!

### ✅ Checkpoint

- [ ] `copilot-setup-steps.yml` workflow created
- [ ] Issue created with clear acceptance criteria
- [ ] Coding agent triggered by assigning Copilot
- [ ] Implementation plan reviewed
- [ ] PR reviewed and iterated on
- [ ] Changes merged and working locally

---

## step: copilot-pr-review
### title: Step B7: Copilot PR Review

Beyond the coding agent, GitHub Copilot can also **automatically review PRs** that other people (or agents) create.

**Enable Copilot PR review:**

1. Go to your repository **Settings** → **Copilot** → **Code Review**
2. Enable "Copilot code review"
3. Optionally configure it to auto-review on every PR

**What Copilot reviews:**
- Code quality and best practices
- Potential bugs and security issues
- Suggestions for simplification
- Missing error handling

**How to request a review:**

On any PR, click **Reviewers** in the sidebar and add **Copilot** as a reviewer. It will leave inline comments just like a human reviewer.

💡 **Combine with the coding agent:** The coding agent creates PRs, and Copilot auto-reviews them. You get AI implementation AND AI review before you even look at the code. This catches issues early and saves your review time for higher-level concerns.

---

## step: best-practices
### title: Step B8: Coding Agent Best Practices

Based on your experience, here are patterns for effective coding agent use:

**Write Great Issues:**

✅ **Good issue:**
```markdown
## Add filtering to dashboard

The dashboard should support filtering data by source.

### Requirements
- Add --filter flag accepting: weather, quote, all (default)
- --filter weather shows only weather
- --filter quote shows only quote  
- Invalid filter values show error message

### Acceptance Criteria
- [ ] --filter flag works
- [ ] Invalid values handled gracefully
- [ ] Default behavior unchanged

### How to Test
```bash
node src/index.js --filter weather
```
```

❌ **Bad issue:**
```markdown
Add a filter feature to the dashboard
```

**When to break up issues:**

| Issue Size | Recommendation |
|------------|---------------|
| < 50 lines of code | Single issue is fine |
| 50-200 lines | Consider splitting into 2-3 issues |
| > 200 lines | Definitely split — too much for one PR |

**Tips:**
- One feature per issue
- Include file paths if you know them
- Reference existing patterns: "Follow the style in src/modules/weather.js"
- Add constraints: "Don't add new dependencies"
- Mention the test file location: "Add tests in tests/"

---

## step: coding-agent-exercise
### title: Step B9: Practice Exercise

Let's add another feature using the coding agent workflow.

**Create this issue on GitHub:**

**Title:** Add timestamp to DevDash display

**Description:**
```markdown
## Summary
Display the current date and time when the dashboard loads.

## Requirements
- Show current date and time at the top of the dashboard
- Format: "📅 Monday, February 13, 2026 at 3:45 PM"
- Use the user's locale for formatting

## Acceptance Criteria
- [ ] Timestamp displays in dashboard
- [ ] Format is human-readable
- [ ] Updates each time dashboard runs

## How to Test
```bash
node src/index.js
# Should show current date/time at the top
```
```

1. Create the issue
2. **Assign Copilot** as the assignee
3. Review the implementation plan
4. Review the PR (request Copilot code review too!)
5. Leave feedback if needed
6. Merge when satisfied

### ✅ Module Complete

- [ ] Understand when to use local vs cloud agents
- [ ] Repository configured with `copilot-setup-steps.yml`, AGENTS.md, and instruction files
- [ ] Successfully triggered the coding agent by assigning Copilot
- [ ] Reviewed an implementation plan before coding started
- [ ] Iterated on a PR through comments
- [ ] Tried Copilot PR review on a pull request
- [ ] Merged coding agent work into your project

---

## step: whats-next-coding-agent
### title: What's Next

You can now delegate well-defined tasks to the coding agent while focusing on more complex work. In Module C, you'll learn **Agent Orchestration** — creating multi-agent workflows where specialists collaborate on complex reviews.

💡 **Combine the approaches:** Use the coding agent for implementation, then use your local review orchestrator to ensure quality before merging. Add Copilot PR review for an extra layer of automated quality checks.
