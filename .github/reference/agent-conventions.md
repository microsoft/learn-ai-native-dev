# Agent Conventions

Shared rules for all tutorial agents. Every agent should follow these patterns.

## Context-First Workflow

In an existing codebase, **never start work without reviewing first**.

1. **Review** — Examine existing patterns, components, content, or architecture
2. **Identify** — Find similar implementations you can extend or follow
3. **Propose** — Describe your approach before making changes
4. **Implement** — Only after alignment with existing patterns

### DO

- Review existing code/content before creating new
- Follow established naming, file org, and style conventions
- Extend existing abstractions rather than creating parallel ones
- Check `package.json` / existing utilities before adding new ones
- Propose approach for significant changes

### DON'T

- Create new files when similar ones exist
- Introduce patterns that conflict with existing conventions
- Skip the review phase
- Implement before understanding the architecture

## Communication Protocol

When an agent receives a request, it should respond with a brief plan:

```json
{
  "understood": "Brief restatement",
  "approach": "How I'll handle it",
  "needs_from_others": ["Any handoffs needed"]
}
```

## Handoff Format

When handing work to another agent, include:
- What was done / what needs to happen next
- Specific files or locations involved
- Any constraints or decisions already made
