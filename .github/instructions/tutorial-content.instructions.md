---
description: "Use when writing or editing tutorial markdown content, adding steps, creating prompt blocks, or working with collapsible sections. Covers custom syntax for the AI-Native tutorial."
applyTo: "src/content/**/*.md"
---
# Tutorial Content Guidelines

## File Structure

Every content file starts with YAML frontmatter:

```yaml
---
id: part-1          # or module-a, module-f
number: 1
title: Build Something That Works
subtitle: 15 minutes - Create your first working prototype
---
```

## Step Format

Steps use H2 + H3 headers in sequence:

```markdown
## step: step-id-here
### title: Step 1: Human-Readable Title
```

- Step IDs are kebab-case
- Step titles include their number prefix (e.g., "Step 3:", "Step F2:", "Step A1:")
- Foundation track: `Step 1:`, `Step 2:`, etc.
- Advanced track: `Step A1:`, `Step B1:`, etc.
- Terminal track: `Step F1:`, `Step G1:`, etc.
- Steps are separated by `---` (horizontal rule)

## Prompt Blocks

Copy-paste prompts use this exact syntax:

```markdown
:::prompt
number: 3
title: Create the dashboard
---
Your prompt content here. Use {{templateVar}} for track-specific placeholders.
:::
```

- `number` is sequential within the part/module
- `title` is short and action-oriented
- Body comes after the `---` separator
- Close with `:::` on its own line
- Use `{{doublebraces}}` for template variables, never `{singlebraces}`

## Template Variables

See `.github/reference/template-variables.md` for the full list. Template variables are only resolved in the Foundation track. Use `{{doubleBraces}}` syntax, never `{singleBraces}`.

## Collapsible Sections

For supplementary info that shouldn't break reading flow:

```markdown
:::collapsible
title: What is a REPL?
---
Explanation content here.
:::
```

## Tone & Style

Follow the Experience Qualities in `AGENTS.md` (Empowering, Crystalline, Inviting).

- Use 💡 for tips: `💡 **Tip text:** Explanation`
- Use `> **Note:**` for important callouts
- Keep paragraphs short (2-4 sentences max)
- Address the reader as "you"
