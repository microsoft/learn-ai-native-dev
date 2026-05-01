---
description: "Add a new example project to the Foundation track. Pure data — appends one entry to exampleTracks.ts."
mode: "agent"
---

You are helping a contributor add a new example project to the AI-Native Dev tutorial.

Use the [`track-generator`](.github/skills/track-generator/SKILL.md) skill. The work is **data-only**: append one new `ExampleTrack` object to [src/data/exampleTracks.ts](src/data/exampleTracks.ts).

**Required fields** (interview the user if any are missing):

- `id` — kebab-case, unique. Example: `cli-log-analyzer`
- `name` — display name. Example: "CLI Log Analyzer"
- `icon` — single emoji
- `industry` — short category label
- `audience` — one of: `business` | `developer` | `nerdy` | `creative`
- `status` — `community` for community contributions; only maintainers set `official`
- `contributedBy` — GitHub handle (e.g., `@octocat`) — required when `status` is `community`
- `description` — 1–2 sentences for the Examples page
- `projectName`, `folderName`, `whatYouBuild`, `sampleDataDescription`, `dataItems`
- `colorCoding.green` / `.yellow` / `.red` — what each color means in this domain
- `requirements.goal`, `users`, `whatItShows`, `r1Through6`, `r7Through12`
- `taskExamples.tooBig`, `rightSize`
- `demoScriptContext`
- `verificationExamples` — array of 3 short verification statements

**Process:**

1. If the user pasted issue body from `add-example.yml`, parse the fields directly.
2. Otherwise, ask one question at a time for the missing fields.
3. Append the new entry **before the closing `]`** of `exampleTracks` in [src/data/exampleTracks.ts](src/data/exampleTracks.ts).
4. Run `npm run build` and confirm it succeeds.
5. Print a one-line summary and link to the Examples page (`/examples`).

**Quality gates:**

- The R1–R12 structure must mirror existing entries (R1–R6 in `r1Through6`, R7–R12 in `r7Through12`).
- The green/yellow/red meanings must be domain-appropriate and short (one phrase each).
- Do NOT modify any other file — examples are pure data.
