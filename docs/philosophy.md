# Philosophy

> **Status:** north-star design doc. Aspirational where it goes beyond
> what is implemented today. When code and this file disagree, this file
> states the *intended* direction; [`content-architecture.md`](content-architecture.md)
> states what is actually shipped.

This document is the project's north star. Every other design doc and every
implementation choice should be traceable back to a principle here. Read
this first; read [`design-principles.md`](design-principles.md) for the
voice and visual language that follow from it.

## 1. The goal

> **Help anyone develop intuition for what works with agentic coding by
> practicing on problems they care about.**

The order of those words matters: **practice → problems → intuition**. Names
and taxonomies come later, if at all.

## 2. Why practice, not patterns

Agentic coding is a moving target. Models change every quarter; tools change
every month; what was a "best practice" with one Copilot mode becomes table
stakes or obsolete with the next. Any catalog of "good patterns" we publish
will be partly wrong within a year and embarrassingly wrong within two.

Classical software engineering already learned this lesson. Coders do not
become good by reading the GoF book cover to cover. They become good by:

1. Building small things repeatedly.
2. Reading other people's code, including the messy parts.
3. Getting feedback (a reviewer, a failing test, a confused user).
4. *Eventually* picking up vocabulary that lets them talk about what they
   already know how to do.

Step 4 is useful. It is not the spine. We will not invert that order here.

## 3. Principles

### 3.1 Practice on real problems is the unit of value

A learner who has shipped five small things with an agent is ahead of a
learner who has memorized fifteen "patterns". Every page on the site should
move someone toward another rep on a problem they care about. If a page does
not, it is decoration and should be cut.

### 3.2 Many short reps beat one long path

Intuition is muscle memory: same idea, different problem, repeated.
Long linear paths are great for first contact and poor at the tenth rep. The
site needs **short, focused, repeatable units** alongside paths.

### 3.3 The problem belongs to the learner

Researchers want ML, businesses want dashboards, designers want palettes,
developers want CLIs. We do not pick *for* the learner; we let them pick the
problem and reuse the same lesson scaffolding on it. Foundation already does
this with Project Shapes (formerly "example tracks"). The principle
generalizes site-wide: **audience-tagged problem domains are a site-wide
concern, not a Foundation-only feature.**

### 3.4 Show contrast where it teaches

You learn what is good by seeing what is bad next to it. The lazy prompt
beside the structured one, the runaway agent beside the bounded one — those
moments are where intuition forms. Contrast belongs **inside** lessons, not
as a separate "anti-pattern" content type.

### 3.5 Vocabulary is a reference, not a curriculum

Naming things is useful — *after* you have done them. Pattern names are
**reference language**, used inline in lessons at most. We do not maintain
a pattern catalog page, and we do not gate progress on a pattern checklist.
A learner who never hears a pattern name should still become competent.

> Corollary: when we *do* use pattern names inline, we date them and tag
> them with the tools/models they apply to. We expect them to drift, and we
> say so.

### 3.6 Learning state travels with the learner

A learner moves between paths, projects, and recipes. Their progress and
chosen project follow them — not reset every time they jump tracks.

## 4. Taxonomy that follows from the principles

Three first-class **content kinds** — and one demoted reference surface:

| Kind | Question it answers | Length | Examples |
|---|---|---|---|
| **Path** | "Teach me a coherent body of work." | Multi-module | Foundation, Agentic, Terminal, Community/* |
| **Recipe** | "Show me one thing applied to one problem." | 5–15 min | "Spec-first build → Iris classifier", "Tight loop → log analyzer" |
| **Project Shape** | "What problem do I want to apply this to?" | Cross-cutting | Iris Lab, Deal Dashboard, Palette Forge |

Plus, demoted:

| Surface | Role | What it is *not* |
|---|---|---|
| **Patterns vocabulary** | Reference language we may use inline in lessons. Dated, versioned, opt-in. | Not a page, not a route, not a filter for the catalog, not a checklist learners need to complete, not a content kind. |

A recipe is the cross-product `Path-style-lesson × Project Shape`.
Foundation is "many lessons × one project shape, in order". Agentic and
Terminal are "many lessons × specific tool surface". Recipes are "one
lesson × one project shape, ad hoc". This is why **calling everything an
"example" was wrong** — the word collapsed three different jobs into one.

One universal filter operates across the catalog:

- **Audience** — `researcher | developer | business | creative` (in priority
  order).

Pattern is *not* a universal filter. It would imply a canonical taxonomy we
do not have and should not pretend to have.

## 5. Decisions that follow

Commitments. Implementation order belongs in
[`content-architecture.md`](content-architecture.md).

1. **Rename `ExampleTrack` → `ProjectShape`.** Drop the "Foundation-only"
   framing from the *concept*; other paths consume shapes when they want
   to. The word *example* becomes a deprecated alias.
2. **Add Recipes as a first-class content type.** Short markdown, audience-
   tagged, optionally project-shape-bound. Where most contributor energy
   should go.
3. **Audience filter everywhere a learner picks something** (`/learn`,
   `/projects`).
4. **Show contrast inline** in lessons (good vs lazy prompt, bounded vs
   runaway agent). Not a separate content type.
5. **Lift learner state** out of per-path Home pages into a single state
   that spans the site (chosen project, completed lessons, bookmarked
   recipes).

## 6. What this rules out

- Adding new top-level concepts every time we want to teach something new.
  Reach for **Recipe** or **Project Shape** first.
- Calling new contributions "examples". Reserved as a deprecated alias.
- Audience-conditional prompt language inside path markdown. Audience
  belongs to the *project shape* and the *recipe*, not to the prose of a
  shared path.
- A pattern-of-the-month catalog presented as canonical. Pattern names are
  reference language with a freshness date, used inline at most.
- A standalone `/patterns` page. The vocabulary is not a destination.
- Endless linear paths. New material that fits as a recipe must ship as a
  recipe.

## 7. Checklist for proposed content

When proposing content, answer in this order:

1. What **problem** does the learner work on?
2. What do they **do** — the verbs, not the nouns?
3. What **feedback** tells them they got it?
4. Which **audience** does this serve?
5. *(Optional, last)* If a name for this already exists in our shared
   vocabulary, what is it?

If you cannot answer (1)–(4), the content is not ready. Question (5) is
optional on purpose.
