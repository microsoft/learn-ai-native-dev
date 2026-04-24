---
description: "Use when writing or editing Terminal track content (Modules F–H). Covers meta-prompt syntax, === separator, and terminal-specific conventions."
applyTo: "src/content/terminal/**"
---
# Terminal Track Content Guidelines

## File Structure

Each module starts with YAML frontmatter:

```yaml
---
id: module-f
number: 1
title: Terminal AI
subtitle: 30 minutes — Master AI-powered terminal workflows
---
```

## Step Format

Steps use letter-prefixed numbers:

```markdown
## step: step-id-here
### title: Step F1: Human-Readable Title
```

- Prefix matches the module letter (F, G, H)
- Some modules start at Step X0 (e.g., G0, H0 for spec steps)
- Step IDs are kebab-case, unique within the Terminal track
- No template variables — content is literal

## Multiple Prompts Per Step

Terminal steps can have multiple `:::prompt` blocks per step:

```markdown
:::prompt
number: F3
title: Configure custom commands
---
Prompt content here.
:::
```

## Meta-Prompts

Terminal prompts can include a **meta-prompt** section — instructions about the prompt itself — separated by `===`:

```markdown
:::prompt
number: G4
title: Build the tool system
---
The actual prompt to paste into the AI tool.

===

**Meta-prompt guidance:** This explains how to think about the prompt above, why it's structured this way, or how to adapt it.
:::
```

The content before `===` is the copyable prompt. The content after `===` renders as instructional context (not copied).

## Diagram Blocks

```markdown
:::diagram agentic-loop
:::
```

Available Terminal diagrams: `agentic-loop`, `provider-abstraction`, `skill-system-flow`, `spec-driven-cycle`.

## Tone

Follow the Experience Qualities in `AGENTS.md` (Empowering, Crystalline, Inviting). The Terminal track pages use a CRT-green theme but content tone stays consistent.
