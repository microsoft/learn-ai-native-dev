---
name: accessibility-checker
description: Review tutorial content for accessibility and inclusivity. Use when checking readability, removing jargon, ensuring content is beginner-friendly, verifying inclusive language, checking alt text for diagrams, or auditing for plain language compliance. Use for questions like "is this accessible?", "check readability", "too much jargon?", "beginner-friendly?". Ensures content remains empowering and inviting.
---

# Accessibility & Inclusivity Checker

This skill reviews AI-Native Development Tutorial content for accessibility, inclusivity, and beginner-friendliness, ensuring the tutorial remains "Empowering," "Crystalline," and "Inviting" as defined in AGENTS.md.

## When to Use This Skill

- When reviewing new tutorial content
- When editing content for clarity
- When receiving feedback about confusing sections
- During content audits
- Before publishing updates

## Experience Qualities

Follow the 3 qualities defined in `AGENTS.md`: **Empowering**, **Crystalline**, **Inviting**.

## Accessibility Checklist

### 1. Plain Language

**DO:**
- Use simple, everyday words
- Define technical terms on first use
- Keep sentences short (under 25 words)
- Use active voice

**DON'T:**
- Assume knowledge of programming jargon
- Use acronyms without explanation
- Write long, complex sentences
- Use passive voice unnecessarily

**Examples:**

| ❌ Avoid | ✅ Prefer |
|---------|----------|
| "Instantiate the class" | "Create a new [thing]" |
| "Execute the script" | "Run the script" |
| "The file is parsed by the system" | "The system reads the file" |
| "Utilize this functionality" | "Use this feature" |
| "Prior to commencing" | "Before you start" |

### 2. Jargon Handling

When technical terms are necessary, explain them:

```markdown
**Agent Mode** lets GitHub Copilot plan and execute multi-step tasks, creating and editing files.
```

**Terms that need explanation on first use:**
- Agent Mode
- MCP (Model Context Protocol)
- Frontmatter
- YAML
- API
- Repository
- Pull request
- CLI (Command Line Interface)

### 3. Inclusive Language

**DO:**
- Use "you" to address the reader directly
- Use gender-neutral language
- Avoid cultural assumptions
- Consider global audience (not everyone uses USD, Fahrenheit, etc.)

**DON'T:**
- Use "guys" or gendered terms for groups
- Assume familiarity with specific cultures
- Use idioms that don't translate well
- Make assumptions about reader's background

**Examples:**

| ❌ Avoid | ✅ Prefer |
|---------|----------|
| "Hey guys" | "Welcome" or "Let's get started" |
| "Any developer worth his salt" | "Any experienced developer" |
| "It's a piece of cake" | "It's straightforward" |
| "Let's hit the ground running" | "Let's start" |

### 4. Encouraging Tone

The tutorial should feel supportive, not intimidating:

**DO:**
- Celebrate progress: "🎉 Milestone Complete!"
- Normalize mistakes: "When things go wrong..."
- Provide reassurance: "Don't worry if..."
- Use encouraging emojis: 💡 ✅ 🎉

**DON'T:**
- Use phrases like "obviously" or "simply"
- Imply the reader should already know something
- Make them feel behind or slow
- Use discouraging language

**Phrases to avoid:**
- "Obviously..."
- "Simply do..."
- "Just..."
- "As everyone knows..."
- "It's easy to..."
- "You should already know..."

**Phrases to use:**
- "Here's how to..."
- "Let's..."
- "You'll learn to..."
- "This is a common pattern..."
- "Many people find it helpful to..."

### 5. Visual Accessibility

**Images and Diagrams:**
- All images must have descriptive alt text
- Diagrams should have text descriptions
- Don't rely on color alone to convey meaning
- Ensure sufficient contrast

**Code Blocks:**
- Always specify language for syntax highlighting
- Keep line lengths reasonable (under 80 chars when possible)
- Add comments explaining complex parts

**Formatting:**
- Use proper heading hierarchy (no skipping levels)
- Use lists for scannable content
- Provide adequate whitespace
- Use bold/italic sparingly

### 6. Cognitive Load

**DO:**
- Break complex tasks into numbered steps
- Limit steps to 5-7 items when possible
- Provide checkpoints for self-assessment
- Give one instruction at a time

**DON'T:**
- Overwhelm with too much information at once
- Mix multiple concepts in one section
- Skip steps that seem "obvious"
- Assume the reader remembers earlier content

### 7. Learning Progression

Content should build progressively:

```
Part 0: Setup (no prerequisites)
  ↓
Part 1-2: Basic concepts (builds on setup)
  ↓
Part 3-4: Intermediate concepts (builds on basics)
  ↓
Part 5-6: Advanced concepts (builds on intermediate)
  ↓
Part 7: Integration (applies everything)
  ↓
Part 8: Reference (for ongoing use)
```

Each part should:
- Start with "Why This Part Matters"
- Explain what they'll learn
- Build only on previously covered concepts
- End with a checkpoint

## Review Process

### Step 1: Reading Level Check

Target: 8th grade reading level (age 13-14)

Check for:
- Average sentence length
- Syllables per word
- Use of complex vocabulary

### Step 2: Jargon Audit

1. List all technical terms used
2. Verify each is explained on first use
3. Check if simpler alternatives exist

### Step 3: Tone Review

Read content aloud and check:
- Does it sound friendly?
- Would a beginner feel encouraged?
- Are instructions clear and actionable?

### Step 4: Structure Check

Verify:
- Headings follow hierarchy
- Steps are numbered
- Lists are used for multiple items
- Checkpoints exist at logical points

### Step 5: Visual Review

Check:
- All images have alt text
- Color is not the only indicator
- Code blocks have language specified
- Formatting is consistent

## Review Report Template

```markdown
## Accessibility Review

**File:** [filename]
**Reviewed:** [date]

### Reading Level
- Estimated grade level: [N]
- Complex sentences: [count]
- Suggestions: [list]

### Jargon Usage
| Term | First Use | Explained? | Suggestion |
|------|-----------|------------|------------|
| [term] | [location] | ✅/❌ | [suggestion] |

### Inclusive Language
| Issue | Location | Suggestion |
|-------|----------|------------|
| [issue] | [location] | [fix] |

### Encouraging Tone
- Discouraging phrases found: [list]
- Suggested replacements: [list]

### Visual Accessibility
- Images without alt text: [count]
- Color-only indicators: [count]
- Heading hierarchy issues: [list]

### Cognitive Load
- Sections over 7 steps: [list]
- Missing checkpoints: [list]

### Overall Assessment
- [ ] Beginner-friendly
- [ ] Inclusive language
- [ ] Encouraging tone
- [ ] Visually accessible
- [ ] Appropriate cognitive load
```

## Quick Fixes

### Replace Discouraging Language

Find and replace:
- "simply" → (remove or rephrase)
- "obviously" → (remove)
- "just" → (remove or use "only")
- "easy" → "straightforward" or (remove)

### Add Missing Explanations

For each technical term, add on first use:
```markdown
**[Term]** — [brief explanation]
```

### Add Alt Text

For images:
```markdown
![Description of what the image shows](path/to/image.png)
```

### Fix Heading Hierarchy

Ensure headings follow order: # → ## → ### (no skipping)
