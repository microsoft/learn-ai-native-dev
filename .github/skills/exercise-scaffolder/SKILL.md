---
name: exercise-scaffolder
description: Generate consistent, high-quality coding exercises for AI-Native development tutorials. Use when creating hands-on exercises, coding challenges, practice problems, quizzes, labs, or skill-building activities. Use for questions like "create an exercise", "add practice activity", "build a challenge for Part X". Includes starter templates, solution patterns, hint progressions, and verification criteria.
---

# Exercise Scaffolder

This skill generates consistent coding exercises that follow the AI-Native Development Tutorial's pedagogical patterns.

## When to Use This Skill

- When creating practice exercises for learners
- When building skill-check challenges
- When designing hands-on activities
- When creating assessment materials
- When expanding tutorial content with exercises

## Exercise Types

### Type 1: Prompt Completion Exercise

Learners write a prompt to achieve a goal.

```markdown
## Exercise: [Title]

**Objective:** [What they'll accomplish]

**Starting Point:**
You have a project with:
- `specs/PRD.md` containing requirements R1-R6
- `app/index.html` with basic structure
- `specs/Tasks.md` with 3 incomplete tasks

**Your Task:**
Write a prompt that asks GitHub Copilot to [specific goal].

**Requirements:**
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

**Hints:**
<details>
<summary>Hint 1</summary>
[First hint - most general]
</details>

<details>
<summary>Hint 2</summary>
[Second hint - more specific]
</details>

<details>
<summary>Solution</summary>

:::prompt
number: X
title: [Title]
---
[Complete solution prompt]
:::

</details>

**Verification:**
After running your prompt:
- [ ] [Verification item 1]
- [ ] [Verification item 2]
```

### Type 2: Instruction File Exercise

Learners create or modify instruction files.

```markdown
## Exercise: [Title]

**Objective:** [What they'll accomplish]

**Scenario:**
Your team has asked you to [context]. Currently, GitHub Copilot [current behavior].

**Your Task:**
Create/modify `.github/[file]` to:
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

**Starting Template:**
```markdown
---
applyTo: "[pattern]"
---

# [Title]

## [Section 1]
[Your rules here]

## [Section 2]
[Your rules here]
```

**Test Your Solution:**
Ask GitHub Copilot: "[test prompt]"

**Expected Behavior:**
- GitHub Copilot should [expected 1]
- GitHub Copilot should NOT [expected 2]

<details>
<summary>Solution</summary>

[Complete solution file content]

</details>
```

### Type 3: Agent Creation Exercise

Learners create custom agents.

```markdown
## Exercise: [Title]

**Objective:** Create a custom agent for [purpose]

**Context:**
You need an AI specialist that can [capability].

**Requirements:**
Your agent must:
- [ ] Have a clear `description:` that explains when to use it
- [ ] Include `tools:` appropriate for its purpose
- [ ] Define a specific role and responsibilities
- [ ] Include a step-by-step process

**Agent Template:**
```markdown
---
name: [agent-name]
description: [When to use this agent]
tools: ['search', 'problems']
---

# [Agent Title]

You are a [role] specializing in [domain].

## Your Responsibilities
1. [Responsibility 1]
2. [Responsibility 2]

## Your Process
1. [Step 1]
2. [Step 2]
```

**Test Your Agent:**
1. Select your agent from the agent picker
2. Ask: "[test prompt]"
3. Verify the response [criteria]

<details>
<summary>Example Solution</summary>

[Complete agent file content]

</details>
```

### Type 4: Skill Creation Exercise

Learners create agent skills.

```markdown
## Exercise: [Title]

**Objective:** Create a skill for [workflow]

**Scenario:**
You frequently need to [repeated task]. Create a skill that automates this.

**Requirements:**
Your skill must:
- [ ] Have a `name:` following naming conventions (lowercase, hyphens)
- [ ] Have a `description:` with keywords for auto-activation
- [ ] Include step-by-step instructions
- [ ] Provide output format/template

**Skill Template:**
```markdown
---
name: [skill-name]
description: [When this skill should activate - include keywords]
---

# [Skill Title]

## When to Use This Skill
- [Trigger 1]
- [Trigger 2]

## Process
### Step 1: [Title]
[Instructions]

### Step 2: [Title]
[Instructions]

## Output Template
[Expected output format]
```

**Test Your Skill:**
Ask GitHub Copilot: "[prompt that should trigger skill]"

**Expected:**
- The skill should activate automatically
- Output should follow your template

<details>
<summary>Example Solution</summary>

[Complete skill file content]

</details>
```

## Exercise Components

### Learning Objectives

Every exercise should have clear objectives using action verbs:
- Create, Build, Implement (for creation tasks)
- Modify, Update, Extend (for modification tasks)
- Analyze, Evaluate, Verify (for review tasks)
- Debug, Fix, Troubleshoot (for problem-solving tasks)

### Difficulty Levels

**⭐ Beginner**
- Single concept
- Guided steps
- Complete template provided
- 5-10 minutes

**⭐⭐ Intermediate**
- Multiple concepts
- Partial guidance
- Some decisions required
- 15-20 minutes

**⭐⭐⭐ Advanced**
- Complex integration
- Minimal guidance
- Creative problem-solving
- 30+ minutes

### Hint Progression

Structure hints from general to specific:

1. **Conceptual hint:** Points to the right approach
2. **Structural hint:** Suggests the format or pattern
3. **Implementation hint:** Provides key details
4. **Near-solution hint:** Almost complete guidance

### Verification Criteria

Always include:
- Checkbox items for self-assessment
- Specific observable outcomes
- Test prompts to verify behavior
- Common mistakes to avoid

## Exercise Templates by Part

### Part 1-2 Exercises (Basics)
Focus on: Prompts, project structure, iterative development

### Part 3 Exercises (Rules)
Focus on: copilot-instructions.md, AGENTS.md, constraint setting

### Part 4 Exercises (Path-Specific)
Focus on: .instructions.md files, applyTo patterns, context-specific rules

### Part 5 Exercises (Agents)
Focus on: .agent.md files, agent selection, specialized roles

### Part 6 Exercises (Skills)
Focus on: SKILL.md files, auto-activation, workflows

### Part 7 Exercises (Integration)
Focus on: Full workflow, combining all techniques

## Complete Exercise Example

```markdown
## Exercise: Create a Security Review Agent

**Difficulty:** ⭐⭐ Intermediate
**Time:** 15 minutes
**Prerequisites:** Completed Part 5 (Custom Agents)

**Objective:** Create a custom agent that reviews code for security issues.

**Scenario:**
Your team needs to catch security problems before code is merged. Create an agent that specializes in finding security vulnerabilities.

**Requirements:**
Your security-agent must:
- [ ] Identify hardcoded secrets (API keys, passwords)
- [ ] Check for input validation issues
- [ ] Flag insecure dependencies
- [ ] Provide severity ratings (High/Medium/Low)
- [ ] Suggest fixes for each issue

**Starting Point:**
Create a file at `.github/agents/security-agent.agent.md`

<details>
<summary>Hint 1: Agent Structure</summary>
Start with the standard agent template:
- name, description, tools in frontmatter
- Role definition
- Responsibilities list
- Step-by-step process
</details>

<details>
<summary>Hint 2: Security Checklist</summary>
Include checks for:
- Hardcoded credentials
- SQL injection
- XSS vulnerabilities
- Insecure HTTP
- Exposed secrets in logs
</details>

<details>
<summary>Hint 3: Output Format</summary>
Define a clear report format:
| Severity | Issue | Location | Fix |
|----------|-------|----------|-----|
</details>

**Test Your Agent:**
1. Select security-agent from the agent picker
2. Ask: "Review app/index.html for security issues"
3. Verify you get a structured report

**Verification:**
- [ ] Agent appears in agent picker
- [ ] Agent identifies at least 3 security concern types
- [ ] Report includes severity ratings
- [ ] Fixes are suggested for each issue

<details>
<summary>Solution</summary>

```markdown
---
name: security-agent
description: Security specialist for code review. Use this agent to find vulnerabilities, check for hardcoded secrets, and identify security risks in code.
tools: ['search', 'problems', 'codebase']
---

# Security Review Agent

You are a Security Engineer specializing in web application security.

## Your Responsibilities
1. Find hardcoded secrets (API keys, passwords, tokens)
2. Identify input validation gaps
3. Check for XSS and injection vulnerabilities
4. Flag insecure patterns
5. Rate issues by severity

## Security Checklist
- [ ] No hardcoded credentials
- [ ] All user input is validated
- [ ] No innerHTML with user data
- [ ] HTTPS for all external requests
- [ ] No secrets in error messages or logs

## Your Process
1. Scan all code files for patterns matching secrets
2. Check input handling functions
3. Review data flow from user to output
4. Identify insecure dependencies
5. Generate severity-rated report

## Report Format
| Severity | Issue | File:Line | Recommendation |
|----------|-------|-----------|----------------|
| 🔴 High | [issue] | [location] | [fix] |
| 🟡 Medium | [issue] | [location] | [fix] |
| 🟢 Low | [issue] | [location] | [fix] |
```

</details>
```
