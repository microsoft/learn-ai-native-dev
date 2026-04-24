# Template Variables — Single Source of Truth

Template variables are used in Foundation track markdown content and resolved at render time by `applyTemplate()` in `tutorialContent.ts`. They map to fields on the `ExampleTrack` interface in `exampleTracks.ts`.

## Variables Currently Used in Content

| Variable | Source Field | Example Value |
|----------|-------------|---------------|
| `{{projectName}}` | `track.projectName` | "Deal Health Dashboard" |
| `{{projectNameLower}}` | computed: `track.projectName.toLowerCase()` | "deal health dashboard" |
| `{{folderName}}` | `track.folderName` | "deal-dashboard" |
| `{{whatYouBuild}}` | `track.whatYouBuild` | "A dashboard showing sales deals..." |
| `{{sampleDataDescription}}` | `track.sampleDataDescription` | "sample deals with names, values..." |
| `{{colorCoding.greenCap}}` | computed: capitalize first word of `colorCoding.green` | "Healthy" |
| `{{colorCoding.yellow}}` | `track.colorCoding.yellow` | "at risk — needs attention soon" |
| `{{colorCoding.red}}` | `track.colorCoding.red` | "critical — likely to slip or lose" |
| `{{requirements.goal}}` | `track.requirements.goal` | "A dashboard where a sales manager..." |
| `{{requirements.r7Through12}}` | `track.requirements.r7Through12` | R7-R12 requirements text |
| `{{list:requirements.whatItShows}}` | expands array to bullet list | `- item1\n- item2\n- item3` |

## Variables Available But Not Currently Used in Content

These are built by `buildTemplateContext()` but don't appear in any markdown file:

| Variable | Source Field |
|----------|-------------|
| `{{dataItems}}` | `track.dataItems` |
| `{{demoScriptContext}}` | `track.demoScriptContext` |
| `{{colorCoding.green}}` | `track.colorCoding.green` |
| `{{requirements.users}}` | `track.requirements.users` |
| `{{requirements.whatItShows}}` | `track.requirements.whatItShows` (as raw array) |
| `{{requirements.r1Through6}}` | `track.requirements.r1Through6` |

## List Expansion Syntax

```
{{list:path.to.array}}              → bullet list with no indent
{{list:path.to.array|indent=4}}     → bullet list with 4-space indent
```

## Rules

- Always use `{{doubleBraces}}` — never `{singleBraces}`
- Template variables are **only resolved in the Foundation track** (Parts 0-8). Advanced and Terminal tracks skip template resolution.
- Variable names are case-sensitive: `{{colorCoding.green}}` works, `{{colorCoding.Green}}` doesn't
- Every variable used in content must have a corresponding field in `ExampleTrack` or be computed by `buildTemplateContext()`
