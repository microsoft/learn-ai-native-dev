---
description: "Use when editing example tracks, tutorial content mappings, or data files. Covers TypeScript interfaces and content registration patterns."
applyTo: "src/data/**"
---
# Data & Content Mapping Guidelines

## Content Registration

Tutorial parts, advanced modules, and terminal modules are loaded via `import.meta.glob`:

```ts
const partModules = import.meta.glob<string>('../content/tutorial/part-*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})
```

Adding a new content file requires:
1. Create the `.md` file in the correct `src/content/` subdirectory
2. Ensure the glob pattern already covers the filename
3. No manual registration needed — the glob handles discovery

## Example Tracks (`exampleTracks.ts`)

Each track must satisfy the `ExampleTrack` interface with all required fields:
- `id`, `name`, `icon`, `projectName`, `folderName`
- `requirements`, `colorCoding`, `sampleDataDescription`
- `taskExamples`, `whatYouBuild`

Template variables in markdown (`{{projectName}}`, etc.) are resolved from these tracks at render time. Every `{{variable}}` used in content must have a corresponding field in the track data.

## Type Safety

- All data exports must have explicit TypeScript interfaces
- Avoid `any` — define proper types for content structures
- Export interfaces alongside data for use in components
