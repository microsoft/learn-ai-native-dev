# Philosophy

> **Status:** north-star design doc. Aspirational where it goes beyond what is
> implemented today. When code and this file disagree, this file states the
> *intended* direction; [`content-architecture.md`](content-architecture.md)
> states what is actually shipped.

This is the project's north star. Every other design doc and every
implementation choice should trace back to a principle here.

## 1. The goal

> **Help anyone develop intuition for what works with agentic coding by
> practicing on problems they care about.**

The order of those words matters: **practice → problems → intuition**.
Vocabulary comes later, if at all.

## 2. The two axes

Agentic coding has two kinds of knowledge. We treat them differently
because they age differently.

| Axis | Question it answers | Volatility | Role on the site |
|---|---|---|---|
| **Capability** | "What can Copilot, Claude Code, MCP, skills, agents *do*?" | High — changes monthly | **Reference.** Versioned, dated, decays loudly when stale. |
| **Intuition** | "Given the capability, what *works* — when, why, with what bounds?" | Lower — changes per model generation | **Curriculum.** The thing learners are here to build. |

> **Capability is reference. Intuition is curriculum.**

A repo that ships only capability — a directory of skills, agents, and MCP
configs — depreciates on contact with the next release. A repo that ships
only intuition has nothing concrete to practice on. We ship both, in the
same lesson, but visually and structurally distinct.

This is what separates this site from a skills/agents collection: the
artifacts are the *medium*, not the *product*.

## 3. Why practice, not patterns

Any catalog of "best patterns" we publish will be partly wrong within a
year. Coders don't get good by reading the GoF book; they get good by
building small things, reading other people's code, getting feedback, and
*eventually* picking up vocabulary for what they already know how to do.

Step "eventually" is useful. It is not the spine. We will not invert that
order here.

### 3.1 Lineage

The spine — *practice on authentic tasks builds tacit pattern recognition* —
draws on three established bodies of work:

- **Deliberate practice** (Ericsson): expertise comes from repeated reps
  with feedback, on tasks slightly above current ability. Our "practice"
  is shorthand for this; mindless repetition doesn't count.
- **Situated cognition** (Brown, Collins, Duguid 1989): knowledge binds to
  the context where it was acquired. Our "problems must belong to the
  learner" (§4.3) is a transfer-of-learning claim, not just empathy.
- **Skill acquisition models** (Dreyfus; Anderson's ACT-R): learners move
  from rule-following → pattern recognition → fluent performance. Pattern
  names live mid-arc and become invisible at the end. That's why we treat
  vocabulary as reference, not curriculum (§4.6).

The position on pattern catalogs follows Norvig's observation that many
GoF patterns are *workarounds for missing language features* — artifacts
of a tool at a moment in time. Today's agentic-coding patterns are the
same: snapshots of how to compensate for current tooling, not durable
truths. Anti-patterns only teach **adjacent to** the pattern they
contradict (Fowler's *Refactoring* model — every smell paired with its
fix, on the same code); decontextualized anti-pattern lists don't
transfer. That's the empirical basis for §4.4.

Caveat: agentic coding is ~2 years old. Classical SWE had decades to learn
which patterns were durable (MVC survived; Singleton didn't). We don't
have that hindsight yet, and neither does anyone else — another reason to
keep pattern names inline rather than canonized.

## 4. Principles

### 4.1 Practice on real problems is the unit of value
A learner who has shipped five small things with an agent is ahead of one
who has memorized fifteen pattern names. Every page should move someone
toward another rep on a problem they care about. If it doesn't, cut it.

### 4.2 Many short reps beat one long path
Intuition is muscle memory: same idea, different problem, repeated. Long
linear paths are great for first contact and poor at the tenth rep. Short,
focused, repeatable units sit alongside paths.

### 4.3 The problem belongs to the learner
Researchers want ML, businesses want dashboards, designers want palettes,
developers want CLIs. We don't pick *for* the learner; we let them pick the
problem and reuse the same lesson scaffolding on it. **Audience-tagged
problem domains are a site-wide concern**, not a Foundation-only feature.

### 4.4 Show contrast where it teaches
You learn what is good by seeing what is bad next to it. The lazy prompt
beside the structured one, the runaway agent beside the bounded one — those
moments are where intuition forms. Contrast belongs **inline** in lessons,
not as a separate "anti-pattern" content type.

### 4.5 Capability is reference, not curriculum
When a lesson describes a feature, command, flag, or artifact (skill,
agent, MCP server), it is **reference material** — dated, version-stamped,
expected to drift. Intuition about *when to reach for it* is the
curriculum. The two appear together but are not the same thing.

### 4.6 Vocabulary is reference too
Pattern names are reference language, used inline at most. We do not
maintain a pattern catalog page, and we do not gate progress on a pattern
checklist. A learner who never hears a pattern name should still become
competent. When we *do* use names, we date and tag them.

### 4.7 Learning state travels with the learner
Progress and chosen project follow the learner across paths, projects, and
recipes. Nothing resets when they jump tracks.

## 5. Content kinds

Three first-class **content kinds** — and two demoted reference surfaces:

| Kind | Question it answers | Length |
|---|---|---|
| **Path** | "Teach me a coherent body of work." | Multi-module |
| **Recipe** | "Show me one thing applied to one problem." | 5–15 min |
| **Project Shape** | "What problem do I want to apply this to?" | Cross-cutting |

Demoted to reference, used **inline** only:

| Surface | Role | What it is *not* |
|---|---|---|
| **Capability callouts** | Versioned descriptions of features, commands, skills, agents, MCP configs. | Not a `/capabilities` route. Not a content kind. |
| **Patterns vocabulary** | Dated, tool-tagged names we may use inline. | Not a `/patterns` page. Not a checklist. Not a filter. |

A recipe is `Path-style-lesson × Project Shape`. Foundation is "many
lessons × one shape, in order". Agentic and Terminal are "many lessons × a
specific tool surface". Calling everything an "example" was wrong — it
collapsed three jobs into one.

One universal filter operates across the catalog:

- **Audience** — `researcher | developer | business | creative`.

Pattern is *not* a filter. Capability is *not* a filter. Both would imply
canonical taxonomies we don't have and shouldn't pretend to have.

## 6. Decisions that follow

1. **Capability and intuition are visually distinct in lessons.** Capability
   gets a dated, versioned callout. Intuition is the prose around it.
2. **Inline contrast has a primitive.** Authors get a scaffold for "good vs
   lazy" / "bounded vs runaway" pairs — the missing component the
   philosophy has always implied.
3. **`ExampleTrack` → `ProjectShape`.** The word *example* is a deprecated
   alias.
4. **Recipes are first class.** Where most contributor energy should go.
5. **Audience filter everywhere a learner picks something** (`/learn`,
   `/projects`).
6. **Learner state lifts** out of per-path Home pages into a single
   site-wide state.

## 7. What this rules out

- Standalone `/patterns` or `/capabilities` pages.
- Promoting anti-patterns to a content type.
- New top-level concepts when a Recipe or Project Shape would do.
- Calling new contributions "examples".
- Audience-conditional prose inside shared path markdown — audience
  belongs to the *project shape* and the *recipe*.
- Endless linear paths. New material that fits as a recipe ships as one.
- Leading with the artifact catalog. Skills, agents, and MCP configs are
  the medium, not the product.

## 8. Checklist for proposed content

Answer in this order:

1. What **problem** does the learner work on?
2. What do they **do** — the verbs, not the nouns?
3. What **feedback** tells them they got it?
4. Which **audience** does this serve?
5. Which **capability** does it touch, and at what version?
6. *(Optional, last)* If a name for this already exists in our vocabulary,
   what is it?

If you can't answer (1)–(4), the content isn't ready. (5) sets the
freshness expectation. (6) is optional on purpose.

## 9. Companion projects

The two-axis split (§2) makes it easy to say what this site *isn't*, and
which other projects it pairs with rather than competes with.

### ATV Starter Kit (and its genre)

[ATV Starter Kit](https://github.com/All-The-Vibes/ATV-StarterKit) is a
one-command installer that scaffolds a complete agentic-coding environment
into a repo: 45+ skills, 29 agents, MCP servers, observer hooks, and full
lifecycle pipelines (`/lfg`, `/ce-brainstorm → /ce-plan → /ce-work →
/ce-review → /ce-compound`). It is **the capability axis, productized** —
the best version of the artifact-catalog genre.

We are deliberately on the other axis.

| | **ATV Starter Kit** | **Learn AI-Native Dev** |
|---|---|---|
| Primary axis | Capability | Intuition |
| Output | Files in your repo (skills, agents, hooks, MCP) | Reps on real problems, in the learner's head |
| Unit | A pipeline you run | A lesson you practice |
| Success = | Your project has the right scaffolding | The learner can recognize when to reach for it |
| Half-life | Quarters (tracks tool releases) | Years (tracks how learners build judgment) |
| Failure mode | Drift when the underlying tools change | Vague advice with nothing to practice on |

### Why they're complementary, not redundant

A learner who installs ATV without intuition gets a beautifully scaffolded
repo and no idea *when* `/ce-review` is the right move vs. a quick prompt,
or *why* `/unslop` matters more on AI-generated code than human code, or
*what bounds* to put on `/autoresearch` before it burns a day. The
artifacts are answers; intuition is knowing which question you're asking.

A learner who finishes this site without ever installing something like
ATV has judgment but no scaffolding — they will hand-roll skills and
agents that already exist, and slowly.

The intended pairing:

1. **Learn here** — practice the reps that build pattern recognition for
   when to plan vs. ship, when to bound the agent, when to throw the
   output away.
2. **Install ATV (or equivalent)** — get the artifacts that encode the
   workflows once you know which ones you'll actually use.
3. **Loop** — when ATV ships a new skill or a tool deprecates one, the
   intuition transfers; the artifacts get re-learned cheaply.

This is also why we don't ship our own installer, our own pipeline, or our
own skill marketplace. Those are downstream of intuition, and the
ecosystem already has good ones.

### What this means for our content

- **We may *use* ATV (or similar) inside lessons** as the capability layer
  — exactly the kind of versioned, dated reference §4.5 calls for.
- **We do not reproduce their catalog.** No "here are 45 skills you can
  install" page. That belongs in their docs.
- **We link out generously.** When a lesson teaches the *intuition* for
  parallel review, we point to `/gstack-review`, `/ce-review`,
  `/autoresearch`, etc., as concrete capability surfaces — not as the
  lesson's content.

