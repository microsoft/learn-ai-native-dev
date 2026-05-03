<div align="center">

```
                                                                        
     █████╗ ██╗      ███╗   ██╗ █████╗ ████████╗██╗██╗   ██╗███████╗    
    ██╔══██╗██║      ████╗  ██║██╔══██╗╚══██╔══╝██║██║   ██║██╔════╝    
    ███████║██║█████╗██╔██╗ ██║███████║   ██║   ██║██║   ██║█████╗      
    ██╔══██║██║╚════╝██║╚██╗██║██╔══██║   ██║   ██║╚██╗ ██╔╝██╔══╝      
    ██║  ██║██║      ██║ ╚████║██║  ██║   ██║   ██║ ╚████╔╝ ███████╗    
    ╚═╝  ╚═╝╚═╝      ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝ ╚══════╝    
                  D  E  V  E  L  O  P  M  E  N  T                      
                                                                        
```

<sub>practice · intuition · agentic engineering — shaped in the open</sub>

<br/>

<a href="https://microsoft.github.io/learn-ai-native-dev/"><img src="https://img.shields.io/badge/Launch_Tutorial-0a0a0a?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Launch Tutorial"/></a>
<a href="#-contribute"><img src="https://img.shields.io/badge/Shape_It_With_Us-ff5500?style=for-the-badge&logo=github&logoColor=white" alt="Contribute"/></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/Code-MIT-0a0a0a?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="MIT"/></a>
<a href="LICENSE-DOCS"><img src="https://img.shields.io/badge/Docs-CC--BY--4.0-0a0a0a?style=for-the-badge&logo=creativecommons&logoColor=white" alt="CC BY 4.0"/></a>

<br/><br/>

> **Build _with_ AI, not just _using_ it.**
>
> A living, community-shaped curriculum for the practice of agentic coding.

</div>

---

## ◢ Why this exists

Agentic coding is a moving target. Models change every quarter, tools change every month, and yesterday's "best practice" is tomorrow's antipattern. A static catalog of patterns goes stale before it ships.

So we're not writing one. We're building the opposite: **a place to get reps on problems you actually care about.**

```
   practice   ──▶   problems   ──▶   intuition
                                          │
                                          ▼
                                   vocabulary (later, optional)
```

You don't get good at agentic coding by memorizing pattern names. You get good by shipping small things, seeing contrast (the lazy prompt beside the structured one), and accumulating taste. This site is built for that — and it grows when **you** add the problem you wish someone had taught you on.

```
  VIBE CODING                SPEC-DRIVEN DEV                AGENTIC ENGINEERING
  ──────────────────── ·  ·  ─────────────────── ·  ·  ──────────────────────

  Prompt and pray.           Write clear specs.             Orchestrate agents.
  Accept whatever.           Set rules & instructions.      They write, test, review.
  Hope it compiles.          AI follows your lead.          You direct the journey.

  ░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████
  ─────────────────────────────────────────────────────────────────────────▶
  antipattern                  the on-ramp                          pattern

  ░ antipattern   vibe-prompting · runaway loops · the "just one more retry"
  ▓ on-ramp       specs · instruction files · bounded context
  █ pattern       structured prompts · custom agents · the spec that ships
```

---

## ◢ What's inside

Three content kinds, one filter that runs across all of them.

| Kind | The question it answers | Shape |
|:--|:--|:--|
| **Path** | _Teach me a coherent body of work._ | Foundation · Agentic · Terminal · Community |
| **Recipe** | _Show me one thing applied to one problem._ | 5–15 min, audience-tagged |
| **Project Shape** | _What problem do I want to apply this to?_ | Iris Lab · Deal Dashboard · Palette Forge · yours next |

Filter everything by **audience** — `researcher · developer · business · creative` — and the catalog reshapes around what _you_ build. No pattern-of-the-month. No taxonomy gatekeeping.

> Read the north star: [`docs/philosophy.md`](docs/philosophy.md).

---

## ◢ Quick start

```bash
git clone https://github.com/microsoft/learn-ai-native-dev.git
cd learn-ai-native-dev && npm install && npm run dev
```

Open <http://localhost:5173>. That's it.

```
React 19 · TypeScript · Vite 7 · Tailwind v4 · shadcn/ui · Radix
```

---

## ◢ Contribute

**This repo is the contribution platform.** The site is the artifact; this repo is the workshop where the curriculum gets shaped — by people learning this in real time, together.

The most valuable thing you can add is the **rep you wish you'd had**. A recipe that solved a real problem. A project shape from your domain. A diagram that finally made it click. A correction that saves the next person an hour.

```
  ╭──────────────────────────────────────────────────────────────╮
  │   Got 10 minutes?   →  Open an issue. Fix a typo. Add a tag. │
  │   Got an evening?   →  Write a recipe. Add a project shape.  │
  │   Got a weekend?    →  Propose a module or a community path. │
  ╰──────────────────────────────────────────────────────────────╯
```

The flow is built _with_ AI. Run a slash-prompt in Copilot Chat (`/add-example`, `/fix-content`, `/refresh-content`, `/propose-topic`) and the matching agent scaffolds the change. Open the PR; `@reviewer` and `@docs-auditor` weigh in automatically.

> Start here → [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) · [`.github/AUTHORING.md`](.github/AUTHORING.md)

A repo built by the community, where AI helps you contribute to a curriculum about contributing with AI. That's the loop.

---

## ◢ Repository map

```
src/content/      ←── ✦ where most contributions live (markdown)
src/components/   ←── React + interactive diagrams
src/data/         ←── paths, project shapes, content mappings
.github/          ←── the build harness: agents · skills · prompts · instructions
docs/             ←── design spec & north-star philosophy
```

Two surfaces, two homes: [`docs/`](docs) is _what we teach_, [`.github/`](.github) is _how we edit it_. See [`docs/harness.md`](docs/harness.md) for the map.

---

## ◢ License · Security · Conduct

- **Code** → [MIT](LICENSE) · **Content & docs** → [CC BY 4.0](LICENSE-DOCS) · third-party attributions in [`NOTICE`](NOTICE).
- **Security** → please don't open public issues for vulnerabilities. See [`SECURITY.md`](SECURITY.md) and <https://aka.ms/SECURITY.md>.
- **Code of Conduct** → [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) · [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- **Trademarks** → use of Microsoft or third-party marks must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).

© Microsoft Corporation.

---

<div align="center">

```
   ─────────────────────────────────────────────────────────────
    The future isn't AI replacing developers.
    It's developers — together — figuring out what good looks like.
   ─────────────────────────────────────────────────────────────
```

<sub>built in the open · shaped by contributors · ⭐ if it helped, so the next person finds it</sub>

</div>
