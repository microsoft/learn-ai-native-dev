---
description: "Scaffold a new module in an existing path, or a brand-new community path."
mode: "agent"
---

You are helping a contributor add a new topic to AI-Native Dev.

There are **two flavors**. Determine which from the issue body or by asking:

1. **New module in an existing path** — appends a markdown file to `src/content/<path>/` and updates the path's content registration.
2. **Brand-new community path** — creates `src/content/community/<id>/` with a `path.json` manifest and module markdown files. The path appears automatically in the Catalog with a `community` status badge.

Use the [`curriculum-designer`](.github/agents/curriculum-designer.agent.md) agent to refine objectives, then [`orchestrator`](.github/agents/orchestrator.agent.md) to coordinate the actual scaffolding (which calls `technical-writer`, `developer`, `ux-designer` as needed).

**Required up front (interview if missing):**

- Kind (new module / new path)
- Target path id (for new modules)
- Title and one-paragraph summary
- 3–6 learning objectives (what the reader will be able to do)
- Audience level: beginner / intermediate / advanced
- Estimated time in minutes
- GitHub handle (for community attribution)

**Process:**

1. Lock the proposal: post a short structured summary back and ask the user to confirm before writing files.
2. Generate the markdown files following the conventions for the target path (see `tutorial-content.instructions.md` for Foundation, `advanced-content.instructions.md` for Agentic, `terminal-content.instructions.md` for Terminal).
3. For a new community path, also create `path.json`:

   ```json
   {
     "id": "<kebab-id>",
     "title": "<title>",
     "tagline": "<one-line>",
     "level": "<beginner|intermediate|advanced>",
     "status": "community",
     "supportsExamples": false,
     "estimatedMinutes": 60,
     "topics": ["..."],
     "iconName": "compass",
     "contributedBy": "@yourhandle"
   }
   ```

4. Run `npm run build` and confirm it succeeds.
5. Run `@reviewer` for a pre-ship pass.
6. Print final summary including the live route the contributor will see locally.

**Hard rules:**

- New paths are `community` status by default. Maintainers promote to `official` later via a separate PR.
- Do NOT modify `src/data/paths.ts` for community paths — they are loaded from `path.json` automatically.
- Cap initial scope: a new community path should ship with 1–3 modules max. Encourage iteration over upfront completeness.
