---
id: part-2
number: 2
title: Add Interactive Features
subtitle: 15 minutes - Make your project respond to clicks
---

## step: expand-requirements
### title: Step 8: Add More Features with a Single Prompt

Your static prototype is working — now let's make it interactive. Instead of manually updating your requirements document, you'll tell AI what new features you want and it will update everything for you.

After this prompt, your PRD will have new requirements for filters, detail views, and editing capabilities.

Copy this into GitHub Copilot chat:

:::prompt
number: 5
title: Add interactive requirements
---
Update specs/PRD.md to add more requirements for an interactive prototype.

Keep everything that's already there, but add new requirements R7 through R12:

{{requirements.r7Through12}}

Update the demo script to include these new features.
:::

Open `specs/PRD.md` to see the new requirements. You should see R7-R12 added with interactive features like filtering, detail panels, and editing.

💡 **AI extends existing work**: Notice how AI preserved your existing requirements while adding new ones. This pattern — "keep what's there, add this" — is useful for iterative development.

## step: update-tasks
### title: Step 9: Let AI Update the Task List

Now that your requirements have grown, your task list needs to grow too. AI will read the updated PRD and figure out what new tasks are needed — you don't have to plan it yourself.

After this prompt, your task list will have new items for each interactive feature.

Copy this into GitHub Copilot chat:

:::prompt
number: 6
title: Regenerate tasks
---
Read the updated specs/PRD.md and regenerate specs/Tasks.md with a complete task list.

Rules:
- Keep tasks that are already marked [x] as complete
- Add new tasks for requirements R7-R12
- Each task should be small and specific
- Each task maps to requirement(s)
- Each task has a "Done when:" verification step
- Keep total tasks under 12

Order the tasks logically (do simpler things before complex things).
:::

Open `specs/Tasks.md` to see the expanded task list. Previously completed tasks should still be marked [x], with new unchecked tasks added below.

💡 **Preserving progress**: By telling AI to keep completed tasks marked, you maintain a clear history of what's done and what's next.

## step: build-features
### title: Step 10: Build Features One at a Time

Here's the key pattern for reliable AI development: **one task at a time**. Instead of asking AI to build everything at once (which often produces errors), you'll work through tasks incrementally.

Use this prompt repeatedly — once for each task in your list. After each run, your prototype gains one new feature.

Copy this into GitHub Copilot chat:

:::prompt
number: 7
title: Implement next task (use multiple times)
---
Read specs/Tasks.md and find the next uncompleted task (marked with [ ]).

Implement ONLY that one task by editing the necessary files.

After implementing:
1. Mark that task as [x] complete in specs/Tasks.md
2. Add a "Progress Log" section at the bottom of specs/Tasks.md with:
   - What you changed
   - Which requirement this satisfies
   - How I can test it in my browser (specific steps)

Do not implement any other tasks—just this one.
:::

After each run, refresh your browser to see the new feature working. Check `specs/Tasks.md` to see the task marked complete and the progress log entry.

💡 **Repeat this prompt** for each remaining task. Run it 4-5 times to implement all your interactive features.

## step: handling-problems
### title: When Things Go Wrong

AI isn't perfect. Here's how to course-correct when something doesn't work as expected:

**Wrong task implemented?**
→ *"Wait, I asked for [specific task]. Please undo and implement only: [paste task]"*

**Something broke?**
→ *"The filter buttons work but the detail panel doesn't open. Fix the detail panel."*

**Not sure what changed?**
→ *"List every change you just made in bullet points."*

💡 Click **Discard** anytime and try a clearer prompt. The undo button is your friend.

## step: verify-all
### title: Step 11: Let AI Verify Everything Works

You've built many features — but do they all actually work? Instead of manually testing every requirement, ask AI to verify each one and create a report.

After this prompt, you'll have a verification table showing which requirements pass or fail, with evidence.

Copy this into GitHub Copilot chat:

:::prompt
number: 8
title: Verify everything
---
Read specs/PRD.md and check every requirement R1 through R12.

Add a "Verification Report" section at the bottom of specs/PRD.md with this format:

| Requirement | Status | Evidence |
|-------------|--------|----------|
| R1 | PASS or FAIL | One sentence explaining how you verified it |
| R2 | PASS or FAIL | One sentence explaining how you verified it |
... (continue for all requirements)

If any requirement is marked FAIL:
1. Explain what's missing
2. Propose the smallest fix
3. Implement the fix

After verification, update specs/Tasks.md to note that verification is complete.
:::

Open `specs/PRD.md` to see the verification report at the bottom. Most requirements should show PASS. If any show FAIL, AI will have proposed and implemented fixes.

💡 **Self-correcting workflow**: AI can identify its own gaps and fix them. This verification loop catches issues before you manually test.

## step: milestone-complete
### title: 🎉 Milestone Complete: Your Working Prototype

**Congratulations!** You've built a fully functional {{projectName}} that:

✓ Displays data visually with status colors
✓ Filters by category
✓ Opens detail views
✓ Allows editing
✓ Persists changes during your session

---

**What's next:**

Parts 3-7 teach you to **scale these techniques**:
- Make AI follow consistent rules across larger projects
- Create specialized AI helpers for testing, documentation, and code review
- Build reusable workflows that save time on repetitive tasks

---

### ✅ Checkpoint: Before Moving On

Verify your prototype works:
- [ ] Page loads and displays data with colored status indicators
- [ ] Filter buttons show only matching items
- [ ] Clicking an item opens a detail panel
- [ ] You can edit and save changes
- [ ] Verification report shows mostly PASS results
