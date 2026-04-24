---
id: module-c
number: 3
title: Agent Orchestration
subtitle: 50 minutes - Multi-agent collaboration workflows
---

## step: c-prerequisites
### title: Prerequisites

Before starting this module:

- [ ] **Complete Parts 0-8** (especially Part 5: Custom Agents)
- [ ] **Understanding of agent mode** and custom agent creation
- [ ] **DevDash project** from Module A (optional but helpful)

---

## step: why-orchestration
### title: Why This Module Matters

In Part 5, you created individual custom agents: test-agent, docs-agent, review-agent. Each specialist does one thing well. But real workflows often need multiple specialists working together.

**Agent orchestration** is the pattern where one agent coordinates others — delegating tasks, collecting results, and synthesizing a final output.

**In this module, you'll:**
• Understand multi-agent workflow patterns
• Build an orchestrator agent that delegates tasks
• Create specialist agents that work in pipelines
• Implement a full PR review workflow with multiple experts
• Learn about GitHub Copilot Extensions as an alternative expansion mechanism

> **Note:** Multi-agent orchestration relies on the ability for one agent to invoke another. In GitHub Copilot’s agent mode, you can reference other agents by name in your orchestrator’s instructions, and the AI will follow those instructions to call them sequentially. Some environments also support a `runSubagent` tool. The patterns below work with the sequential delegation approach — the orchestrator agent’s instructions tell it which specialist agents to invoke and how to synthesize their results.

---

## step: multi-agent-patterns
### title: Step C1: Multi-Agent Patterns

Before building, let's understand the three main patterns for agent collaboration:

:::diagram agent-orchestration
:::

**Pattern 1: Sequential Pipeline**
Agent A runs → passes output to Agent B → passes output to Agent C.
Best for: Linear workflows where each step depends on the previous.

**Pattern 2: Parallel Fan-Out**
A coordinator sends the same request to multiple agents simultaneously and collects results.
Best for: Independent reviews (security, tests, docs can run in parallel).

**Pattern 3: Orchestrator with Specialists**
A master agent reads the request, decides which specialists to call, delegates, and synthesizes.
Best for: Complex workflows requiring judgment about what to run.

💡 **We'll build Pattern 3:** An orchestrator that delegates to specialists and synthesizes results. This is the most powerful and flexible pattern.

---

## step: design-orchestrator
### title: Step C2: Design the Review Orchestrator

Let's design a PR review orchestrator that coordinates three specialists:

| Specialist | Responsibility | What It Checks |
|------------|---------------|----------------|
| **security-scanner** | Security vulnerabilities | Hardcoded secrets, injection risks, unsafe patterns |
| **test-analyzer** | Test coverage | Missing tests, edge cases, coverage gaps |
| **docs-checker** | Documentation | Missing comments, outdated docs, README updates |

**Orchestrator workflow:**

1. **Receive request** — User asks for a PR review
2. **Delegate** — Invoke each specialist agent by name
3. **Collect** — Gather results from all specialists
4. **Synthesize** — Combine into a unified report
5. **Return** — Present the final review

---

## step: create-security-agent
### title: Step C3: Create the Security Scanner Agent

Let's build the first specialist. This agent focuses only on security issues.

Copy this into GitHub Copilot chat:

:::prompt
number: C1
title: Create security scanner agent
---
Create a security scanner agent at .github/agents/security-scanner.agent.md

The agent should:
- Focus ONLY on security issues (not style, not performance)
- Check for: hardcoded secrets, API keys, passwords, injection risks, unsafe eval(), XSS vulnerabilities
- Use read-only tools only — it should NEVER modify code
- Output a structured report with severity levels (CRITICAL, HIGH, MEDIUM, LOW)

Include in the agent file:
- Description of what it does
- When to use it
- Report format template
- List of specific things it checks

Structure the .agent.md file with:
- YAML frontmatter with name and description
- A system prompt section describing the agent's role
- Tool restrictions (only read files, search, list problems)
:::

Test the security scanner:

1. Select the **security-scanner** agent from the agent picker
2. Ask it to review the DevDash project for security issues
3. Review the structured output

---

## step: create-test-analyzer
### title: Step C4: Create the Test Analyzer Agent

The second specialist focuses on test coverage and quality.

Copy this into GitHub Copilot chat:

:::prompt
number: C2
title: Create test analyzer agent
---
Create a test analyzer agent at .github/agents/test-analyzer.agent.md

The agent should:
- Analyze test coverage and quality
- Identify functions/modules without tests
- Suggest edge cases that should be tested
- Check for: missing error handling tests, boundary conditions, async behavior
- Output a structured report with coverage gaps

Include in the agent file:
- Description of what it does  
- Coverage report format
- Edge case categories to check
- Priority ranking for missing tests

Structure the .agent.md file with:
- YAML frontmatter with name and description
- A system prompt section describing the agent's role
- Tool restrictions (read-only: search files, read files, list problems)
:::

Test the test analyzer on DevDash.

---

## step: create-docs-checker
### title: Step C5: Create the Docs Checker Agent

The third specialist focuses on documentation quality.

Copy this into GitHub Copilot chat:

:::prompt
number: C3
title: Create docs checker agent
---
Create a docs checker agent at .github/agents/docs-checker.agent.md

The agent should:
- Check documentation completeness and accuracy
- Verify README is up-to-date with current functionality
- Check for missing JSDoc/code comments on public functions
- Identify outdated references or broken links
- Output a structured report with documentation gaps

Include in the agent file:
- Description of what it does
- Documentation standards to check
- Report format template
- Recommendations for each gap found

Structure the .agent.md file with:
- YAML frontmatter with name and description
- A system prompt section describing the agent's role
- Tool restrictions (read-only: search files, read files, fetch URLs)
:::

Test the docs checker on DevDash.

---

## step: create-orchestrator
### title: Step C6: Create the Review Orchestrator

Now let's build the orchestrator that coordinates the specialists.

The orchestrator is itself an agent — but its instructions tell it to delegate to the specialist agents and combine their results.

Copy this into GitHub Copilot chat:

:::prompt
number: C4
title: Create review orchestrator
---
Create a review orchestrator agent at .github/agents/review-orchestrator.agent.md

The orchestrator should:
1. Accept a request to review code or a PR
2. Coordinate three specialist agents: security-scanner, test-analyzer, docs-checker
3. Collect and synthesize their outputs
4. Generate a unified review report

Include in the agent file:
- Description as a "master coordinator for comprehensive code reviews"
- The workflow steps it follows
- Instructions that tell the agent to:
  a. First, run the security-scanner agent's workflow (search for hardcoded secrets, injection risks, unsafe patterns)
  b. Then, run the test-analyzer agent's workflow (identify untested functions, missing edge cases)
  c. Then, run the docs-checker agent's workflow (check README, missing comments, broken links)
  d. Synthesize all findings into a unified report

The orchestrator should produce a structured markdown report:

# Code Review Report

## Executive Summary
[Overall health score, critical issues count, recommendation]

## Security Review
[Results from security analysis]

## Test Coverage Analysis  
[Results from test analysis]

## Documentation Review
[Results from docs analysis]

## Priority Actions
1. [Most critical fix]
2. [Second priority]
3. [Third priority]
:::

💡 **How orchestration works in practice:** The orchestrator agent's instructions describe the full workflow. When you invoke it, the AI follows these instructions step by step — running each specialist's checks, collecting findings, and producing the unified report. The AI acts as the coordinator.

:::collapsible
title: Alternative: If your environment supports runSubagent
---
Some AI environments (like certain VS Code Insiders builds or third-party tools) support a `runSubagent` tool that programmatically invokes other agents. If available, you can update the orchestrator to use:

```text
## Workflow
1. Use runSubagent to invoke security-scanner with the file list
2. Use runSubagent to invoke test-analyzer with the same context
3. Use runSubagent to invoke docs-checker
4. Synthesize all three outputs into a unified report
```

The benefit is cleaner separation — each specialist runs in its own context. The core patterns are the same regardless of mechanism.
:::

---

## step: test-orchestrator
### title: Step C7: Test the Full Pipeline

Let's run the complete orchestrator workflow on DevDash.

1. Select the **review-orchestrator** agent from the agent picker
2. Copy this into GitHub Copilot chat:

:::prompt
number: C5
title: Run full review pipeline
---
Perform a comprehensive review of the DevDash project.

Follow your full workflow:
1. Run security analysis (check for hardcoded secrets, injection risks, unsafe patterns)
2. Run test coverage analysis (identify untested functions, missing edge cases)
3. Run documentation analysis (check README, missing comments, broken links)

Generate a unified review report and save it to docs/REVIEW-REPORT.md
:::

**What you should see:**
- The orchestrator performing each specialist's analysis
- Results collected from all three areas
- A synthesized report with sections from each
- Priority actions ranked by importance

Check `docs/REVIEW-REPORT.md` for the full report.

### ✅ Checkpoint

- [ ] Security scanner agent created and tested
- [ ] Test analyzer agent created and tested
- [ ] Docs checker agent created and tested
- [ ] Review orchestrator successfully coordinates all specialists
- [ ] Unified review report generated

---

## step: advanced-orchestration
### title: Step C8: Advanced Orchestration Patterns

Now that basic orchestration works, let's explore advanced patterns:

**Conditional Delegation:**

The orchestrator can decide which specialists to call based on context:

```text
## Workflow

1. Analyze the request
2. If request mentions "security" → only run security analysis
3. If request mentions "tests" → only run test analysis
4. If request mentions "review" or "PR" → run all specialist analyses
5. Synthesize available results
```

**Iterative Refinement:**

The orchestrator can loop until quality gates pass:

```text
## Workflow

1. Run all specialist analyses
2. If critical issues found → generate fix suggestions
3. After fixes → re-run relevant analyses
4. Repeat until no critical issues
5. Generate final report
```

**Let's add conditional logic:**

:::prompt
number: C6
title: Add smart routing to orchestrator
---
Update the review-orchestrator agent to include smart routing:

Add a "Quick Review Mode" that:
- If the user says "quick" or "fast" → only run security analysis
- If the user says "full" or "comprehensive" → run all specialist analyses
- If the user specifies a specialist by name → only run that analysis

Update the workflow section to document this behavior.
:::

Test the updated orchestrator:
- "Quick security review of DevDash"
- "Full comprehensive review of DevDash"
- "Just check test coverage for DevDash"

💡 **Copilot Edits for multi-file orchestration:** When the orchestrator suggests changes across multiple files, you can use **Copilot Edits** (Ctrl+Shift+I) to apply multi-file changes in one pass. This complements the review workflow — the orchestrator identifies issues, then Copilot Edits fixes them across your codebase.

---

## step: integrate-with-pr
### title: Step C9: Integrate with PR Workflow

Let's create a skill that automatically runs the orchestrator on code changes.

:::prompt
number: C7
title: Create PR review skill
---
Create a skill at .github/skills/pr-review/SKILL.md

The skill should:
- Trigger when user asks to "review changes", "review PR", or "check my code"
- Determine what files have changed (using git diff or changed files)
- Focus the review on changed files only
- Run the review-orchestrator analysis workflow with the relevant context
- Output results optimized for PR comments

Include:
- name: pr-review
- description with keywords for activation
- Workflow that scopes review to changes only
- Format for PR-ready feedback (markdown checklist)
:::

Test the skill:

:::prompt
number: C8
title: Test PR review skill
---
Review my recent changes.

Focus on files I've modified and give me feedback ready to address before committing.
:::

---

## step: copilot-extensions
### title: Step C10: Beyond Agents — GitHub Copilot Extensions

Custom agents and orchestrators extend Copilot within VS Code. But there's another way to expand Copilot's capabilities: **GitHub Copilot Extensions**.

**What are Copilot Extensions?**

Extensions are third-party integrations that appear as `@mentions` in Copilot Chat — both in VS Code and on GitHub.com. They're built by tool vendors or your own organization.

| Approach | Where It Runs | Who Builds It | Best For |
|----------|---------------|---------------|----------|
| **Custom Agents** (`.agent.md`) | VS Code, local | You | Personal/team workflows |
| **Agent Skills** (`SKILL.md`) | VS Code, local | You | Reusable task-specific knowledge |
| **Copilot Extensions** | Cloud, GitHub.com | Vendors or you | Organization-wide tools, third-party integrations |

**Examples of Copilot Extensions:**
- `@docker` — Manage containers from chat
- `@sentry` — Query error tracking data
- `@azure` — Deploy and manage cloud resources
- Your own custom extension — Integrate internal APIs

💡 **You don't need to build Extensions in this tutorial.** The important thing is understanding the landscape: agents for local workflows, skills for reusable knowledge, and Extensions for organizational and third-party integrations. All three work alongside MCP servers.

### ✅ Module Complete

- [ ] Three specialist agents created and working
- [ ] Review orchestrator successfully coordinates specialists
- [ ] Smart routing allows focused or comprehensive reviews
- [ ] PR review skill integrates with development workflow
- [ ] Unified reports generated with priority actions
- [ ] Understand the difference between agents, skills, and Extensions

---

## step: whats-next-orchestration
### title: What's Next

You've built a multi-agent review pipeline that catches issues across security, testing, and documentation. In Module D, you'll use AI to **generate comprehensive test suites** — filling the gaps your test-analyzer identifies.

💡 **The loop is complete:** Orchestrator identifies gaps → Test generator fills gaps → Orchestrator verifies → Repeat until quality gates pass.
