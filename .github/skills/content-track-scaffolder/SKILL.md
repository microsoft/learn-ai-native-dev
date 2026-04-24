---
name: content-track-scaffolder
description: Scaffold a complete new content track (like Foundation, Advanced, or Terminal) with all required files — data parser, page components, routes, markdown content, and navigation. Use when adding a new learning path, creating a new track, or expanding the tutorial with a new module series. Use for questions like "add a new track", "create learning path for X", "scaffold track pages".
---

# Content Track Scaffolder

This skill scaffolds a complete content track — the full set of files needed to add a new learning path to the tutorial, following the exact patterns established by Foundation, Advanced, and Terminal tracks.

## When to Use This Skill

- When adding a new learning path (e.g., "Mobile", "Data", "Enterprise")
- When expanding the tutorial with a new series of modules
- When cloning the architecture for a related tutorial site
- When understanding how the existing tracks are wired together

## Architecture Overview

A track consists of 7 coordinated file groups:

```
1. Content files       → src/content/<track>/module-*.md
2. Data parser module  → src/data/<track>Content.ts
3. Home page           → src/pages/<Track>HomePage.tsx
4. Lesson page         → src/pages/<Track>LessonPage.tsx
5. Summary page        → src/pages/<Track>SummaryPage.tsx
6. Routes              → src/App.tsx (lazy imports + Route entries)
7. Navigation links    → src/components/SiteHeader.tsx (header nav)
```

## Existing Tracks Reference

| Track | Route Prefix | Content Dir | Data Module | Step Prefix | Modules |
|---|---|---|---|---|---|
| Foundation | `/lesson/` | `tutorial/` | `tutorialContent.ts` | `Step N:` | Parts 0-8 |
| Advanced | `/advanced/` | `advanced/` | `advancedContent.ts` | `Step A1:` | Modules A-E |
| Terminal | `/terminal/` | `terminal/` | `terminalContent.ts` | `Step F1:` | Modules F-H |

### Key Differences Between Tracks

| Feature | Foundation | Advanced | Terminal |
|---|---|---|---|
| Template variables | `{{projectName}}` etc. | None (isAdvanced=true) | None |
| Prompt type | Single per step | Multiple per step | Multiple + metaPrompt |
| Prompt number format | `1, 2, 3` | `A1, B2, C3` | `F1, G2, H3` |
| Step interface | `Step` (number prompt) | `Step` (string prompt) | `TerminalStep` |
| Module interface | `Part` | `Module` | `TerminalModule` |
| Meta-prompts | No | No | Yes (`===` separator) |
| Home page theme | Default theme | Gradient/glass theme | Terminal green CRT |

## Step-by-Step: Creating a New Track

### Step 1: Plan the track identity

Decide on:

| Decision | Convention | Example |
|---|---|---|
| Track name | PascalCase | `Cloud` |
| Route prefix | lowercase | `/cloud/` |
| Content directory | lowercase | `src/content/cloud/` |
| Module letter prefix | Sequential after H | `I, J, K` |
| Step prefix | Letter + number | `Step I1:` |
| Prompt prefix | Same letter | `I1, I2, J1` |

### Step 2: Create content markdown files

Create `src/content/<track>/module-<letter>-<slug>.md`:

```markdown
---
id: module-<letter>
number: <N>
title: Module Title
subtitle: X minutes — What you'll learn
---

## step: why-this-matters
### title: Why This Module Matters

Introductory content explaining motivation.

## step: first-concept
### title: Step <L>1: First Concept Title

Content explaining the concept.

:::prompt
number: <L>1
title: Prompt Title
---
The actual prompt text that users will copy.
:::

## step: checkpoint
### title: ✅ Checkpoint

Verification section.
```

**Module letter conventions:**
- Use `import.meta.glob` pattern: `module-*.md`
- Number field in frontmatter determines sort order
- Step IDs must be globally unique across the track (not across all tracks)

### Step 3: Create the data parser module

Create `src/data/<track>Content.ts`. Use `advancedContent.ts` as the base template since it supports multiple prompts per step:

```typescript
export interface <Track>Step {
  id: string
  title: string
  content: string
  prompt?: {
    number: string
    title: string
    code: string
    metaPrompt?: string  // Include if track supports meta-prompts
  }
  prompts?: {
    number: string
    title: string
    code: string
    metaPrompt?: string
  }[]
}

export interface <Track>Module {
  id: string
  number: number
  title: string
  subtitle: string
  steps: <Track>Step[]
}

const moduleFiles = import.meta.glob<string>('../content/<track>/module-*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>
```

The rest of the module follows the exact same parsing pipeline:
1. `normalizeLF()` — normalize `\r\n` to `\n`
2. `parseKeyValueBlock()` — parse `key: value` lines
3. `parseFrontmatter()` — extract YAML frontmatter and body
4. `parsePromptBlocks()` — extract `:::prompt` blocks, replace with `:::prompt-placeholder:::`
5. `parseSteps()` — split on `## step:`, extract titles
6. `parseModuleMarkdown()` — combine frontmatter + steps into module
7. `load<Track>Data()` — cached async loader
8. `<track>SummaryContent` — workflow, quickReference, troubleshooting, learned objects

**If the track uses meta-prompts** (like Terminal), include the `===` separator parsing in `parsePromptBlocks()`:

```typescript
const metaSeparator = '\n===\n'
const metaSepIndex = codeBlock.indexOf(metaSeparator)
let metaPrompt: string | undefined
if (metaSepIndex !== -1) {
  metaPrompt = codeBlock.slice(metaSepIndex + metaSeparator.length).trim()
  codeBlock = codeBlock.slice(0, metaSepIndex)
}
```

**If the track uses template variables** (like Foundation), import `resolveContent` from `tutorialContent.ts` or replicate the `applyTemplate()` function.

### Step 4: Create page components

#### 4a. Home page — `src/pages/<Track>HomePage.tsx`

```typescript
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { load<Track>Data, <Track>Module } from '@/data/<track>Content'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function <Track>HomePage() {
  const [modules, setModules] = useState<<Track>Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    load<Track>Data().then((data) => {
      setModules(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16">
        {/* Hero, back link, module cards, summary link, start button */}
      </div>
    </div>
  )
}
```

Key patterns:
- Async data loading with `useState` + `useEffect`
- Module cards are `<Link>` to `/<track>/module/${module.id}`
- Summary link points to `/<track>/summary`
- Back link returns to `/` (Foundation) or previous track

#### 4b. Lesson page — `src/pages/<Track>LessonPage.tsx`

Clone from `AdvancedLessonPage.tsx` and update:
- Data import: `load<Track>Data` and `<Track>Module`
- Route param: `moduleId` from `useParams()`
- Step deep-linking via optional `:stepId` param
- `IntersectionObserver` for tracking visible steps
- NavigationSidebar with parts/modules mapped
- StepCard rendering with `isAdvanced={true}` (unless the track uses template variables)
- Progress calculation and previous/next navigation

#### 4c. Summary page — `src/pages/<Track>SummaryPage.tsx`

Clone from `AdvancedSummaryPage.tsx` and update:
- Import `<track>SummaryContent` from data module
- Render workflow steps, quick reference, troubleshooting, learned sections
- Back link to track home

### Step 5: Add routes to App.tsx

Add lazy imports and routes:

```typescript
// In lazy import section:
const <Track>HomePage = lazy(() => import('@/pages/<Track>HomePage').then(m => ({ default: m.<Track>HomePage })))
const <Track>LessonPage = lazy(() => import('@/pages/<Track>LessonPage').then(m => ({ default: m.<Track>LessonPage })))
const <Track>SummaryPage = lazy(() => import('@/pages/<Track>SummaryPage').then(m => ({ default: m.<Track>SummaryPage })))

// In Routes:
<Route path="/<track>" element={<<Track>HomePage />} />
<Route path="/<track>/module/:moduleId" element={<<Track>LessonPage />} />
<Route path="/<track>/module/:moduleId/:stepId" element={<<Track>LessonPage />} />
<Route path="/<track>/summary" element={<<Track>SummaryPage />} />
```

### Step 6: Add header navigation

In `src/components/SiteHeader.tsx`, add a link to the new track in the navigation menu, following the existing pattern for Advanced/Terminal links.

### Step 7: Create instruction file (optional)

If the track has special content conventions, create `.github/instructions/<track>-content.instructions.md` with an `applyTo: src/content/<track>/**` pattern.

## Summary Content Template

Every track needs a summary content object with 4 sections:

```typescript
export const <track>SummaryContent = {
  workflow: {
    title: 'The <Track> Workflow',
    description: "Here's what you've mastered:",
    steps: [
      'STEP 1 description',
      'STEP 2 description',
      // 5-10 items summarizing the complete workflow
    ]
  },
  quickReference: {
    title: 'Quick Reference: <Track> Prompts',
    items: [
      { when: 'Activity description', prompts: 'PROMPT I1, I2' },
      // One entry per logical activity
    ]
  },
  troubleshooting: {
    title: '<Track> Troubleshooting',
    items: [
      {
        problem: 'Problem description',
        prevention: 'How to prevent it',
        solution: 'How to fix it'
      },
      // 5-10 common issues
    ]
  },
  learned: {
    title: "What You've Mastered",
    items: [
      'Key concept 1',
      'Key concept 2',
      // One item per major learning
    ],
    closing: 'Motivational closing paragraph.'
  }
}
```

## Validation

### PowerShell: Verify track wiring

```powershell
param(
  [string]$TrackName = "cloud",
  [string]$TrackPascal = "Cloud"
)

Write-Host "`n=== TRACK AUDIT: $TrackPascal ===" -ForegroundColor Cyan

# 1. Content files
$contentFiles = Get-ChildItem "src/content/$TrackName/module-*.md" -ErrorAction SilentlyContinue
Write-Host "`n[Content Files]" -ForegroundColor Yellow
if ($contentFiles) {
  $contentFiles | ForEach-Object { Write-Host "  $_" }
} else {
  Write-Host "  NONE FOUND" -ForegroundColor Red
}

# 2. Data module
$dataFile = "src/data/${TrackName}Content.ts"
Write-Host "`n[Data Module]" -ForegroundColor Yellow
if (Test-Path $dataFile) {
  Write-Host "  $dataFile exists" -ForegroundColor Green
  $exports = Select-String -Path $dataFile -Pattern "export (const|interface|function|async)"
  $exports | ForEach-Object { Write-Host "    $($_.Line.Trim())" }
} else {
  Write-Host "  $dataFile MISSING" -ForegroundColor Red
}

# 3. Page components
Write-Host "`n[Page Components]" -ForegroundColor Yellow
@("HomePage", "LessonPage", "SummaryPage") | ForEach-Object {
  $page = "src/pages/${TrackPascal}$_.tsx"
  $exists = Test-Path $page
  $color = if ($exists) { "Green" } else { "Red" }
  $status = if ($exists) { "exists" } else { "MISSING" }
  Write-Host "  $page — $status" -ForegroundColor $color
}

# 4. Routes
Write-Host "`n[Routes in App.tsx]" -ForegroundColor Yellow
$appContent = Get-Content "src/App.tsx" -Raw
$routePattern = "/$TrackName"
if ($appContent -match [regex]::Escape($routePattern)) {
  Write-Host "  Routes for /$TrackName found" -ForegroundColor Green
} else {
  Write-Host "  Routes for /$TrackName MISSING" -ForegroundColor Red
}

# 5. Header navigation
Write-Host "`n[Header Navigation]" -ForegroundColor Yellow
$headerContent = Get-Content "src/components/SiteHeader.tsx" -Raw
if ($headerContent -match [regex]::Escape("/$TrackName")) {
  Write-Host "  SiteHeader links to /$TrackName" -ForegroundColor Green
} else {
  Write-Host "  SiteHeader MISSING link to /$TrackName" -ForegroundColor Red
}

# 6. Build
Write-Host "`n[Build Check]" -ForegroundColor Yellow
Write-Host "  Run: npm run build"

Write-Host "`n=== END AUDIT ===" -ForegroundColor Cyan
```

## Checklist

Before completing a new track:

- [ ] Content markdown files created in `src/content/<track>/`
- [ ] Each file has valid frontmatter (`id`, `number`, `title`, `subtitle`)
- [ ] Steps follow `## step:` / `### title:` format
- [ ] Prompts use letter-prefixed numbers (`I1`, `J1`, etc.)
- [ ] Data parser module created with proper interfaces
- [ ] `load<Track>Data()` exports cached async loader
- [ ] Summary content object has all 4 sections
- [ ] Home page shows module list with links
- [ ] Lesson page renders steps with navigation
- [ ] Summary page renders all summary sections
- [ ] All 3 pages are lazy-loaded in `App.tsx`
- [ ] All 4 routes added (`home`, `module/:id`, `module/:id/:stepId`, `summary`)
- [ ] Header navigation updated
- [ ] `npm run build` succeeds
- [ ] All modules render correctly in the browser
- [ ] Navigation between modules works
- [ ] Deep-linking to steps works (`/<track>/module/<id>/<stepId>`)
