---
id: part-6
number: 6
title: Agent Skills
subtitle: 20 minutes - Create reusable AI workflows
---

## step: why-skills-matter
### title: Why This Part Matters

As you work with AI, you'll notice a pattern: agents often lack the specialized context they need to do real work reliably. You end up re-explaining procedures, workflows, and best practices in every conversation.

**Skills solve this by giving agents access to procedural knowledge on demand.**

A skill is a folder containing instructions that teach an agent how to complete a specific task in a repeatable way — whether that's verifying requirements, adding features following your workflow, or debugging systematically. Skills load automatically when relevant, keeping context efficient.

---

## step: what-are-skills
### title: Step 30: What Makes Skills Different?

⚠️ **Setup Required:**
Agent Skills requires enabling in VS Code settings:
1. Open Settings (Ctrl+,)
2. Search for `chat.useAgentSkills`
3. Check the box to enable

Skills also work with GitHub Copilot CLI and the coding agent on GitHub.com.

---

**Skills vs. Custom Instructions vs. Custom Agents:**

- **Custom Instructions** — Always loaded for every conversation. Best for: coding standards, project rules
- **Custom Agents** — You select them manually from dropdown. Best for: specialized roles (testing, docs, review)
- **Agent Skills** — Loaded automatically when task matches. Best for: procedural workflows, repeatable processes

**How skills work (loading on demand):**

Instead of loading all skill instructions at once (which would slow things down), GitHub Copilot uses a smart system:

1. **At startup:** GitHub Copilot reads just the `name` and `description` of each skill — enough to know when it might help
2. **When relevant:** If your request matches a skill's description, the full instructions load
3. **On demand:** Additional files (scripts, examples) only load when actually needed

This keeps context efficient — skills only load when needed.

💡 **Open standard:** Agent Skills is an [open standard](https://agentskills.io/) adopted by GitHub Copilot, Claude, Gemini, and other AI tools. Skills you create are portable.

## step: create-skills-folder
### title: Step 31: Create the Skills Folder

Skills live in a dedicated folder. Let's create the structure that will hold your reusable workflows.

After this prompt, you'll have a `.github/skills/` folder ready for your skill definitions.

Copy this into GitHub Copilot chat:

:::prompt
number: 24
title: Create skills folder
---
Create this folder structure:
.github/skills/

This is where we'll store our Agent Skills.
:::

💡 **Where to put skills**: Use `.github/skills/` for project skills (recommended) or `~/.copilot/skills/` for personal skills that work across all your projects.

💡 **Legacy paths**: VS Code also recognizes `.claude/skills/` for backward compatibility, but use `.github/skills/` for new projects.

💡 **Skill naming rules**: Folder names should be lowercase with hyphens (e.g., `verify-requirements`), the file must be named exactly `SKILL.md` (uppercase), and the `name:` in frontmatter should match the folder name.

## step: create-verify-skill
### title: Step 32: Create a Verification Skill

Your first skill helps verify that your implementation meets all requirements. This is perfect for spec-driven development — it ensures features actually match what was specified.

After this prompt, you'll have a skill that loads automatically when you ask about verification.

Copy this into GitHub Copilot chat:

:::prompt
number: 25
title: Create verification skill
---
Create a folder at .github/skills/verify-requirements/

Then create a file at .github/skills/verify-requirements/SKILL.md with these contents:

---
name: verify-requirements
description: Verify that implementation meets all requirements in specs/PRD.md. Use this skill when checking if features are complete, validating implementations, or creating verification reports.
---

# Requirement Verification Skill

This skill helps verify that the {{projectName}} implementation meets all specified requirements.

## When to Use This Skill
- After implementing new features
- Before marking tasks as complete
- When creating verification reports
- When someone asks "does this meet the requirements?"

## Verification Process

### Step 1: Load Requirements
Read `specs/PRD.md` and extract all numbered requirements (R1, R2, R3, etc.)

### Step 2: Load Implementation
Read `app/index.html` and understand what's actually built

### Step 3: Test Each Requirement
For each requirement:
1. Identify the acceptance criteria
2. Check if the implementation meets it
3. Document evidence of compliance or gaps

### Step 4: Generate Report
Create a verification report with this structure:

## Verification Report Template

| Req | Description | Status | Evidence |
|-----|-------------|--------|----------|
| R1  | [description] | ✅ PASS / ❌ FAIL / ⚠️ PARTIAL | [what you observed] |

### Summary
- Total Requirements: [count]
- Passing: [count]  
- Failing: [count]
- Partial: [count]

### Failing Requirements Detail
For each failing requirement:
- **Requirement**: [ID and description]
- **Expected**: [what should happen]
- **Actual**: [what actually happens]
- **Fix Needed**: [what to change]
:::

💡 **How skills get loaded (on demand)**: Unlike custom agents (which you select manually), skills load automatically. At startup, GitHub Copilot reads just the `name` and `description` of each skill. When your request matches, the full SKILL.md loads. Additional files only load when referenced. This means many skills can be installed without slowing things down.

**The `description:` field is critical** — include keywords that match prompts where this skill should activate:

✅ Good: "Verify that implementation meets all requirements. Use for verification, validation, testing, checking features, quality assurance."

❌ Bad: "Helps with verification."

## step: test-verify-skill-now
### title: Step 33: Test Your Skill Immediately

Before creating more skills, let's verify this one works. You'll ask GitHub Copilot to verify requirements — it should automatically load and use your skill.

After this prompt, you'll have a verification report and confirmation that your skill loaded.

Copy this into GitHub Copilot chat:

:::prompt
number: 26
title: Test verification skill
---
Verify that the {{projectName}} meets all requirements.

Check each requirement in specs/PRD.md against the implementation in app/index.html.

Create a verification report at docs/VERIFICATION-REPORT.md (create the docs/ folder if it doesn't exist).
:::

Check the "References" section in GitHub Copilot's response — you should see your skill mentioned. The verification report should appear at `docs/VERIFICATION-REPORT.md`.

### ✅ Checkpoint

- [ ] Verification skill created in `.github/skills/verify-requirements/`
- [ ] GitHub Copilot loaded the skill when you asked about verification
- [ ] A verification report was generated

---

## step: create-feature-skill
### title: Step 34: Create a New Feature Skill

This skill provides a structured workflow for adding new features. It enforces your spec-driven approach: requirements first, then tasks, then implementation.

After this prompt, any "add feature" request will follow your defined process.

Copy this into GitHub Copilot chat:

:::prompt
number: 27
title: Create new feature skill
---
Create a folder at .github/skills/add-feature/

Then create a file at .github/skills/add-feature/SKILL.md with these contents:

---
name: add-feature
description: Structured workflow for adding new features to the {{projectName}}. Use this skill when implementing new functionality, adding capabilities, or extending the application.
---

# Add Feature Skill

This skill provides a structured workflow for adding new features while maintaining spec-driven development practices.

## When to Use This Skill
- When adding a new feature to the {{projectNameLower}}
- When implementing a new requirement
- When extending existing functionality

## Feature Addition Workflow

### Phase 1: Requirements (Do First!)

Before writing any code:

1. **Check if requirement exists** in `specs/PRD.md`
   - If yes: Note the requirement ID
   - If no: Add the requirement first

2. **Requirement format** (add to PRD.md if missing):
   ```
   R[number]: [Feature name]
       - [What the feature does]
       - How to verify: [specific test steps]
   ```

3. **Update specs/Tasks.md** with new task:
   ```
   [ ] Task: [description]
       Satisfies: R[number]
       Done when: [verification criteria]
   ```

### Phase 2: Implementation

Only after requirements are documented:

1. **Read existing code** in `app/index.html`
2. **Identify where new code should go**
3. **Implement the feature** following:
   - Rules in `.github/copilot-instructions.md`
   - Frontend rules in `.github/instructions/app.instructions.md`
4. **Test in browser** before marking complete

### Phase 3: Verification

After implementation:

1. **Test the feature** using verification steps from PRD
2. **Mark task complete** in `specs/Tasks.md`:
   - Change `[ ]` to `[x]`
   - Add to Progress Log

3. **Update verification report** (if exists)

## Feature Checklist Template

```markdown
## Feature: [Name]

### Requirements
- [ ] Requirement added to specs/PRD.md (R__)
- [ ] Task added to specs/Tasks.md

### Implementation  
- [ ] Code follows project instructions
- [ ] Code follows frontend instructions
- [ ] Feature works in browser

### Verification
- [ ] Tested using PRD verification steps
- [ ] Task marked complete in Tasks.md
- [ ] Progress log updated
```
:::

## step: create-bugfix-skill
### title: Step 35: Create a Bug Fix Skill

Your third skill handles bug fixes systematically. It ensures bugs are documented, fixes are minimal, and changes are verified.

After this prompt, bug fix requests will follow a structured workflow.

Copy this into GitHub Copilot chat:

:::prompt
number: 28
title: Create bug fix skill
---
Create a folder at .github/skills/fix-bug/

Then create a file at .github/skills/fix-bug/SKILL.md with these contents:

---
name: fix-bug
description: Structured workflow for fixing bugs in the {{projectName}}. Use this skill when something isn't working correctly, when tests fail, or when users report issues.
---

# Bug Fix Skill

This skill provides a structured workflow for identifying, fixing, and verifying bug fixes.

## When to Use This Skill
- When something isn't working as expected
- When a test fails
- When a user reports an issue
- When verification reveals a problem

## Bug Fix Workflow

### Phase 1: Understand the Bug

1. **Document the bug**:
   - What should happen? (expected behavior)
   - What actually happens? (actual behavior)
   - Steps to reproduce

2. **Identify related requirement**:
   - Which requirement in `specs/PRD.md` is affected?
   - What are the acceptance criteria?

3. **Locate the problem**:
   - Which file(s) contain the bug?
   - What code is responsible?

### Phase 2: Fix the Bug

1. **Make the minimal fix**:
   - Change only what's necessary
   - Don't refactor unrelated code
   - Don't add new features

2. **Follow project rules**:
   - Check `.github/copilot-instructions.md`
   - Check path-specific instructions

3. **Test the fix**:
   - Verify the bug is resolved
   - Verify nothing else broke

### Phase 3: Document and Verify

1. **Update Progress Log** in `specs/Tasks.md`:
   ```
   ### Bug Fix: [date]
   - Bug: [description]
   - Related: R[number]
   - Fix: [what was changed]
   - Verified: [how you tested it]
   ```

2. **Verify related features** still work

## Bug Report Template

```markdown
## Bug Report

**Summary**: [one-line description]

**Related Requirement**: R[number]

**Expected Behavior**: 
[what should happen]

**Actual Behavior**:
[what actually happens]

**Steps to Reproduce**:
1. [step 1]
2. [step 2]
3. [step 3]

**Severity**: Low / Medium / High / Critical

**Proposed Fix**:
[suggested solution]
```
:::

## step: test-verify-skill
### title: Step 36: Test the Add Feature Skill

Try adding a new feature using your skill workflow. The skill should automatically load and guide the process.

After this prompt, you'll have a new feature added following your spec-driven workflow.

Copy this into GitHub Copilot chat:

:::prompt
number: 29
title: Use add feature skill
---
Add a new feature to the {{projectNameLower}}: a "Last Updated" timestamp that shows when the data was last modified.

Follow the proper workflow for adding features.
:::

### ✅ Checkpoint: Skills Complete

- [ ] Three skills exist in `.github/skills/`
- [ ] Verification skill creates reports when asked
- [ ] Add-feature skill follows the spec-driven workflow
- [ ] Skills load automatically based on your prompts

🎯 **You now have reusable workflows.** These skills work across projects and save time on repetitive processes. Unlike custom agents (which you select manually), skills load automatically when your request matches their description.

## step: community-skills
### title: Step 37: Find Pre-Built Skills

You don't have to create every skill from scratch. The community has created skills you can download and customize for your projects.

**Community Resources:**
- **[github/awesome-copilot](https://github.com/github/awesome-copilot)** — Community collection of skills, agents, and prompts
- **[anthropics/skills](https://github.com/anthropics/skills)** — Reference implementations

**To use a shared skill:**
1. Download the skill folder from the repository
2. Copy it to your `.github/skills/` directory
3. Review and customize the SKILL.md for your project
4. Test it in chat

💡 **Security tip:** Always review shared skills before using them — check what they're designed to do. VS Code provides controls for script execution, including auto-approve options with configurable allow-lists.
