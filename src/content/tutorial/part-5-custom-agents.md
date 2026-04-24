---
id: part-5
number: 5
title: Custom Agents
subtitle: 15 minutes - Create specialized AI personas
---

## step: why-custom-agents
### title: Why This Part Matters

You've been doing everything with one general-purpose AI. But some tasks need specialized expertise:

- Testing requires a QA (Quality Assurance) mindset ("what could break?")
- Documentation needs a writer's voice ("how do I explain this simply?")
- Code review demands a critical eye ("is this maintainable?")

Instead of re-explaining context every time, you'll create **specialists** — AI personas with specific expertise that you can switch to instantly. Each specialist knows its job before you even ask.

---

## step: what-are-agents
### title: Step 22: What Are Custom Agents?

Instead of one general-purpose GitHub Copilot, you can create **specialists** — think of these as team members with specific expertise.

**Examples of specialists:**
• **test-agent** → Quality assurance (writing and running tests)
• **docs-agent** → Technical writing (creating documentation)
• **review-agent** → Code review (checking quality and best practices)

**How to use them:**
• **In VS Code:** Click the **agent picker** in the chat input area (next to the model picker) and select your agent

**Built-in agents (these come with VS Code):**

- **Agent** — Autonomous tasks: AI decides what to do and does it
- **Plan** — Complex tasks: AI creates a step-by-step plan first
- **Ask** — Questions only: AI answers but doesn't change files
- **Edit** — Targeted edits: AI modifies specific code you select

**Your custom agents** (like test-agent, docs-agent) appear in the same picker alongside the built-in ones.

💡 **Choosing the right mode**: Use **Agent** when you want AI to figure out the approach, **Plan** for bigger features where you want to review first, **Ask** when you just need an explanation, and **Edit** when you know exactly what file needs to change.

💡 **Note**: Custom agents were previously called "chat modes" in earlier VS Code versions. If you see references to `.chatmode.md` files, they're the same feature with the old name.

## step: understand-agents-md
### title: Understanding AGENTS.md (The Open Standard)

Before we create custom agents, let's understand `AGENTS.md` — a file you already created in Part 3.

**README vs AGENTS.md:**
- **README.md** is for humans: project description, how to contribute, quick start
- **AGENTS.md** is for AI agents: build commands, test steps, coding standards

Think of `AGENTS.md` as onboarding documentation for an AI teammate. It tells the AI everything a new developer would need to know to start working.

**AGENTS.md is an open standard:**
- Used by 60,000+ open source projects
- Works across many AI tools: GitHub Copilot, Cursor, Windsurf, Devin, and more
- Your instructions aren't locked into one tool

**What belongs in AGENTS.md:**

- **Project context** — What is this? (e.g., "Frontend-only recipe sharing app")
- **Build commands** — How to run it (e.g., "Open index.html in browser")
- **Test commands** — How to verify (e.g., "Run `npm test` before committing")
- **Code style** — Standards to follow (e.g., "Use TypeScript strict mode")
- **What NOT to do** — Common mistakes to avoid (e.g., "Don't add backend services")

💡 **The AI reads this automatically** — you don't need to paste it into chat. Just keep the file updated.

## step: agents-md-tips
### title: AGENTS.md Best Practices

**Keep it actionable:**
```markdown
## Build and Test
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test`
- Always run tests before committing
```

**Include exact commands that work:**
AI agents will actually try to run these commands. If they fail, the agent gets confused. Test your commands!

**For larger projects:** Use nested AGENTS.md files
- Put one AGENTS.md at the project root
- Add additional AGENTS.md files in subfolders for specific packages
- The closest file to where AI is working takes precedence

**Example from real projects:**
The OpenAI repository has 88+ AGENTS.md files — one per major component. Each gives context specific to that area.

**Relationship to copilot-instructions.md:**
- `AGENTS.md` → High-level project context (build, test, architecture)
- `.github/copilot-instructions.md` → Detailed coding rules (do/don't do)

Both are read automatically. They complement each other.

## step: create-agents-folder
### title: Step 23: Create the Agents Folder

Custom agents live in a special folder in your project. Let's create the structure first.

After this prompt, you'll have a `.github/agents/` folder ready to hold your specialist definitions.

Copy this into GitHub Copilot chat:

:::prompt
number: 17
title: Create agents folder
---
Create a folder at .github/agents/ if it doesn't exist.
:::

## step: create-test-agent
### title: Step 24: Create Your First Agent (Test Specialist)

Your first custom agent will be a QA specialist. It knows how to create test plans, verify requirements, and identify edge cases — without you explaining what testing means.

After this prompt, you'll have a test-agent that appears in your agent picker.

Copy this into GitHub Copilot chat:

:::prompt
number: 18
title: Create test agent
---
Create a file at .github/agents/test-agent.agent.md with these contents:

---
name: test-agent
description: QA specialist for testing the {{projectName}}. Use this agent to write tests, create test plans, and verify requirements.
tools: ['search', 'problems', 'fetch']
---

# Test Agent

You are a QA Engineer specializing in web application testing. Your job is to ensure the {{projectName}} works correctly.

## Your Responsibilities
1. Create test plans based on specs/PRD.md requirements
2. Write manual test checklists
3. Verify each requirement has test coverage
4. Identify edge cases and potential bugs

## Your Process
1. First, read specs/PRD.md to understand all requirements
2. Create a test plan covering each requirement
3. For each test, include:
   - Test ID (T1, T2, etc.)
   - Related requirement (R1, R2, etc.)
   - Steps to perform
   - Expected result
   - Pass/Fail status

## Your Rules
- Never modify source code in app/ folder
- Only create files in tests/ folder
- Always map tests back to specific requirements
- Include both positive tests (it works) and negative tests (it handles errors)

## Test Categories to Cover
- Visual: Does it look correct?
- Functional: Do features work?
- Data: Is information displayed correctly?
- Interaction: Do clicks and inputs work?
- Edge cases: What happens with unusual inputs?

## Output Format
Always output test plans as markdown checklists that can be used for manual testing.
:::

## step: use-test-agent
### title: Step 25: Use Your Test Agent Immediately

Let's use your new agent right away to see the value. You'll switch to the test-agent and ask it to create a test plan — it already knows how.

**In VS Code:** Click the **agent picker** in the chat input area (next to the model picker) and select **test-agent**.

After this prompt, you'll have a comprehensive test plan covering all your requirements.

Copy this into GitHub Copilot chat:

:::prompt
number: 19
title: Test agent task
---
Create a comprehensive test plan for the {{projectName}}. 

Read specs/PRD.md first, then create a test checklist in tests/test-plan.md that covers every requirement.

Include tests for all interactive features like filters, detail panels, editing capabilities, and data persistence.
:::

Check that `tests/test-plan.md` was created. The test-agent created a complete test plan without you explaining what testing means or how to structure it — because the agent already knows its job.

### ✅ Quick Check

- [ ] `tests/test-plan.md` exists
- [ ] Test plan covers requirements R1-R12
- [ ] Each test has steps and expected results

---

## step: create-docs-agent
### title: Step 26: Create a Docs Agent

Your second specialist focuses on documentation. It writes for non-technical users, uses simple language, and follows consistent templates.

After this prompt, you'll have a docs-agent for creating user guides and READMEs.

Copy this into GitHub Copilot chat:

:::prompt
number: 20
title: Create docs agent
---
Create a file at .github/agents/docs-agent.agent.md with these contents:

---
name: docs-agent
description: Documentation specialist for creating and maintaining project documentation. Use this agent to write READMEs, user guides, and technical docs.
tools: ['search', 'fetch', 'editFiles']
---

# Documentation Agent

You are a Technical Writer specializing in clear, user-friendly documentation.

## Your Responsibilities
1. Create and maintain README.md
2. Write user guides for the {{projectNameLower}}
3. Document features and how to use them
4. Keep documentation in sync with specs/PRD.md

## Your Writing Style
- Write for non-technical users
- Use short sentences and paragraphs
- Include screenshots or descriptions of what users will see
- Use numbered steps for instructions
- Avoid jargon — if you must use technical terms, explain them

## Document Templates

### README Structure
1. Project name and one-line description
2. Screenshot or demo link
3. Features list
4. How to use it
5. How to contribute (if applicable)

### User Guide Structure
1. Getting started
2. Feature walkthrough
3. Tips and tricks
4. Troubleshooting

## Your Rules
- Never modify code files
- Keep documents under 2 pages when possible
- Always include a "Last Updated" date
- Verify documentation accuracy against actual app behavior
:::

## step: create-review-agent
### title: Step 27: Create a Review Agent

Your third specialist is a code reviewer. It checks for quality, accessibility, and adherence to your project rules — providing constructive feedback with severity levels.

After this prompt, you'll have a review-agent for code quality checks.

Copy this into GitHub Copilot chat:

:::prompt
number: 21
title: Create review agent
---
Create a file at .github/agents/review-agent.agent.md with these contents:

---
name: review-agent
description: Code reviewer for maintaining quality standards. Use this agent to review code changes, suggest improvements, and check for issues.
tools: ['search', 'problems', 'usages']
---

# Code Review Agent

You are a Senior Developer conducting code reviews for the {{projectName}}.

## Your Review Checklist

### 1. Requirements Compliance
- [ ] Does the code implement what's specified in specs/PRD.md?
- [ ] Are all acceptance criteria met?

### 2. Code Quality
- [ ] Is the code readable and well-organized?
- [ ] Are variable and function names meaningful?
- [ ] Are there helpful comments?

### 3. Best Practices
- [ ] Does it follow the rules in .github/copilot-instructions.md?
- [ ] Does it follow path-specific instructions?
- [ ] Is there any code duplication that should be refactored?

### 4. Potential Issues
- [ ] Are there any bugs or logic errors?
- [ ] Are edge cases handled?
- [ ] Is error handling in place?

### 5. Accessibility
- [ ] Can it be used with keyboard only?
- [ ] Are there proper labels and ARIA attributes?

### 6. Performance
- [ ] Are there any obvious performance issues?
- [ ] Is the code efficient?

## Your Output Format
For each review, provide:
1. **Summary**: One paragraph overview
2. **What's Good**: List of positives
3. **Issues Found**: List of problems (with severity: Low/Medium/High)
4. **Suggestions**: Recommended improvements
5. **Verdict**: Approve / Request Changes / Needs Discussion

## Your Rules
- Be constructive, not critical
- Explain why something is an issue, not just that it is
- Provide specific suggestions, not vague feedback
- Prioritize issues by importance
:::

💡 **Advanced — Tool Restrictions**: Each agent's `tools:` list controls what it can do. For example, **test-agent** uses `search`, `problems`, `fetch` (read-only), **docs-agent** uses `editFiles` (can create/modify docs), and **review-agent** uses `search`, `problems`, `usages` (read-only for safe reviews). You can also add a `model:` field to force a specific model.

## step: handoffs-advanced
### title: Advanced: Chain Agents with Handoffs

💡 **Optional:** Skip this if you're new to custom agents.

Handoffs let you create guided workflows that transition between agents. After a response completes, handoff buttons appear that let you move to the next agent with context preserved.

**Example workflow:** Planning → Implementation

Add this to a planning agent's frontmatter:

```yaml
---
name: planner
description: Generate implementation plans
tools: ['search', 'fetch']
handoffs:
  - label: Start Implementation
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
---
```

When the planning agent finishes, users see a "Start Implementation" button that switches to the implementation agent with the plan as context.

## step: use-docs-agent
### title: Step 28: Use Your Docs Agent

Now try the docs agent to create a user guide. Switch to the docs-agent and ask it to document your project for new users.

**In VS Code:** Click the **agent picker** in the chat input area (next to the model picker) and select **docs-agent**.

After this prompt, you'll have a beginner-friendly user guide.

Copy this into GitHub Copilot chat:

:::prompt
number: 22
title: Docs agent task
---
Create a user guide for the {{projectName}}.

Read specs/PRD.md and look at app/index.html to understand what the dashboard does.

Create a file called docs/USER-GUIDE.md that explains:
1. What the {{projectNameLower}} is for
2. How to view the data items
3. How to filter by status
4. How to view and edit details
5. How to reset the data

Write it for someone who has never seen the app before.
:::

Check that `docs/USER-GUIDE.md` was created with clear, simple explanations of your app's features.

## step: use-review-agent
### title: Step 29: Use Your Review Agent

Finally, have your review agent check the code quality. It will evaluate your implementation against requirements and project rules.

**In VS Code:** Click the **agent picker** in the chat input area (next to the model picker) and select **review-agent**.

After this prompt, you'll have a code review documenting what's good and what could improve.

Copy this into GitHub Copilot chat:

:::prompt
number: 23
title: Review agent task
---
Conduct a code review of app/index.html.

Check the code against:
1. The requirements in specs/PRD.md
2. The rules in .github/copilot-instructions.md
3. The frontend rules in .github/instructions/app.instructions.md

Create your review report in docs/CODE-REVIEW.md
:::

Check that `docs/CODE-REVIEW.md` was created with a summary, positives, issues, and suggestions.

### ✅ Checkpoint: Your Agent Team

- [ ] Three agents exist in `.github/agents/`
- [ ] `tests/test-plan.md` was created by test-agent
- [ ] `docs/USER-GUIDE.md` was created by docs-agent
- [ ] `docs/CODE-REVIEW.md` was created by review-agent

🎯 **You now have specialized AI teammates.** Each one knows its job and follows its rules automatically. Switch between them as needed — use test-agent for QA work, docs-agent for documentation, and review-agent for code quality.
