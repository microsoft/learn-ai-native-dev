---
id: part-7
number: 7
title: Putting It All Together
subtitle: 15 minutes - Add a complete new feature
---

## step: challenge-intro
### title: Step 38: The Challenge

Now you'll use everything you've learned to add a complete new feature from start to finish. This exercise combines path-specific instructions, custom agents, agent skills, and the spec-driven workflow.

**You'll add a summary section showing:**
• Total number of items
• Total dollar amount (if applicable)
• Breakdown by status (Green/Yellow/Red)

By the end, you'll have practiced the full AI-native development cycle — the same process you can use for any feature in any project.

## step: choose-model
### title: Quick Tip: Choosing the Right AI Model

Before we start, notice the **model picker** and **agent picker** in the chat input area at the bottom of Chat view.

**Different models excel at different tasks:**

- **Fast models** — Best for quick completions and simple edits. Trade-off: less reasoning
- **Reasoning models** — Best for complex logic and architecture decisions. Trade-off: slower, more tokens

**For this exercise:**
- Use a **fast model** for the implementation steps (40-41)
- Use a **reasoning model** if you want better code review analysis (Step 43)

💡 **Don't overthink it:** The default model works fine for most tasks. Switch models when you notice the AI struggling with complex logic or when you want faster responses.

## step: update-requirements-challenge
### title: Step 39: Update Requirements

Following the spec-driven workflow, you start with requirements. Add the new summary feature to your PRD before writing any code.

After this prompt, your PRD will have R13-R14 for the summary feature, and Tasks.md will have corresponding tasks.

Copy this into GitHub Copilot chat:

:::prompt
number: 30
title: Add summary requirements
---
Update specs/PRD.md to add these new requirements:

R13: {{projectName}} summary section
    - Shows at the top of the {{projectNameLower}}
    - Displays: total item count, breakdown by status (Green/Yellow/Red)
    - How to verify: Summary shows accurate numbers matching the data

R14: Summary updates with filters
    - When a filter is active, summary shows filtered totals
    - How to verify: Apply "Red" filter, summary shows only red items

Then update specs/Tasks.md with tasks for these requirements.
:::

Check `specs/PRD.md` for the new R13-R14 requirements and `specs/Tasks.md` for the new tasks.

## step: implement-challenge
### title: Step 40: Implement the Feature

Now implement using the add-feature skill workflow. The skill will guide AI through the proper process.

After this prompt, you'll have a working summary section in your app.

Copy this into GitHub Copilot chat:

:::prompt
number: 31
title: Implement summary feature
---
Implement requirements R13 and R14.

Follow the add-feature skill workflow:
1. Requirements are already in specs/PRD.md ✓
2. Implement the summary section in app/index.html
3. Make sure it updates when filters change
4. Test in browser

Mark tasks complete when done.
:::

Refresh your browser to see the summary section. It should display totals and update when you apply filters.

## step: verify-challenge
### title: Step 41: Verify with Test Agent

Use your test agent to verify the implementation meets the requirements. Switch to your QA specialist.

**In VS Code:** Click the **agent picker** in the chat input area and select **test-agent**.

After this prompt, your test plan will include tests for the new summary feature.

Copy this into GitHub Copilot chat:

:::prompt
number: 32
title: Verify summary feature
---
Verify that requirements R13 and R14 are properly implemented.

Update the test plan in tests/test-plan.md to include tests for the new summary feature.

Then run through the verification and report results.
:::

Check that `tests/test-plan.md` now includes tests for R13-R14.

## step: document-challenge
### title: Step 42: Document the Changes

Use your docs agent to update the user guide with the new feature. Switch to your documentation specialist.

**In VS Code:** Click the **agent picker** in the chat input area and select **docs-agent**.

After this prompt, the user guide will explain the summary feature.

Copy this into GitHub Copilot chat:

:::prompt
number: 33
title: Document summary feature
---
Create docs/USER-GUIDE.md with information about the new summary feature (create the docs/ folder if it doesn't exist).

Add a section explaining:
- What the summary shows
- How it changes with filters
- How to interpret the numbers
:::

Check that `docs/USER-GUIDE.md` now includes a section about the summary feature.

## step: review-challenge
### title: Step 43: Review the Code

Finally, have your review agent check the implementation quality. Switch to your code review specialist.

**In VS Code:** Click the **agent picker** in the chat input area and select **review-agent**.

After this prompt, you'll have a code review documenting the quality of your changes.

Copy this into GitHub Copilot chat:

:::prompt
number: 34
title: Review summary implementation
---
Review the changes made to implement R13 and R14.

Focus on:
- Code quality
- Accessibility
- Performance (calculating totals)
- Following project instructions

Create docs/CODE-REVIEW.md with your review findings.
:::

Check that `docs/CODE-REVIEW.md` includes feedback on the summary feature implementation.

## step: capstone-complete
### title: 🎉 Capstone Complete!

**You just added a complete feature using the full AI-Native workflow:**

✓ Updated requirements in specs/PRD.md
✓ Created tasks in specs/Tasks.md
✓ Implemented the feature with Agent mode
✓ Verified with your test-agent
✓ Documented with your docs-agent
✓ Reviewed with your review-agent

This is the complete cycle. Every new feature you add — in any project — can follow this same pattern.

### ✅ Final Checkpoint

- [ ] Summary section appears at the top of your {{projectNameLower}}
- [ ] Summary updates when filters are applied
- [ ] Test plan covers the new requirements
- [ ] User guide explains the summary feature
- [ ] Code review is documented

💡 **What you learned**: The AI-native development cycle is: requirements → tasks → implementation → verification → documentation → review. Your custom agents and skills make each step faster and more consistent.
