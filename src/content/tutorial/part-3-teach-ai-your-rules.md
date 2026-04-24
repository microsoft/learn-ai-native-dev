---
id: part-3
number: 3
title: Teach AI Your Rules
subtitle: 15 minutes - Make AI work the way you want
---

## step: why-rules-matter
### title: Why This Part Matters

Your prototype works, but here's a challenge you'll face as projects grow: AI can drift in unexpected directions.

**Try this experiment.** Ask GitHub Copilot:

> "Add a user login system to my app"

Watch what happens — AI will happily try to add authentication, maybe install packages, possibly create a backend server. That's not what you want for a simple prototype!

**Without guardrails, AI does whatever seems helpful.** This part teaches you to set boundaries that AI follows automatically — no need to repeat yourself in every prompt.

---

## step: agentic-intro
### title: Step 12: The Rules You'll Create

As you add more features, AI can make decisions you didn't intend. Understanding these patterns helps you write better rules.

**Without rules, AI might:**
- Add a database when you just want sample data
- Install React or Vue when you want plain HTML
- Restructure your entire file while fixing one small bug
- Add login screens or backend servers you never asked for
- Use different coding styles each time, making the code messy

**Real example:** You ask AI to "add a summary section" and it installs three JavaScript libraries, creates a Node.js backend, and rewrites your entire file structure.

**The fix:** Create rule files that AI reads automatically. Set them once, and AI stays on track for every future prompt.

**Rule files you’ll create:**
• `.github/copilot-instructions.md` — Rules GitHub Copilot follows automatically in all interactions
• `AGENTS.md` — Additional instructions specifically for GitHub Copilot coding agent (the autonomous background agent)

Both files are read automatically — you don't need to reference them in prompts.
**Click any file below to see what it does:**

:::diagram file-hierarchy
:::
💡 **Cross-platform standard:** `AGENTS.md` isn't just for GitHub Copilot — it's an open standard used by many AI coding tools. Your rules will work across different AI assistants.

---

### Prompt Patterns That Get Better Results

These patterns come from GitHub's official best practices. Use them whenever you talk to GitHub Copilot:

- **Start general → get specific** — Give the big picture first, then details. Example: "Create a filter feature. It should have a dropdown with Green/Yellow/Red options."
- **Give examples** — Show input/output samples. Example: "Format dates like: 05/02/2024"
- **Break complex tasks down** — One thing at a time. Instead of "build the whole app," ask for structure, then data, then styling
- **Avoid ambiguity** — Name things explicitly. Say "the `filterItems` function" not "this function"
- **Reference files** — Point to specific code. Use `#file:app/index.html` to reference a file, or mention "line 45 in app/index.html"

**Keep history clean:**
- Start a new chat for new tasks (old context can confuse AI)
- Delete failed attempts before trying again
- Use `/clear` to reset the conversation (slash commands like this trigger special actions)

💡 **Pro tip:** Ask GitHub Copilot to analyze your project and generate an instructions file for you, then customize it for your needs.

---

## step: create-instructions
### title: Step 13: Create Rules AI Follows Automatically

Now you'll create a rules file that AI reads at the start of every conversation. This is powerful: set your constraints once, and AI respects them forever — no reminding needed.

After this prompt, you'll have a `.github/copilot-instructions.md` file that keeps AI focused on your prototype approach.

Copy this into GitHub Copilot chat:

:::prompt
number: 9
title: Create Copilot instructions
---
Create a file at .github/copilot-instructions.md with rules for working in this project.

The instructions should include:

SECTION 1: Project Overview
- This is a {{projectName}} prototype
- The requirements are in specs/PRD.md
- The task list is in specs/Tasks.md
- The web app is in app/index.html

SECTION 2: How to Make Changes
- Always check specs/PRD.md before making changes
- Always update specs/Tasks.md when completing work
- Make small changes (one task at a time)
- Test changes by opening index.html in a browser

SECTION 3: Do NOT Do These Things
- Do not add a backend server or database
- Do not add login or user accounts
- Do not add external services or APIs
- Do not add secret keys or passwords
- Do not add frameworks like React or Vue
- Do not make changes that aren't in the requirements

SECTION 4: When Asked to Add New Features
- First, ask if it should be added to specs/PRD.md
- Then create a task in specs/Tasks.md
- Then implement following the normal process

Keep the file concise and easy to read.
:::

Check that `.github/copilot-instructions.md` was created. Open it to see your rules — these will now apply to every GitHub Copilot interaction in this project.

💡 **Rules persist across sessions**: Every time you open this project and chat with GitHub Copilot, it will read these rules first.

## step: test-rules
### title: Step 14: Test That AI Follows Your Rules

Let's prove it works. Ask for features that would normally trigger AI to add complexity — and watch it refuse based on your rules.

After this prompt, AI should explain which features are blocked and suggest alternatives that follow your constraints.

Copy this into GitHub Copilot chat:

:::prompt
number: 10
title: Test the rules
---
I want to add these features:
- User login system
- Database to store data
- AI that predicts outcomes

Tell me:
1. Which of these features are you allowed to add?
2. Which are you NOT allowed to add, and why?
3. What could you add instead that would improve the prototype while following the rules?

Don't make any changes yet—just explain.
:::

AI should identify that login, database, and external AI are all blocked by your rules. It should suggest simpler alternatives that fit a prototype approach.

## step: reflect-on-rules
### title: See What Just Happened

🎯 **AI followed your rules without you reminding it.**

It knew what was allowed and what wasn't — because you wrote clear rules in a file it checks automatically.

This works for any project: set your rules once, and AI follows them every time. You're in control.

### ✅ Checkpoint

- [ ] `.github/copilot-instructions.md` exists
- [ ] AI refused to add login/database when you tested it
- [ ] AI suggested alternatives that follow your rules

## step: create-guide
### title: Step 15: Create Coding Agent Instructions

The **GitHub Copilot coding agent** is a more advanced AI that works independently in the background — for example, creating code changes as a pull request (proposed changes that teammates can review before accepting). It's different from **Agent mode** in chat, which works interactively as you watch. The coding agent reads `AGENTS.md` for project context — think of it as onboarding documentation for an AI teammate.

After this prompt, you'll have an `AGENTS.md` file at the project root with build instructions and coding standards.

Copy this into GitHub Copilot chat:

:::prompt
number: 11
title: Create coding agent instructions
---
Create an AGENTS.md file in the root of the project.

This file provides instructions specifically for GitHub Copilot coding agent (the autonomous agent that creates pull requests).

Include:

1. PROJECT CONTEXT
   - This is a {{projectName}} prototype
   - Frontend-only, no backend or database
   - Requirements are in specs/PRD.md

2. BUILD AND TEST
   - No build step required — open app/index.html in browser
   - Test by checking all interactive features work
   - Use Reset button to restore sample data

3. CODING STANDARDS
   - Use vanilla JavaScript only (no frameworks)
   - Keep all code in single HTML file
   - Follow rules in .github/copilot-instructions.md

4. WHAT NOT TO DO
   - Do not add backend services
   - Do not add authentication
   - Do not install packages

Keep it concise — this guides GitHub Copilot's autonomous work.
:::

Check that `AGENTS.md` was created at the project root. This file complements your copilot-instructions.md by providing high-level project context.

💡 **Two files, different purposes**: `AGENTS.md` provides high-level project context (build, test, architecture), while `.github/copilot-instructions.md` contains detailed coding rules (do/don't do).

