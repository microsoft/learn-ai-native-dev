---
description: "Use when writing or editing Advanced track content (Modules A–E). Covers multi-prompt syntax, letter-prefixed step numbering, and diagram integration."
applyTo: "src/content/advanced/**"
---
# Advanced Track Content Guidelines

## File Structure

Each module starts with YAML frontmatter:

```yaml
---
id: module-a
number: 1
title: MCP Servers
subtitle: 45 minutes — Build and integrate MCP servers
---
```

## Step Format

Steps use letter-prefixed numbers:

```markdown
## step: step-id-here
### title: Step A1: Human-Readable Title
```

- Prefix matches the module letter (A, B, C, D, E)
- Step IDs are kebab-case, unique within the Advanced track
- No template variables — content is literal (no `{{projectName}}`)

## Multiple Prompts Per Step

Advanced steps can contain multiple `:::prompt` blocks. Each is extracted and replaced with `:::prompt-placeholder:::` at parse time.

```markdown
:::prompt
number: A3
title: Create the MCP server
---
Prompt content here.
:::
```

Prompt numbers use the module letter prefix (A1, A2, B1, B2, etc.).

## Diagram Blocks

Reference registered diagrams:

```markdown
:::diagram mcp-architecture
:::
```

The diagram name must have a matching `case` in `StepCard.tsx` `renderBlock()`.

## Collapsible Sections

```markdown
:::collapsible
title: What is MCP?
---
Explanation content here.
:::
```

## Tone

Follow the Experience Qualities in `AGENTS.md` (Empowering, Crystalline, Inviting). Address the reader as "you." Keep paragraphs short.
