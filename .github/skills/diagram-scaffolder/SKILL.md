---
name: diagram-scaffolder
description: Generate new interactive diagram components for tutorial content. Use when adding a visual diagram, creating architectural illustrations, or building interactive flow visualizations. Use for questions like "add a diagram", "create diagram component", "new visual for module X". Produces a React component, registers it in the barrel export and StepCard parser, and provides the markdown reference syntax.
---

# Diagram Scaffolder

This skill generates interactive diagram components that integrate with the tutorial's custom markdown rendering pipeline.

## When to Use This Skill

- When adding a new visual diagram to any tutorial content
- When creating architectural illustrations (e.g., system diagrams, flow charts)
- When building interactive visualizations with clickable phases or nodes
- When a `:::diagram <name>` block needs a backing React component

## Architecture Overview

Adding a diagram requires coordinated changes across 4 files:

```
1. src/components/diagrams/NewDiagram.tsx    ← React component
2. src/components/diagrams/index.ts          ← Barrel export
3. src/components/StepCard.tsx               ← Parser case + import
4. src/content/**/module-*.md                ← Markdown reference
```

### Data Flow

```
Markdown: :::diagram my-diagram :::
  → StepCard parseContentBlocks() → { type: 'diagram', diagramName: 'my-diagram' }
    → renderBlock() switch case → <MyDiagram />
```

## Existing Diagrams Registry

| Markdown Name | Component | Used In |
|---|---|---|
| `file-hierarchy` | `FileHierarchyDiagram` | Part 3 (Foundation) |
| `mcp-architecture` | `MCPArchitectureDiagram` | Module A (Advanced) |
| `workflow-comparison` | `WorkflowComparisonDiagram` | Module B (Advanced) |
| `agent-orchestration` | `AgentOrchestrationDiagram` | Module C (Advanced) |
| `ai-testing-flow` | `AITestingFlowDiagram` | Module D (Advanced) |
| `capstone-architecture` | `CapstoneArchitectureDiagram` | Module E (Advanced) |
| `agentic-loop` | `AgenticLoopDiagram` | Module G (Terminal) |
| `provider-abstraction` | `ProviderAbstractionDiagram` | Module G (Terminal) |
| `skill-system-flow` | `SkillSystemFlowDiagram` | Module G (Terminal) |
| `spec-driven-cycle` | `SpecDrivenCycleDiagram` | Module G (Terminal) |

## Naming Conventions

| Aspect | Convention | Example |
|---|---|---|
| Markdown name | `kebab-case` | `data-flow-pipeline` |
| Component name | `PascalCase` + `Diagram` suffix | `DataFlowPipelineDiagram` |
| File name | Same as component | `DataFlowPipelineDiagram.tsx` |

The markdown name and component name must be related by converting kebab-case to PascalCase and appending `Diagram`.

## Component Template

### Basic Static Diagram

```typescript
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Info } from '@phosphor-icons/react'

interface DiagramNameDiagramProps {
  className?: string
}

export function DiagramNameDiagram({ className }: DiagramNameDiagramProps) {
  return (
    <div
      className={cn('my-6 space-y-4', className)}
      role="figure"
      data-diagram="diagram-name"
      aria-label="Description of what this diagram shows."
    >
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          {/* Icon + Title */}
          <span className="font-heading font-semibold text-sm text-foreground">
            Diagram Title
          </span>
        </div>

        {/* Diagram content */}
        <div className="font-mono text-sm">
          {/* Visual elements go here */}
        </div>
      </Card>

      {/* Key insight callout */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>Key insight.</strong> Brief explanation of what makes this important.
        </p>
      </div>
    </div>
  )
}
```

### Interactive Diagram (with clickable phases)

```typescript
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Info } from '@phosphor-icons/react'

type PhaseId = 'phase-a' | 'phase-b' | 'phase-c'

interface PhaseInfo {
  id: PhaseId
  label: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
}

const phases: PhaseInfo[] = [
  {
    id: 'phase-a',
    label: 'Phase A',
    icon: <span>🔵</span>,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    description: 'Explanation of this phase.'
  },
  // ... more phases
]

export function DiagramNameDiagram() {
  const [activePhase, setActivePhase] = useState<PhaseId>('phase-a')
  const selected = phases.find(p => p.id === activePhase) || phases[0]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      data-diagram="diagram-name"
      aria-label="Description. Click each phase to learn more."
    >
      {/* Phase nodes */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <span className="font-heading font-semibold text-sm text-foreground">
            Diagram Title
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a phase to explore
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
          {phases.map(phase => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 min-w-[80px]
                ${activePhase === phase.id
                  ? `${phase.bgColor} border-opacity-100 scale-105 shadow-lg`
                  : 'bg-muted/30 border-border hover:border-muted-foreground/50'
                }`}
            >
              <div className={`p-2 rounded-lg ${phase.bgColor} ${phase.color}`}>
                {phase.icon}
              </div>
              <div className="font-semibold text-xs text-foreground">{phase.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Phase detail */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${selected.bgColor} ${selected.color} shrink-0`}>
            {selected.icon}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{selected.label}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {selected.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Key insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>Key insight.</strong> Explanation.
        </p>
      </div>
    </div>
  )
}
```

## Design Patterns

### Color System

Use Tailwind's color utility classes with opacity modifiers:

```
Phase backgrounds: bg-{color}-500/10
Phase borders:     border-{color}-500/30
Phase text:        text-{color}-500
```

Standard phase colors across diagrams:
- Blue (`blue-500`) — input, start, user action
- Violet (`violet-500`) — thinking, reasoning, AI processing
- Amber (`amber-500`) — decision points, warnings
- Emerald (`emerald-500`) — execution, success, output
- Cyan (`cyan-500`) — data flow, feedback
- Rose (`rose-500`) — stop, error, terminal state

### Icons

Use Phosphor Icons (`@phosphor-icons/react`) with `weight="duotone"` and `size={22}` for phase nodes:

```typescript
import { Brain, Code, Eye, Wrench, Lightning } from '@phosphor-icons/react'
```

### Accessibility

Every diagram must have:
- `role="figure"` on the root element
- `data-diagram="kebab-name"` for testing
- `aria-label` describing what the diagram shows
- Keyboard-accessible interactive elements (use `<button>`, not `<div onClick>`)

### Responsive Design

- Use `overflow-x-auto` on horizontal flow layouts
- Use `flex-wrap` or stack vertically on mobile for dense diagrams
- `min-w-[80px]` on phase nodes to prevent squishing

## Step-by-Step: Adding a New Diagram

### Step 1: Create the component

Create `src/components/diagrams/YourDiagram.tsx` using one of the templates above.

### Step 2: Export from barrel file

Add to `src/components/diagrams/index.ts`:

```typescript
export { YourDiagram } from './YourDiagram'
```

### Step 3: Register in StepCard.tsx

**3a.** Add import at top of `src/components/StepCard.tsx`:

```typescript
import {
  FileHierarchyDiagram,
  // ... existing imports ...
  YourDiagram
} from './diagrams'
```

**3b.** Add case in the `renderBlock` function's `case 'diagram':` switch:

```typescript
case 'diagram':
  switch (block.diagramName) {
    // ... existing cases ...
    case 'your-diagram':
      return <YourDiagram key={idx} />
    default:
      return null
  }
```

### Step 4: Reference in markdown

In the tutorial/advanced/terminal content file:

```markdown
:::diagram your-diagram
:::
```

## Validation

### PowerShell: Verify all diagrams are connected

```powershell
# Find all :::diagram references in content
$diagramRefs = Select-String -Path "src/content/**/*.md" -Pattern "^:::diagram\s+(\S+)" -AllMatches |
  ForEach-Object { $_.Matches.Groups[1].Value } | Sort-Object -Unique

# Find all registered cases in StepCard
$stepCard = Get-Content "src/components/StepCard.tsx" -Raw
$registeredCases = [regex]::Matches($stepCard, "case '([^']+)':") |
  ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

# Find all exports in index.ts
$indexExports = Select-String -Path "src/components/diagrams/index.ts" -Pattern "export \{ (\w+) \}" |
  ForEach-Object { $_.Matches.Groups[1].Value }

Write-Host "`n=== DIAGRAM AUDIT ===" -ForegroundColor Cyan
Write-Host "`nMarkdown references:" -ForegroundColor Yellow
$diagramRefs | ForEach-Object {
  $inSwitch = $registeredCases -contains $_
  $status = if ($inSwitch) { "OK" } else { "MISSING CASE" }
  $color = if ($inSwitch) { "Green" } else { "Red" }
  Write-Host "  :::diagram $_ — $status" -ForegroundColor $color
}

Write-Host "`nExported components:" -ForegroundColor Yellow
$indexExports | ForEach-Object { Write-Host "  $_" }

Write-Host "`n=== END AUDIT ===" -ForegroundColor Cyan
```

### Build Check

```powershell
npm run build
```

A missing import or unregistered diagram will cause a build error or silently render nothing (`default: return null`). Always verify the diagram renders in the browser after adding it.

## Checklist

Before completing a new diagram:

- [ ] Component file created in `src/components/diagrams/`
- [ ] Named export (not default export)
- [ ] Exported from `src/components/diagrams/index.ts`
- [ ] Imported in `src/components/StepCard.tsx`
- [ ] Switch case added in `renderBlock` → `case 'diagram':`
- [ ] `role="figure"`, `data-diagram`, and `aria-label` present
- [ ] Interactive elements use `<button>` for keyboard access
- [ ] Horizontal layouts have `overflow-x-auto`
- [ ] Renders correctly in both light and dark themes
- [ ] Referenced in markdown with `:::diagram name` / `:::`
- [ ] `npm run build` succeeds
