---
id: part-4
number: 4
title: Folder-Based Rules
subtitle: 15 minutes - Different rules for different folders
---

## step: why-folder-rules
### title: Why This Part Matters

Your global rules work great — but what if you want AI to behave differently in different folders? Real projects have distinct areas with distinct needs:

- Frontend code should use vanilla JavaScript
- Documentation should be written for beginners
- Test files need specific naming conventions

One rulebook can't handle all these contexts. This part teaches you to create **folder-aware AI** that adapts its behavior based on where it's working.

---

## step: path-problem
### title: Step 16: The Problem with One Rule File

Your `.github/copilot-instructions.md` applies to your **entire project**. But different parts of a project have different needs — and a single rule file can't express context-specific guidance.

**Imagine your project grows:**

```text
{{folderName}}/
├── app/              ← Frontend code (HTML, CSS, JS)
├── specs/            ← Requirements documents
└── tests/            ← Test files
```

**You might want:**
• **Frontend code**: "Use vanilla JavaScript, no frameworks"
• **Test files**: "Always use descriptive test names"
• **Specs**: "Keep documents under 1 page"

Path-specific instructions let you do exactly this.

## step: create-instructions-folder
### title: Step 17: Create the Instructions Folder

Path-specific instructions live in a special folder. You'll create three instruction files — one for each area of your project with different rules.

After this prompt, you'll have the folder structure ready for your path-specific rules.

Copy this into GitHub Copilot chat:

:::prompt
number: 12
title: Create instructions folder
---
Create a folder at .github/instructions/ if it doesn't exist.

Then create these three instruction files:

1. .github/instructions/app.instructions.md
2. .github/instructions/specs.instructions.md  
3. .github/instructions/tests.instructions.md

Leave them empty for now. Just create the structure.
:::

Check the sidebar — you should see `.github/instructions/` with three empty `.instructions.md` files inside.

## step: frontend-instructions
### title: Step 18: Add Frontend Instructions

Now you'll define rules that apply only when AI edits files in the `app/` folder. These rules enforce vanilla JavaScript, modern syntax, and accessibility standards.

After this prompt, AI will automatically follow frontend-specific rules when working on your app code.

Copy this into GitHub Copilot chat:

:::prompt
number: 13
title: Write frontend instructions
---
Edit .github/instructions/app.instructions.md with these contents:

---
applyTo: "app/**"
---

# Frontend Code Instructions

## Technology Rules
- Use vanilla JavaScript only (no React, Vue, or other frameworks)
- Use modern ES6+ syntax (const, let, arrow functions, template literals)
- Keep all code in single HTML files unless specifically asked to separate

## Styling Rules
- Use CSS variables for colors (define once like `--primary-color: #3B82F6`, use everywhere with `var(--primary-color)`)
- Mobile-first responsive design
- Minimum touch target size: 44x44 pixels

## Code Quality
- Add comments explaining "why", not "what"
- Use meaningful variable names (not x, y, temp)
- Handle errors gracefully with user-friendly messages

## Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (button, nav, main, etc.)
- Include ARIA labels where needed
:::

💡 **Important:** The `---` markers and `applyTo:` line are required. This is called "YAML frontmatter" — it tells GitHub Copilot which files these rules apply to.

## step: specs-instructions
### title: Step 19: Add Specs Instructions

Different rules for your requirements documents. These ensure PRD and task files stay concise, numbered, and written in beginner-friendly language.

After this prompt, documentation in the `specs/` folder will follow a consistent format.

Copy this into GitHub Copilot chat:

:::prompt
number: 14
title: Write specs instructions
---
Edit .github/instructions/specs.instructions.md with these contents:

---
applyTo: "specs/**"
---

# Specification Document Instructions

## Document Format
- Keep all documents under 1 page when possible
- Use simple, non-technical language
- Number all requirements (R1, R2, R3...)

## Required Sections for PRD
1. GOAL (2-3 sentences)
2. WHO USES IT
3. WHAT IT SHOWS
4. REQUIREMENTS (numbered, with verification steps)
5. DEMO SCRIPT

## Required Sections for Tasks
- Use checkbox format: [ ] or [x]
- Each task maps to requirement(s)
- Each task has "Done when:" verification

## Writing Style
- Write for someone who has never seen the project
- Avoid jargon and acronyms
- Include specific, testable criteria
:::

## step: test-instructions
### title: Step 20: Add Test Instructions

Finally, rules for test files you'll create later. These enforce consistent naming, test structure, and coverage requirements.

After this prompt, any tests AI creates will follow your conventions.

Copy this into GitHub Copilot chat:

:::prompt
number: 15
title: Write test instructions
---
Edit .github/instructions/tests.instructions.md with these contents:

---
applyTo: "tests/**"
---

# Test File Instructions

## Naming Conventions
- Test files: [feature].test.html or [feature].test.js
- Test names: should_[expected behavior]_when_[condition]

## Test Structure
- Arrange: Set up the test conditions
- Act: Perform the action being tested
- Assert: Verify the expected outcome

## Coverage Requirements
- Every requirement in specs/PRD.md needs at least one test
- Test both success and failure cases
- Test edge cases (empty data, maximum values, etc.)

## Manual Test Format
If creating manual test checklists:
- [ ] Test name
  - Steps: numbered list of actions
  - Expected: what should happen
  - Actual: (filled in during testing)
:::

## step: test-path-instructions
### title: Step 21: Verify Path Instructions Work

Let's verify the path-specific instructions are working. You'll ask AI to explain what rules apply to different folders — it should describe different rules for each.

After this prompt, AI should confirm it reads different instructions for `app/` vs `specs/`.

Copy this into GitHub Copilot chat:

:::prompt
number: 16
title: Test path-specific instructions
---
I want to add a new feature to my project. Before making any changes, tell me:

1. What instructions apply when you edit files in the app/ folder?
2. What instructions apply when you edit files in the specs/ folder?
3. Are these instructions different from each other?

Don't make any changes yet—just explain what you found.
:::

AI should describe the different rules for each folder — vanilla JavaScript for `app/`, simple language for `specs/`, and naming conventions for `tests/`.

## step: path-instructions-work
### title: See What Just Happened

🎯 **AI now follows different rules for different folders.**

When you edit frontend code, AI knows to use vanilla JavaScript. When you edit specs, AI knows to keep documents short and numbered. Each folder has context-aware assistance — and this scales beautifully as your project grows.

### ✅ Checkpoint

- [ ] Three instruction files exist in `.github/instructions/`
- [ ] AI correctly identifies different rules for `app/` vs `specs/`
- [ ] Each file has valid `applyTo:` frontmatter

💡 **Adding new folders**: As your project grows, add new instruction files for new areas. The pattern is always the same: create a file with `applyTo:` frontmatter matching the folder path.
