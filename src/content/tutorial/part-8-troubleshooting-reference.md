---
id: part-8
number: 8
title: Troubleshooting & Reference
subtitle: 5 minutes - Quick fixes and what's next
---

## step: final-structure
### title: Step 44: Your Final Project Structure

You've built a complete AI-native development setup. Here's what your project should look like — use this as a reference to verify everything is in place.

```text
{{folderName}}/
├── .github/
│   ├── copilot-instructions.md          ← Main project rules
│   ├── instructions/                     ← Path-specific rules
│   │   ├── app.instructions.md
│   │   ├── specs.instructions.md
│   │   └── tests.instructions.md
│   ├── agents/                           ← Custom AI personas
│   │   ├── test-agent.agent.md
│   │   ├── docs-agent.agent.md
│   │   └── review-agent.agent.md
│   └── skills/                           ← Reusable expertise
│       ├── verify-requirements/
│       │   └── SKILL.md
│       ├── add-feature/
│       │   └── SKILL.md
│       └── fix-bug/
│           └── SKILL.md
├── specs/                                ← Requirements
│   ├── PRD.md
│   └── Tasks.md
├── app/                                  ← Your application
│   └── index.html
├── tests/                                ← Test files
│   └── test-plan.md
├── docs/                                 ← Documentation
│   ├── USER-GUIDE.md
│   ├── CODE-REVIEW.md
│   └── VERIFICATION-REPORT.md
├── AGENTS.md                             ← Project overview for AI
└── README.md                             ← Project overview
```

## step: when-to-use-what
### title: Step 45: Quick Reference (When to Use What)

With so many tools available, it helps to know when to use each one. Use this reference when you're unsure which approach fits your task.

### Instruction Files

| File | Location | Purpose |
|------|----------|--------|
| `copilot-instructions.md` | `.github/` | Rules for ALL AI interactions |
| `*.instructions.md` | `.github/instructions/` | Rules for specific file types/folders |
| `AGENTS.md` | Repository root | Project context for AI agents |

### Agent Modes

| Mode | When to Use |
|------|-------------|
| **Agent** | Autonomous tasks — AI figures out the approach |
| **Plan** | Complex features — AI plans before coding |
| **Ask** | Questions only — no file changes |
| **Edit** | Targeted changes — you point to exact code |
| **Custom agents** | Specialized tasks (testing, docs, review) |

### Prompt Patterns

| Pattern | Example |
|---------|--------|
| Start general → specific | "Add a filter. It should be a dropdown with 3 options..." |
| Give examples | "Format like: 2024-01-15" |
| Break down tasks | Ask for structure, then data, then styling |
| Name things explicitly | "The filterItems function" not "this" |
| Reference files | "Look at app/index.html" |

### Skills

| Skill Location | Purpose |
|----------------|--------|
| `.github/skills/*/SKILL.md` | Workspace-specific workflows |
| User profile skills | Personal workflows across projects |
| `SKILLS.md` at root | Quick reference for common tasks |

## step: troubleshooting-agents
### title: Step 46: Troubleshooting

When things don't work as expected, check these common issues and solutions. Most problems have simple fixes.

### Agent & Mode Issues

**"GitHub Copilot isn't using my custom agent"**
• In VS Code: Select the agent from the **agent picker** in the chat input area (next to the model picker)
• On GitHub.com: Select the agent from the dropdown in the agents panel
• Check that the file is in `.github/agents/` with `.agent.md` extension
• Make sure the file has valid YAML frontmatter with `name:` and `description:`
• Restart VS Code or refresh the page to reload agents

**"Not sure which agent mode to use"**
• **Agent** → For autonomous tasks where AI decides the approach
• **Plan** → For complex features where you want to review the plan first
• **Ask** → For questions without making changes
• **Edit** → For targeted edits to specific files

**"AI seems slow or gives shallow answers"**
• Try a different model in the model picker
• Fast models work for simple tasks; reasoning models handle complex logic better
• Start a new chat — long conversations slow down responses

### Instruction File Issues

**"My skill isn't being loaded automatically"**
• In VS Code, enable the setting: `chat.useAgentSkills`
• Skills may need 5-10 minutes to be indexed after creation
• Check that `SKILL.md` is uppercase
• Check the `description:` field — it should describe when to use the skill
• Add more keywords to the `description:` field to improve matching
• Skills are loaded when relevant; try being more explicit in your prompt

**"Path-specific instructions aren't working"**
• Check the `applyTo:` field matches your folder paths
• Make sure files are in `.github/instructions/`
• Check the References section in chat responses to see which instruction files were used
• Restart the GitHub Copilot chat to reload instructions

**"AGENTS.md isn't being read"**
• Ensure the file is at the repository root (or in a parent folder of where you're working)
• The file must be named exactly `AGENTS.md` (uppercase)
• AGENTS.md is read automatically — no setting required

**"Need help creating instruction files?"**
• Ask GitHub Copilot: "Analyze this project and generate a copilot-instructions.md file"
• Then customize the generated file for your project

### Prompt & Response Issues

**"I'm getting inconsistent results"**
• Use `/clear` or start a new chat to reset context
• Be more specific in your prompts — avoid "this" and "it"
• Reference files explicitly: "Look at app/index.html"
• Delete failed attempts before trying again

**"AI keeps suggesting frameworks or complex solutions"**
• Check that `.github/copilot-instructions.md` exists and has your "Do NOT" rules
• Start a new chat — old context may be overriding your rules
• Be explicit: "Use plain HTML and JavaScript only, no frameworks"

**"AI suggestions don't match my coding style"**
• Add path-specific instructions for that file type (Part 4)
• Include an example of your preferred style in the instructions
• Keep a file open that shows your style — AI uses open tabs as context

**"AI keeps asking questions instead of just doing it"**
• Add "Don't ask me questions — just make your best decision" to your prompt
• Check your instruction files for conflicting rules that require clarification
• Be more specific about what you want in the original prompt

**"AI gives vague or incomplete answers"**
• Break your request into smaller steps
• Give examples of what you want
• Reference specific files with `#file:` mentions

### Validation Checklist

Before accepting AI-generated code:
- [ ] Does it compile/run without errors?
- [ ] Does it do what you asked?
- [ ] Did you test it in the browser?
- [ ] Does it follow your instruction files?
- [ ] Are there any obvious security issues (passwords, API keys)?

💡 **AI is powerful but not perfect.** Always review suggestions before accepting. You're the developer — AI is your assistant.

## step: whats-next
### title: Step 47: What's Next?

You've mastered the core techniques. Here's how to take your AI-native development skills further:

1. **Create more custom agents** for your specific needs (security-agent, performance-agent, etc.)

2. **Build more skills** for workflows you repeat often

3. **Share your setup** — All these files can be committed to git so your whole team benefits

4. **Explore MCP** (Model Context Protocol) — A standard for connecting AI assistants to external tools. With MCP, GitHub Copilot can query databases, call APIs, or control other applications. This is an advanced topic for when you want AI to work with systems beyond your code files.

🎉 **Congratulations!** You now have a professional-grade setup for AI-assisted development.

💡 **Remember**: The techniques you learned work for any project — not just web apps. Use spec-driven development, custom agents, and skills for documents, automation scripts, data analysis, and more.

## step: learn-more
### title: Step 48: Learn More

Ready to go deeper? These official resources provide comprehensive documentation for everything you learned:

**Official Documentation:**
- [Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Custom Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/customization)

**Community Resources:**
- [Awesome Copilot](https://github.com/github/awesome-copilot) — Community-contributed agents, skills, and instructions
