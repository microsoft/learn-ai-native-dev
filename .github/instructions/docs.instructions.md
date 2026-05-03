---
applyTo: "docs/**"
description: "Conventions for editing the docs/ design spec."
---

# Editing `docs/`

`docs/` is the design specification for the **website-as-product**. It is
*not* the contributor harness — that lives in [`.github/`](../../.github).

## Rules

1. **Reflect, don't invent.** Every claim in `docs/` must be backed by code in
   `src/` or by an existing `.github/` policy file. Aspirations belong in
   issues, not in design docs.
2. **One topic per file.** Link, don't duplicate. If two docs need the same
   passage, factor it into a third doc and link from both.
3. **Use relative links** to other workspace files (no absolute URLs to the
   repo, no `vscode://` schemes). Keep links inline; do not wrap file paths
   in backticks.
4. **Tables for inventories.** When listing modules, components, instructions,
   prompts, skills, agents, or hooks, prefer a table with a `Source` column
   that links to the file.
5. **Keep `docs/lifecycle.md` a thin summary.** The authoritative lifecycle
   policy is [`.github/CONTENT_LIFECYCLE.md`](../CONTENT_LIFECYCLE.md). When
   they conflict, the `.github` file wins.
6. **Never put generated content here.** Anything a tool writes belongs under
   the harness or the build output, not under `docs/`.
7. **Use plain language.** No jargon without a one-line definition. Match
   the voice rules in [`docs/design-principles.md`](../../docs/design-principles.md).
8. **`@docs-auditor` is the maintainer.** When you change `src/`, `paths.ts`,
   a markdown module, a diagram, a custom syntax handler, or any
   `.github/{instructions,prompts,skills,agents,hooks}/*` file, run
   `@docs-auditor` before merging.

## Forbidden

- Adding new design principles without sign-off in an issue.
- Embedding code snippets longer than ~15 lines (link to the source instead).
- Restating tutorial content (this is a *design spec*, not a tutorial).
- Changing the website's voice or visual rules in `docs/` without a
  corresponding change in code or in
  [`react-components.instructions.md`](react-components.instructions.md).

## Building / verifying

`docs/` is markdown only — no build step. Verify a change by:

1. Reading the file in VS Code's preview.
2. Running `@docs-auditor` to confirm no drift was introduced.
