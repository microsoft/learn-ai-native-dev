---
name: track-generator
description: Generate new example tracks for the AI-Native tutorial. Use when creating new industry examples, adding a new track, building project templates, or expanding learning paths. Use for questions like "add a track for healthcare", "create new example", "new industry template". Produces consistent ExampleTrack data with all required fields including projectName, requirements, colorCoding, taskExamples, and verification examples matching the TypeScript interface in exampleTracks.ts.
---

# Track Generator

This skill generates new example tracks that follow the exact structure defined in the AI-Native Development Tutorial's `ExampleTrack` interface.

## When to Use This Skill

- When adding a new industry example to the tutorial
- When creating project templates for specific domains
- When expanding the tutorial's track selection
- When customizing tracks for specific audiences

## Track Location

Tracks are defined in:
```
src/data/exampleTracks.ts
```

## ExampleTrack Interface

Every track must implement this complete interface:

```typescript
export interface ExampleTrack {
  id: string                    // Lowercase with hyphens: "deal-dashboard"
  name: string                  // Display name: "Deal Health Dashboard"
  icon: string                  // Single emoji: "💼"
  industry: string              // Category: "Sales & Business"
  description: string           // 1-2 sentences explaining the track
  projectName: string           // Full project name used in prompts
  folderName: string            // Folder name (matches id)
  whatYouBuild: string          // Brief description of the output
  sampleDataDescription: string // What sample data is used
  dataItems: string             // Plural noun: "deals", "recipes", "plants"
  colorCoding: {
    green: string               // What green means: "healthy — on track"
    yellow: string              // What yellow means: "at risk — needs attention"
    red: string                 // What red means: "critical — action needed"
  }
  requirements: {
    goal: string                // 2-3 sentence goal description
    users: string               // Who uses this
    whatItShows: string[]       // Array of 3-4 things the dashboard shows
    r1Through6: string          // Requirements R1-R6 as formatted text
    r7Through12: string         // Requirements R7-R12 as formatted text
  }
  taskExamples: {
    tooBig: string              // Example of a task that's too big
    rightSize: string[]         // Array of properly-sized tasks
  }
  demoScriptContext: string     // Context for demo walkthrough
  verificationExamples: string[] // Example verification statements
}
```

## Template Variables in Tutorial

For the full mapping of template variables to ExampleTrack fields, see `.github/reference/template-variables.md`.

## Field Guidelines

### Identity Fields

| Field | Format | Example |
|-------|--------|---------|
| `id` | lowercase-hyphenated | `"recipe-keeper"` |
| `name` | Title Case | `"Recipe Keeper"` |
| `icon` | Single emoji | `"🍳"` |
| `industry` | Category name | `"Food & Cooking"` |
| `folderName` | Same as id | `"recipe-keeper"` |
| `projectName` | Same as name | `"Recipe Keeper"` |

### Description Fields

**`description`** — Explains what the track is and who it's for:
```typescript
description: 'Track sales deals and spot which ones need attention. The classic business dashboard — if you\'ve used a CRM, this will feel familiar.'
```

**`whatYouBuild`** — One sentence describing the output:
```typescript
whatYouBuild: 'A dashboard showing sales deals with color-coded health status'
```

**`sampleDataDescription`** — What fake data will be generated:
```typescript
sampleDataDescription: 'sample deals with names, values, and health indicators'
```

### Color Coding

Must explain what each status means in context:

```typescript
colorCoding: {
  green: 'healthy — on track to close',      // Positive state
  yellow: 'at risk — needs attention soon',   // Warning state
  red: 'critical — likely to slip or lose'    // Urgent state
}
```

**Pattern:** `[status word] — [what it means]`

The first word before the dash becomes the capitalized label (e.g., "healthy" → "Healthy" for UI).

### Requirements

**`goal`** — 2-3 sentences describing the project goal:
```typescript
goal: 'A dashboard where a sales manager can see all their deals at a glance and quickly identify which ones need attention.'
```

**`users`** — Who would use this:
```typescript
users: 'Sales managers, account executives, and business leaders who track revenue'
```

**`whatItShows`** — Array of 3-4 key features:
```typescript
whatItShows: [
  'A table of deals with key information',
  'Each deal shows: company name, deal value, expected close date, sales stage, and health status',
  'Health status is color-coded: Green (healthy), Yellow (at risk), Red (critical)'
]
```

**`r1Through6`** — First 6 requirements (static prototype):
```typescript
r1Through6: `R1: Clear title and description explaining what the dashboard shows
R2: Table displaying at least 8 sample items with realistic data
R3: Status visually indicated with colored badges or backgrounds
R4: Values formatted appropriately (currency, dates, etc.)
R5: Works immediately when opened — no loading or setup required
R6: Professional appearance suitable for a team meeting`
```

**`r7Through12`** — Requirements 7-12 (interactive features):
```typescript
r7Through12: `R7: Filter buttons
    - Buttons to filter: All, [Green label], [Yellow label], [Red label]
    - Active filter is visually highlighted
    - How to verify: Click "[Red label]" — only red items appear

R8: Detail panel
    - Clicking a row reveals additional details
    - Shows: [relevant additional fields]
    - How to verify: Click any item — see expanded information

R9: Edit functionality
    - Can modify values and status
    - Changes appear immediately
    - How to verify: Change status — color updates

R10: Persistent storage
    - Changes survive page refresh using browser storage
    - How to verify: Edit, refresh — changes remain

R11: Reset to defaults
    - Button to restore original sample data
    - How to verify: Make changes, click Reset — original data returns

R12: Responsive layout
    - Usable on tablet and phone screens
    - How to verify: Narrow browser window — layout adapts`
```

### Task Examples

**`tooBig`** — Example of an overly broad task:
```typescript
tooBig: 'Build the complete dashboard'
```

**`rightSize`** — Array of properly-scoped tasks:
```typescript
rightSize: [
  'Create basic HTML structure with title',
  'Add sample data as JavaScript array',
  'Display data in a table format',
  'Add color-coded status badges'
]
```

### Demo and Verification

**`demoScriptContext`** — Context for a walkthrough:
```typescript
demoScriptContext: 'Walk through filtering deals by status, viewing deal details, and editing a deal value'
```

**`verificationExamples`** — Example test statements:
```typescript
verificationExamples: [
  'Filter shows only critical deals when Red filter is clicked',
  'Deal values display with currency formatting',
  'Changes persist after page refresh'
]
```

## Complete Track Template

```typescript
{
  id: 'your-track-id',
  name: 'Your Track Name',
  icon: '🎯',
  industry: 'Industry Category',
  description: 'One or two sentences explaining what this track is about and who might find it interesting.',
  projectName: 'Your Track Name',
  folderName: 'your-track-id',
  whatYouBuild: 'A brief description of what the final product looks like',
  sampleDataDescription: 'sample items with relevant attributes',
  dataItems: 'items',
  colorCoding: {
    green: 'positive — good state description',
    yellow: 'warning — concerning state description',
    red: 'critical — urgent state description'
  },
  requirements: {
    goal: 'A [type of app] where [user type] can [primary action] and [secondary action].',
    users: 'Description of who would use this',
    whatItShows: [
      'First main feature',
      'Second main feature with details',
      'Third feature with color coding explanation'
    ],
    r1Through6: `R1: Clear title and description
R2: Table/list displaying at least 8 sample items
R3: Status visually indicated with colors
R4: Values formatted appropriately
R5: Works immediately when opened
R6: Professional appearance`,
    r7Through12: `R7: Filter buttons
    - Filter options for each status
    - How to verify: Click filter — only matching items appear

R8: Detail panel
    - Clicking shows more information
    - How to verify: Click item — see details

R9: Edit functionality
    - Can modify items
    - How to verify: Edit something — it updates

R10: Persistent storage
    - Changes survive refresh
    - How to verify: Edit, refresh — changes remain

R11: Reset to defaults
    - Restore original data
    - How to verify: Reset — original data returns

R12: Responsive layout
    - Works on mobile
    - How to verify: Narrow window — layout adapts`
  },
  taskExamples: {
    tooBig: 'Build the complete application',
    rightSize: [
      'Create basic HTML structure',
      'Add sample data array',
      'Display data in table format',
      'Add status color coding'
    ]
  },
  demoScriptContext: 'a user might say when demonstrating the app',
  verificationExamples: [
    'First verification example',
    'Second verification example',
    'Third verification example'
  ]
}
```

## Validation Commands

### Check Track Structure

```powershell
# Verify all tracks have required fields
$content = Get-Content src/data/exampleTracks.ts -Raw

# Check for required fields
$requiredFields = @('id', 'name', 'icon', 'industry', 'description', 'projectName', 'folderName', 'whatYouBuild', 'sampleDataDescription', 'dataItems', 'colorCoding', 'requirements', 'taskExamples', 'demoScriptContext', 'verificationExamples')

$requiredFields | ForEach-Object {
    if ($content -notmatch "$_:") {
        Write-Host "Missing field: $_" -ForegroundColor Red
    }
}
```

### Count Tracks

```powershell
$content = Get-Content src/data/exampleTracks.ts -Raw
$trackCount = ([regex]::Matches($content, "id: '")).Count
Write-Host "Total tracks: $trackCount"
```

## Adding a New Track

1. Open `src/data/exampleTracks.ts`
2. Add new track object to the `exampleTracks` array
3. Follow the complete template above
4. Ensure all fields are populated
5. Test by selecting the track in the UI
6. Verify all prompts render correctly with the new track's data
