# Contributing to AI-Native Development Tutorial

This tutorial is **community-driven and constantly evolving** — AI-Native development is a moving target, and we want this content to move with it. Whether you have 5 minutes or 5 hours, our [agents and skills](agents/) do most of the heavy lifting.

> 🚀 **Visual front door:** open [`/contribute`](https://learn-ai-native-dev.example/contribute) on the live site for an interactive picker. This document is the deeper reference.

---

## Pick the shape that fits

There are three contribution shapes. Each has its own issue template, agent, and slash-prompt — so the work is matched to the right tool.

### 🟢 Tiny — fix a typo, update a version, clarify a sentence

No issue needed. Edit the file, run `npm run build`, open a PR.

For anything more than ~20 lines, escalate to a Medium contribution.

### 🟡 Medium — improve content, add an example, refresh stale info

Open one of these issue templates. The form fields are read directly by the matching agent.

| Want to… | Issue template | Agent |
|---|---|---|
| Add a project example for any audience | [Add an example](ISSUE_TEMPLATE/add-example.yml) | [`@author`](agents/author.agent.md) + [`track-generator`](skills/track-generator/SKILL.md) |
| Fix or improve a specific file | [Improve content](ISSUE_TEMPLATE/improve-content.yml) | [`@author`](agents/author.agent.md) (quick-edit mode) |
| Report stale tool versions / broken links / deprecations | [Report stale content](ISSUE_TEMPLATE/report-stale-content.yml) | [`@content-health`](agents/content-health.agent.md) → [`@researcher`](agents/researcher.agent.md) |

In your editor, run the matching slash-prompt:

```
/add-example     → scaffolds a new ExampleTrack entry
/fix-content     → applies a scoped edit
/refresh-content → audits + updates outdated information
```

### 🔴 Larger — propose a new module or path

**Open an issue first** — let the curriculum agents shape scope before you write 2,000 lines.

| Want to… | Issue template | Agent flow |
|---|---|---|
| Add a module to an existing path | [Propose a topic](ISSUE_TEMPLATE/propose-topic.yml) | [`@author`](agents/author.agent.md) → [`@reviewer`](agents/reviewer.agent.md) |
| Propose a brand-new community path | [Propose a topic](ISSUE_TEMPLATE/propose-topic.yml) | [`@author`](agents/author.agent.md) → [`@reviewer`](agents/reviewer.agent.md) |

Slash-prompt: `/propose-topic`

> New paths land as `community` status and **ship right away** — no curriculum gatekeeping. Promotion to `official` is a separate, lightweight PR. See [CONTENT_LIFECYCLE.md](CONTENT_LIFECYCLE.md).

---

## How a contribution flows

```
1. Open issue           Form template guides the questions an agent will need.
2. Open the repo in VS Code   The primary contribution surface. The agent runs
                              against your local GitHub Copilot subscription —
                              no extra cost, no extra setup.
3. Run a slash-prompt   /add-example, /fix-content, /refresh-content, /propose-topic
                        — each one parses the matching issue body automatically.
4. Review the diff      Agent scaffolds files & runs `npm run build`.
5. Open PR              CI's agent bot runs @reviewer + @docs-auditor and posts
                        a single structured comment with verdict + checks.
6. Ship                 Maintainer merges. Community paths/examples are live immediately.
```

> **No VS Code?** Slash-prompts are still the canonical path — install VS Code + Copilot if you can. Drive-by browser contributions through a hosted UI are no longer supported in this repo.

---

## Contributor License Agreement (CLA)

Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [https://cla.opensource.microsoft.com](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately. You will only need to do this once across all repos using the Microsoft CLA.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com).

## Licensing

By contributing, you agree your contributions will be licensed under the project's dual-license model:

- **Code contributions** — [MIT License](../LICENSE)
- **Documentation and tutorial content** (under `src/content/` and other Markdown) — [Creative Commons Attribution 4.0 International (CC BY 4.0)](../LICENSE-DOCS)

Source files added by code contributors should include the standard Microsoft MIT header:

```ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
```

## Reporting Security Issues

Do **not** report security vulnerabilities through public GitHub issues. See [SECURITY.md](../SECURITY.md) for the proper disclosure process.

## Getting Started Locally

We follow the standard **fork & pull request** workflow used by most open-source projects on GitHub.

```bash
# 1. Fork microsoft/learn-ai-native-dev on GitHub (click "Fork" in the UI)

# 2. Clone YOUR fork
git clone https://github.com/<your-username>/learn-ai-native-dev.git
cd learn-ai-native-dev

# 3. Add the upstream remote so you can pull in latest changes
git remote add upstream https://github.com/microsoft/learn-ai-native-dev.git

# 4. Install and run
npm install
npm run dev

# 5. Create a topic branch, commit your changes, push to YOUR fork
git checkout -b my-change
git push origin my-change

# 6. Open a Pull Request from your fork → microsoft/learn-ai-native-dev (main)
```

To keep your fork up to date:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

Before opening a PR:

```bash
npm run build   # must succeed
npm run lint    # should be clean
```

You do **not** need write access to the `microsoft` org — PRs from forks are how all external contributions are merged.

## Code Standards

- **TypeScript** — strict types, no `any`
- **React** — functional components, hooks, named exports
- **Tailwind** — utility classes only; use `cn()` from `@/lib/utils` for conditional classes
- **Imports** — use `@/` alias (e.g., `@/components/ui/button`)
- **shadcn/ui** — prefer existing components in `src/components/ui/`

## Reference

- [AGENTS.md](../AGENTS.md) — project context for AI agents
- [AUTHORING.md](AUTHORING.md) — agent and skill cheat-sheet
- [CONTENT_LIFECYCLE.md](CONTENT_LIFECYCLE.md) — how statuses and promotion work
- [CONTRIBUTORS.md](../CONTRIBUTORS.md) — credits

## Questions?

- 💬 Open ended ideas → [GitHub Discussions](https://github.com/microsoft/learn-ai-native-dev/discussions)
- 🐛 Bugs → [Improve content](ISSUE_TEMPLATE/improve-content.yml) issue
- 🔒 Security → [SECURITY.md](../SECURITY.md)
