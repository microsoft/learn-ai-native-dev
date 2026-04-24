---
name: prompt-writer
description: Create properly formatted prompt blocks for AI-Native tutorials. Use when writing new prompts, adding prompts to steps, creating copy-paste instructions, or updating existing prompt blocks. Use for questions like "add a prompt", "write prompt for step X", "create :::prompt block". Ensures consistent numbering, title format, template variable syntax ({{projectName}}, {{colorCoding}}), and the exact structure used throughout the tutorial.
---

# Prompt Block Writer

This skill creates properly formatted prompt blocks that match the exact patterns used in the AI-Native Development Tutorial.

## When to Use This Skill

- When adding new prompts to tutorial content
- When creating exercises that users copy-paste
- When writing step-by-step instructions for AI
- When updating existing prompts
- When creating prompt examples for documentation

## Prompt Block Format

### Basic Structure

```markdown
:::prompt
number: N
title: Short descriptive title
---
The actual prompt content that users will copy into GitHub Copilot chat.

Include specific instructions, context, and expected outcomes.
:::
```

### Required Elements

1. **Opening marker:** `:::prompt` on its own line
2. **Metadata block:**
   - `number:` Sequential number — numeric for Foundation (`1`), letter-prefixed for Advanced/Terminal (`A3`, `F2`)
   - `title:` Brief, action-oriented title
3. **Separator:** `---` on its own line
4. **Content:** The actual prompt text
5. **Closing marker:** `:::` on its own line

### Terminal Meta-Prompts

Terminal prompts can include a **meta-prompt** — instructional context about the prompt itself — separated by `===`:

```markdown
:::prompt
number: G4
title: Build the tool system
---
The actual prompt to paste into the AI tool.

===

**Meta-prompt guidance:** This explains how to think about the prompt, why it's structured this way, or how to adapt it. This part is NOT copied by the user — it renders as instructional text.
:::
```

- Content before `===` → the copyable prompt
- Content after `===` → renders as context/explanation (not copied)
- The `===` must be on its own line with blank lines before and after

### Multiple Prompts Per Step (Advanced & Terminal)

Advanced and Terminal steps can contain multiple `:::prompt` blocks. Each is extracted at parse time and replaced with `:::prompt-placeholder:::`. Prompts render in order.

## Current Prompt Map

For canonical prompt numbers, ranges, and next available number, see `.github/reference/prompt-map.md`.

## Template Variables

For the full list of available variables, see `.github/reference/template-variables.md`.

Template variables are **only resolved in the Foundation track**. Advanced and Terminal content should not use `{{}}` syntax.

## Prompt Writing Guidelines

### Voice and Tone

**DO:**
- Use direct, imperative language: "Create", "Update", "Read"
- Be specific about file paths: `specs/PRD.md`, `app/index.html`
- Include expected outcomes: "After this, you should see..."
- Add constraints: "Keep under 7 tasks", "Don't ask questions"

**DON'T:**
- Use vague language: "maybe", "try to", "if possible"
- Assume context: Always specify file locations
- Leave outcomes ambiguous: Always say what success looks like

### Structural Patterns

**Pattern 1: Create File**
```markdown
:::prompt
number: N
title: Create [thing]
---
Create a file at [path] with these contents:

[content or structure]

[Any additional instructions]
:::
```

**Pattern 2: Update File**
```markdown
:::prompt
number: N
title: Update [thing]
---
Update [file path] to add/change [what].

Keep everything that's already there, but add:
[specific additions]

[Format or structure requirements]
:::
```

**Pattern 3: Read and Act**
```markdown
:::prompt
number: N
title: [Action] based on [source]
---
Read [source file] and [action] in [target file].

Rules:
- [Rule 1]
- [Rule 2]
- [Rule 3]

[Expected format or outcome]
:::
```

**Pattern 4: Verify/Test**
```markdown
:::prompt
number: N
title: Verify [thing]
---
[Check/Verify/Test] that [what you're checking].

Check each [item] against [criteria].

Create a [report type] at [path].
:::
```

## Adding a New Prompt

1. Determine the correct part and step for the prompt
2. Use the next available number (currently 35)
3. Follow the appropriate structural pattern
4. Use template variables where content varies by track
5. Run validation to confirm no duplicates or gaps
6. Update this skill's prompt map table

## Common Mistakes to Avoid

1. **Wrong number sequence** — Always check current max before adding
2. **Missing separator** — The `---` line between metadata and content is required
3. **Forgetting closing marker** — Must end with `:::` on its own line
4. **Hardcoding track-specific content** — Use template variables instead
5. **Vague titles** — Titles should describe the action clearly
