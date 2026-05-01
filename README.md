<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=transparent&color=auto&height=1&section=header"/>
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=transparent&color=auto&height=1&section=header"/>
  <img alt="" src="https://capsule-render.vercel.app/api?type=transparent&color=auto&height=1&section=header" width="100%"/>
</picture>

<br/>

```
                                                                        
     █████╗ ██╗      ███╗   ██╗ █████╗ ████████╗██╗██╗   ██╗███████╗    
    ██╔══██╗██║      ████╗  ██║██╔══██╗╚══██╔══╝██║██║   ██║██╔════╝    
    ███████║██║█████╗██╔██╗ ██║███████║   ██║   ██║██║   ██║█████╗      
    ██╔══██║██║╚════╝██║╚██╗██║██╔══██║   ██║   ██║╚██╗ ██╔╝██╔══╝      
    ██║  ██║██║      ██║ ╚████║██║  ██║   ██║   ██║ ╚████╔╝ ███████╗    
    ╚═╝  ╚═╝╚═╝      ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝ ╚══════╝    
                  D  E  V  E  L  O  P  M  E  N  T                      
                                                                        
```

<sub>spec-driven development · agent-assisted workflows · agentic engineering</sub>

<br/>

<a href="https://lemon-mud-0ea992703.4.azurestaticapps.net"><img src="https://img.shields.io/badge/Launch_Tutorial-0a0a0a?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Launch Tutorial"/></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/Code-MIT-0a0a0a?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="Code: MIT License"/></a>
<a href="LICENSE-DOCS"><img src="https://img.shields.io/badge/Docs-CC--BY--4.0-0a0a0a?style=for-the-badge&logo=creativecommons&logoColor=white" alt="Docs: CC BY 4.0"/></a>
<a href="#-contributing"><img src="https://img.shields.io/badge/Contribute-0a0a0a?style=for-the-badge&logo=github&logoColor=white" alt="Contribute"/></a>
<a href="https://github.com/microsoft/learn-ai-native-dev/pulls"><img src="https://img.shields.io/badge/PRs_Welcome-0a0a0a?style=for-the-badge&logo=gitpullrequest&logoColor=white" alt="PRs Welcome"/></a>

<br/><br/>

```
  SPEC-DRIVEN DEV                                    AGENTIC ENGINEERING
  ─────────────────────────── ·  ·  · ──────────────────────────────────

  Write clear specs.               Orchestrate AI agents.
  Set rules and instructions.      They write, test, and review.
  AI follows your lead.            You direct the journey.

  ░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████
  ─────────────────────────────────────────────────────────────────────▶
  start here                                          you are here
```

<br/>

> **Build _with_ AI, not just _using_ it.**
>
> An open-source curriculum shaped by the community — because we're all learning this together.

<br/>

</div>

---

## 🧭 What Is This?

Software development is being rewritten in real time. The industry has moved rapidly — from casual "vibe coding" (prompting AI and accepting whatever comes out) to **AI-native development**: a disciplined practice where developers orchestrate AI agents with clear specs, structured workflows, and human oversight.

**AI-native development** isn't about replacing developers — it's about fundamentally changing *how* you build. You write specs instead of boilerplate, define rules instead of repeated patterns, and direct agents instead of typing every line. The result: faster iteration, higher quality, and more time spent on design decisions that matter.

This tutorial starts you at **spec-driven development** from day one and progresses through agent-assisted workflows to full **agentic engineering** — where you define the destination and ensure the quality of the journey.

**Not theory — hands-on techniques** you can use today with GitHub Copilot, Claude, and any AI coding tool.

> **This repo isn't just a website — it's a contribution platform.** The deployed site hosts the content; this repository exists so the community can shape what AI-native development means as we all learn together.

### 🎯 Three Learning Tracks

| Track | What You'll Learn |
|:------|:------------------|
| **🏗️ Foundation** | Spec-driven prompts, instruction files, custom agents, reusable skills, full build-verify-ship cycle |
| **⚡ Advanced** | MCP servers, GitHub Coding Agent, agent orchestration, AI testing, capstone project |
| **💻 Terminal** | Terminal-native AI, building agents from scratch, CI/CD pipelines with AI |

---

## 🚀 Quick Start

```bash
git clone https://github.com/microsoft/learn-ai-native-dev.git
cd learn-ai-native-dev
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start learning.

| Command | Purpose |
|:--------|:--------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

### Tech Stack

```
React 19  ·  TypeScript  ·  Vite 7  ·  Tailwind CSS v4  ·  shadcn/ui  ·  Radix Primitives
```

---

## 📂 Project Structure

```
src/
├── components/          # React components + diagrams
│   ├── ui/              # shadcn/ui primitives (Button, Card, Sheet…)
│   └── diagrams/        # Interactive SVG diagrams for lessons
├── content/             # 📝 Tutorial content — THIS IS WHERE YOU CONTRIBUTE
│   ├── tutorial/        # Foundation track (Parts 0–8)
│   ├── advanced/        # Advanced track (Modules A–E)
│   └── terminal/        # Terminal track (Modules F–H)
├── data/                # Content mappings and example tracks
├── hooks/               # Custom React hooks
├── pages/               # Page components per track
├── lib/                 # Utilities (cn, helpers)
└── styles/              # Global theme (CSS variables)

.github/
├── agents/              # 🤖 10 specialized AI agent definitions
├── skills/              # 🛠️ 10 reusable AI skill packages
├── prompts/             # ⚡ 3 slash-command prompts
├── instructions/        # 📏 5 path-scoped coding rules
├── reference/           # 📋 SSOT files (step map, prompt map, templates)
├── AUTHORING.md         # Decision tree for contributors
└── CONTRIBUTING.md      # Contribution guidelines
```

---

## 🤝 Contributing

**AI-native development is new territory — we're all learning together.** Whether you're an experienced engineer exploring agentic workflows or someone who just discovered vibe coding last week, your perspective matters.

### Ways to Contribute

| Contribution | Description | Good First? |
|:-------------|:------------|:-----------:|
| **📝 Improve content** | Fix errors, clarify explanations, add examples | ✅ |
| **🆕 Add a module** | Propose new lessons for any track | |
| **🎨 Create diagrams** | Build interactive visuals for concepts | |
| **🏭 Add example tracks** | New industry examples (healthcare, finance, gaming…) | ✅ |
| **🧪 Build exercises** | Hands-on coding challenges | |
| **🌍 Translations** | Help make content accessible globally | ✅ |
| **🐛 Report issues** | Found something wrong? Open an issue | ✅ |

### Getting Started as a Contributor

```bash
# 1. Fork & clone
git clone https://github.com/<your-username>/learn-ai-native-dev.git
cd learn-ai-native-dev

# 2. Install & run
npm install
npm run dev

# 3. Create a branch
git checkout -b feat/your-contribution

# 4. Make changes, test, submit PR
npm run build   # Must pass before submitting
```

> 📖 See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for full guidelines and [`.github/AUTHORING.md`](.github/AUTHORING.md) for the content authoring guide.

---

## 🤖 AI-Powered Development Infrastructure

This project practices what it preaches. The entire `.github/` directory is a working example of AI-native development infrastructure — agents, skills, prompts, and instructions that make AI collaboration structured and repeatable.

### Agents — Specialized AI Team Members

Defined in `.github/agents/`. Invoke via **`@agent-name`** in GitHub Copilot Chat:

```
┌─────────────────────────────────────────────────────────────────┐
│                       AGENT ROSTER                              │
├──────────────────────┬──────────────────────────────────────────┤
│  @orchestrator       │  Routes work to the right specialist     │
│  @technical-writer   │  Drafts tutorial content & docs          │
│  @developer          │  Builds code examples & exercises        │
│  @curriculum-designer│  Structures learning paths & objectives  │
│  @researcher         │  Validates technical accuracy & versions │
│  @ux-designer        │  Creates diagrams & visual aids          │
│  @reviewer           │  Pre-ship QA validation                  │
│  @editor             │  Quick edits (typos, versions, callouts) │
│  @ideator            │  Brainstorms ideas, explores angles      │
│  @content-health     │  Audits staleness & quality              │
└──────────────────────┴──────────────────────────────────────────┘
```

### Skills — Reusable AI Capabilities

Defined in `.github/skills/`. These activate automatically when agents need specialized knowledge:

| Skill | What It Does |
|:------|:-------------|
| `tutorial-content-qa` | Validates steps, prompts, and syntax across all tracks |
| `prompt-writer` | Creates correctly formatted `:::prompt` blocks |
| `diagram-scaffolder` | Generates React diagram components + wiring |
| `exercise-scaffolder` | Produces exercise templates with hints & solutions |
| `track-generator` | Creates new example track data with all required fields |
| `content-track-scaffolder` | Scaffolds entire new learning tracks (parser, pages, routes) |
| `version-checker` | Validates tool/API version currency |
| `accessibility-checker` | Reviews readability, jargon, inclusive language |
| `content-rendering-debugger` | Diagnoses markdown rendering pipeline issues |
| `azure-deploy` | Handles production deployment to Azure Static Web Apps |

### Prompts — Slash Commands

Defined in `.github/prompts/`. Run from Copilot Chat:

| Command | Purpose |
|:--------|:--------|
| `/pre-ship` | Full pre-ship review (QA + build + accessibility + content) |
| `/health-audit` | Content health audit across all tracks |
| `/new-track` | Scaffold a complete new content track |

### Instructions — Path-Scoped Coding Rules

Defined in `.github/instructions/`. Automatically applied based on which files you're editing:

| Instruction File | Applies To |
|:-----------------|:-----------|
| `tutorial-content.instructions.md` | `src/content/**/*.md` |
| `advanced-content.instructions.md` | `src/content/advanced/**` |
| `terminal-content.instructions.md` | `src/content/terminal/**` |
| `react-components.instructions.md` | `src/components/**`, `src/pages/**`, `src/hooks/**` |
| `data-content.instructions.md` | `src/data/**` |

### How It All Fits Together

```
You ask a question or start a task
        │
        ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Instructions  │────▶│     Agents       │────▶│     Skills      │
│  (auto-applied  │     │  (you invoke or  │     │  (agents call   │
│   by file path) │     │   orchestrator   │     │   as needed)    │
│                 │     │   delegates)     │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │    Prompts       │
                        │  (slash commands │
                        │   for workflows) │
                        └──────────────────┘
```

> **Want to add your own agents or skills?** Check the existing files in `.github/agents/` and `.github/skills/` as templates. The [AUTHORING.md](.github/AUTHORING.md) guide has a decision tree for when to use agents vs. skills.

---

## 📚 Content Authoring Quick Reference

Contributing content? Here's the decision tree:

```
What do you want to do?
│
├─► Brainstorm ideas ──────────► @ideator
├─► Create new content ────────► @orchestrator (coordinates full workflow)
├─► Quick edit (typo, etc.) ───► @editor
├─► Check content health ──────► @content-health
└─► Specific micro-task ───────► Use a Skill directly
```

Tutorial content uses custom markdown syntax with prompt blocks, collapsible sections, template variables, and step numbering. See the instruction files in `.github/instructions/` for track-specific conventions.

---

## 🗺️ Roadmap

We're building this in the open. Here's where we're headed:

- [ ] More example tracks (healthcare, gaming, data science, DevOps)
- [ ] Interactive exercises with in-browser validation
- [ ] Community-contributed "recipes" for common AI workflows
- [ ] Translations (help wanted!)
- [ ] Video walkthrough companions
- [ ] MCP server integration examples

Have an idea? [Open an issue](https://github.com/microsoft/learn-ai-native-dev/issues) or start a discussion.

---

## 📜 License

This project uses a **dual-license** model:

- **Code** (everything that is not documentation — for example, files under `src/components/`, `src/pages/`, `src/hooks/`, `src/lib/`, `src/data/`, configuration, and build scripts) is licensed under the [MIT License](LICENSE).
- **Documentation and tutorial content** (including all files under `src/content/` and Markdown files outside of code-only directories) is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-DOCS).

© Microsoft Corporation. Third-party open source attributions are listed in [NOTICE](NOTICE).

---

## 🔐 Security

To report a security vulnerability, please **do not** open a public GitHub issue. Follow the disclosure process described in [SECURITY.md](SECURITY.md) and at [https://aka.ms/SECURITY.md](https://aka.ms/SECURITY.md).

---

## 📣 Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments. The local copy is in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## ™️ Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general). Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos is subject to those third parties' policies.

---

## ⭐ Star History

If this project helps you build better with AI, consider giving it a star. It helps others discover the tutorial.

---

<div align="center">

<br/>

```
  ─────────────────────────────────────────────────────────────
   The future isn't AI replacing developers.
   It's developers who know how to work with AI.
  ─────────────────────────────────────────────────────────────
```

<sub>Built by the community, for the community · © Microsoft Corporation · Code: MIT · Docs: CC BY 4.0</sub>

<br/>

</div>
